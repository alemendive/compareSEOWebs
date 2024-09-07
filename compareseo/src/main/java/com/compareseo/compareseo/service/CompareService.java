package com.compareseo.compareseo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

@Service
public class CompareService {

    @Value("${API_KEY}")
    private String apiKey;

    @Value("${API_URL}")
    private String apiUrl;

    private final Pattern URL_PATTERN = Pattern.compile("https?://");

    // Método para agregar protocolo a las URLs
    public String agregarProtocolo(String url) {
        String urlDecodificada = UriComponentsBuilder.fromUriString(url).build().toUriString();

        if (!URL_PATTERN.matcher(urlDecodificada).find() && !urlDecodificada.startsWith("www.")) {
            return "https://www." + urlDecodificada;
        } else if (!URL_PATTERN.matcher(urlDecodificada).find() && urlDecodificada.startsWith("www.")) {
            return "https://" + urlDecodificada.substring(4);
        } else if (urlDecodificada.startsWith("http://www.")) {
            return urlDecodificada;
        } else if (!URL_PATTERN.matcher(urlDecodificada).find() && urlDecodificada.startsWith("http://www.")) {
            return "https://" + urlDecodificada.substring(7);
        } else {
            return urlDecodificada;
        }
    }

    // Método para obtener la puntuación de PageSpeed Insights
    public Map<String, Object> obtenerPuntuacion(String urlFormateada, String strategy) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String urlHttps = agregarProtocolo(urlFormateada);

            // Construcción de la URL con parámetros
            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(apiUrl)
                    .queryParam("url", urlHttps)
                    .queryParam("strategy", strategy)
                    .queryParam("key", apiKey)
                    .queryParam("category", "performance")
                    .queryParam("category", "seo")
                    .queryParam("category", "accessibility")
                    .queryParam("category", "best-practices")
                    .queryParam("category", "pwa");

            // Solicitud a la API
            ResponseEntity<Map> response = restTemplate.getForEntity(builder.toUriString(), Map.class);
            Map<String, Object> data = response.getBody();

            return procesarDatosDeApi(data, urlHttps);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error en la solicitud a la API Lighthouse", e);
        }
    }

    // Método auxiliar para procesar la respuesta de la API
    private Map<String, Object> procesarDatosDeApi(Map<String, Object> data, String urlHttps) {
        Map<String, Object> metricsData = new HashMap<>();

        Map<String, Object> lighthouseResult = (Map<String, Object>) data.get("lighthouseResult");
        Map<String, Object> audits = (Map<String, Object>) lighthouseResult.get("audits");

        // Extraer Speed Index
        Map<String, Object> speedIndexAudit = (Map<String, Object>) audits.get("speed-index");
        Double speedIndexScore = (Double) speedIndexAudit.get("score");

        metricsData.put("url", urlHttps);
        metricsData.put("Speed Index", Map.of("score", speedIndexScore, "value", speedIndexAudit.get("displayValue")));

        // Extraer puntaje general de performance
        Map<String, Object> categories = (Map<String, Object>) lighthouseResult.get("categories");
        Map<String, Object> performanceCategory = (Map<String, Object>) categories.get("performance");
        Double overallScore = (Double) performanceCategory.get("score");

        metricsData.put("Overall Score", (int) (overallScore * 100));

        // Extraer Time to Interactive
        Map<String, Object> interactiveAudit = (Map<String, Object>) audits.get("interactive");
        metricsData.put("Time to Interactive", interactiveAudit.get("displayValue"));

        return metricsData;
    }
}