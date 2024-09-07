import { useNavigate } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from 'moment';


const obtenerHistorialOrdenado = () => {
  const historial = [];


  // Recorrer las claves de localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i);
    const resultado = JSON.parse(localStorage.getItem(clave));
    
    
    // Agregar el resultado con su clave (fecha) al array historial
    historial.push({ clave, resultado });
  }

  console.log("resultados para trapi", historial);

  
  // Ordenar por la clave (fecha) de más reciente a más antiguo
  return historial.sort((a, b) => new Date(b.clave) - new Date(a.clave));
};



const HistorialPage = () => {
  const navigate = useNavigate();

  // Obtener el historial ordenado
  const historial = obtenerHistorialOrdenado();

  if (historial.length === 0) {
    return (
      <div>
        <header className="rs-result-card-header">
          <button onClick={() => navigate("/resultado")}>Volver</button>
          <p>No hay resultados en el historial.</p>
        </header>
      </div>
    );
  }

  return (
    <div>
      <header className="rs-result-card-header">
        <button onClick={() => navigate("/resultado")}>Volver</button>
      </header>
      <section className="hs-result-card">
        {historial.map((entrada) => (
          <div key={entrada.clave} style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#d7d54b" }}>{moment(entrada.clave).format('MMMM Do YYYY, h:mm:ss a')}</h3>
            {["puntuacion_url1", "puntuacion_url2"].map((tipoUrl) => (
              <div key={tipoUrl}>
                <h4>{tipoUrl === "puntuacion_url1" ? "URL 1:" : "URL 2:"}</h4>
                {entrada.resultado[tipoUrl] && (
                  <div>
                    {/* Mostrar datos de la URL */}
                    <p>{entrada.resultado[tipoUrl].url}</p>

                    {/* Mostrar Speed Index */}
                    {entrada.resultado[tipoUrl]["Speed Index"] && (
                      <div>
                        <h5>Speed Index</h5>
                        {entrada.resultado[tipoUrl]["Speed Index"].score !==
                          undefined && (
                          <div style={{ width: 60, height: 60 }}>
                            <CircularProgressbarWithChildren
                              value={
                                entrada.resultado[tipoUrl]["Speed Index"].score *
                                100
                              }
                            >
                              <div style={{ fontSize: 15 }}>
                                <strong>
                                  {(
                                    entrada.resultado[tipoUrl]["Speed Index"]
                                      .score * 100
                                  ).toFixed(2)}
                                  %
                                </strong>
                              </div>
                            </CircularProgressbarWithChildren>
                          </div>
                        )}
                        <p>{`Value: ${entrada.resultado[tipoUrl]["Speed Index"].value}`}</p>
                      </div>
                    )}

                    {/* Mostrar Overall Score */}
                    {entrada.resultado[tipoUrl]["Overall Score"] !== undefined && (
                      <p>{`Overall Score: ${entrada.resultado[tipoUrl]["Overall Score"]}`}</p>
                    )}

                    {/* Mostrar Time to Interactive */}
                    {entrada.resultado[tipoUrl]["Time to Interactive"] && (
                      <p>{`Time to Interactive: ${entrada.resultado[tipoUrl]["Time to Interactive"]}`}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default HistorialPage;