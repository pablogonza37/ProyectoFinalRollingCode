import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import Inicio from "./components/pages/Inicio";
import Registro from "./components/pages/registro/Registro"; // Asegúrate de importar el componente Registro
import Menu from "./components/commons/Menu";
import Footer from "./components/commons/Footer";

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/Registro" element={<Registro />} />
        <Route path="/" element={<Inicio />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;