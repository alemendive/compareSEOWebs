import BarLoader from "react-spinners/BarLoader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResultPage from "./ResultPage";

const CompareCard = () => {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [botonVisible, setBotonVisible] = useState(true);
  const navigate = useNavigate();

  const compararUrls = async (strategy) => {
    try {
      setLoading(true);
      setError(null);
  
      const response = await fetch("http://localhost:5000/api/comparar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          strategy,
          url1: encodeURIComponent(url1),
          url2: encodeURIComponent(url2),
        }),
      });
  
      if (response.ok) {
        const resultado = await response.json();
        
        // Obteniene la fecha y hora actuales
        const fechaActual = new Date().toISOString();
        
        
        // Guarda el resultado en localStorage con la fecha y hora
        localStorage.setItem(fechaActual, JSON.stringify(resultado));
  
        sessionStorage.setItem("resultado", JSON.stringify(resultado));
        setResultado(resultado);
        navigate("/resultado", { state: { resultado } });
      } else {
        setError(`Error al comparar las URLs: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error al comparar las URLs:", error);
      setError("Error inesperado al comparar las URLs");
      setBotonVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    setBotonVisible(false);
    compararUrls("mobile");
  };

  const handleChange1 = (event) => {
    setUrl1(event.target.value);
  };

  const handleChange2 = (event) => {
    setUrl2(event.target.value);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <main className="cs-search-card">
      <header className="cs-search-card-header">
        <img
          className="cs-search-logo"
          alt="El logo de la app"
          src="images/favicon.png"
        />
        <h1>
          <strong>Compare el SEO de las webs</strong>
        </h1>
      </header>
      <div></div>
      <section className="cs-search-card-inputs">
        <label className="cs-search-card-input-text">
          <h3>Ingrese una URL:</h3>
          <input
            required
            placeholder="https://www.ejemplo.com"
            autoComplete="on"
            className="cs-search-card-input"
            type="text"
            value={url1}
            onChange={handleChange1}
          />
        </label>
        <label className="cs-search-card-input-text">
          <h3>Ingrese la URL a comparar:</h3>
          <input
            required
            placeholder="https://www.ejemplo.com"
            autoComplete="on"
            className="cs-search-card-input"
            type="text"
            value={url2}
            onChange={handleChange2}
          />
        </label>
      </section>
      <br />
      <span className="cs-search-card-mensaje-estrategia">
        <strong>Elija una estrategia de búsqueda</strong>
      </span>
      <div className="button-container">
        {botonVisible && (
          <button
            className="cs-search-card-category-button"
            onClick={handleClick}
          >
            <img src="images/mobile.png" alt="Mobile" />
            Mobile
          </button>
        )}

        {botonVisible && (
          <button
            className="cs-search-card-category-button"
            onClick={() => {
              setBotonVisible(false);
              compararUrls("desktop");
            }}
          >
            <img src="images/desktop.png" alt="Desktop" />
            Desktop
          </button>
        )}
      </div>
      <div className="cs-search-card-result">
        {loading && <p>Creando análisis... Esto puede tardar unos minutos</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? (
          <BarLoader
            color="#36d7b7"
            loading={loading}
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          resultado && <ResultPage resultado={resultado} />
        )}
      </div>
    </main>
  );
};

export default CompareCard;
