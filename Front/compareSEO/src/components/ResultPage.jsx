import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";

const ResultPage = () => {
  // Manejo seguro de sessionStorage
  const getResultadoFromSession = () => {
    try {
      const resultado = sessionStorage.getItem("resultado");
      return resultado ? JSON.parse(resultado) : {};
    } catch (error) {
      console.error("Error parsing sessionStorage:", error);
      return {};
    }
  };

  const respuestafinal = getResultadoFromSession();
  const navigate = useNavigate();

  const handleVolverClick = () => {
    navigate("/");
  };

  const handleHistorial = () => {
    const historial = {};

    // Iterar sobre localStorage para recoger el historial
    for (let i = 0; i < localStorage.length; i++) {
      const clave = localStorage.key(i);
      try {
        const valor = localStorage.getItem(clave);
        historial[clave] = valor ? JSON.parse(valor) : null;
      } catch (error) {
        console.error(`Error parsing localStorage item with key "${clave}":`, error);
      }
    }

    // Navegar a la página de historial con el estado
    navigate("/historial", { state: { resultado: historial } });
  };

  return (
    <div>
      <header className="rs-result-card-header">
        <button onClick={handleVolverClick}>Volver</button>
        <button onClick={handleHistorial}>Historial</button>
      </header>
      <section className="rs-result-card">
        {Object.keys(respuestafinal).length > 0 ? (
          Object.keys(respuestafinal).map((clave) => (
            <div key={clave} style={{ marginBottom: '20px' }}>
              <h4>{`URL ${clave === 'puntuacion_url1' ? '1' : '2'}`}</h4>
              {respuestafinal[clave] && (
                <div>
                  {respuestafinal[clave].url && <p>{respuestafinal[clave].url}</p>}
                  {respuestafinal[clave]["Speed Index"] && (
                    <div>
                      <h5>Speed Index</h5>
                      {respuestafinal[clave]["Speed Index"].score !== undefined && (
                        <div style={{ width: 60, height: 60 }}>
                          <CircularProgressbarWithChildren
                            value={respuestafinal[clave]["Speed Index"].score * 100}
                          >
                            <div style={{ fontSize: 15 }}>
                              <strong>{(respuestafinal[clave]["Speed Index"].score * 100).toFixed(2)}%</strong>
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      )}
                      {respuestafinal[clave]["Speed Index"].value && <p>{`Value: ${respuestafinal[clave]["Speed Index"].value}`}</p>}
                    </div>
                  )}
                  {respuestafinal[clave]["Overall Score"] !== undefined && (
                    <p>{`Overall Score: ${respuestafinal[clave]["Overall Score"]}`}</p>
                  )}
                  {respuestafinal[clave]["Time to Interactive"] && (
                    <p>{`Time to Interactive: ${respuestafinal[clave]["Time to Interactive"]}`}</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No hay datos disponibles.</p>
        )}
      </section>
    </div>
  );
};

export default ResultPage;