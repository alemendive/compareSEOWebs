import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompareCard from "./components/CompareCard";
import ResultPage from "./components/ResultPage";
import HistorialPage from "./components/HistorialPage";
import NotFoundPage from "./components/NotFoundPage"; // Importa tu componente NotFoundPage
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompareCard />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/historial" element={<HistorialPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
