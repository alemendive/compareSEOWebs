package com.compareseo.compareseo.controller;

import com.compareseo.compareseo.service.CompareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CompararController {

    @Autowired
    private CompareService compareService;

    @PostMapping("/comparar")
    public ResponseEntity<?> compararUrlsPost(@RequestBody Map<String, String> requestData) {
        try {
            String strategy = requestData.getOrDefault("strategy", "");
            String url1 = requestData.getOrDefault("url1", "");
            String url2 = requestData.getOrDefault("url2", "");

            if (strategy.isEmpty() || url1.isEmpty() || url2.isEmpty()) {
                return ResponseEntity.badRequest().body("Faltan parámetros en la solicitud");
            }

            Map<String, Object> puntuacionUrl1 = compareService.obtenerPuntuacion(url1, strategy);
            Map<String, Object> puntuacionUrl2 = compareService.obtenerPuntuacion(url2, strategy);

            Map<String, Object> response = Map.of(
                    "puntuacion_url1", puntuacionUrl1,
                    "puntuacion_url2", puntuacionUrl2
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error inesperado: " + e.getMessage());
        }
    }
}