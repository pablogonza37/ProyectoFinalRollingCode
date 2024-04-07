import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import Inicio from "./components/pages/Inicio";
import Registro from "./components/pages/registro/Registro"; // Asegúrate de importar el componente Registro
import Menu from "./components/commons/Menu";
import Footer from "./components/commons/Footer";
import LoginModal from "./components/commons/Login";
import DetalleProducto from "./components/pages/producto/DetalleProducto";
import Administrador from "./components/pages/Administrador";
import FormularioProducto from "./components/pages/producto/FormularioProducto";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RutasProtegidas from "./components/routes/RutasProtegidas";
import RutasAdmin from "./components/routes/RutasAdmin";
import { useState } from "react";

function App() {
  const usuario = JSON.parse(sessionStorage.getItem("usuarioRollingBistro")) || "";
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuario);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <BrowserRouter>
        <Menu openLoginModal={openModal} usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado}/>
        <Routes>
          <Route exact path="/" element={<Inicio></Inicio>}></Route>
          <Route
            exact
            path="/detalle/:id"
            element={<DetalleProducto></DetalleProducto>}
          ></Route>
           <Route
            exact
            path="/administrador/*"
            element={
              <RutasProtegidas>
                <RutasAdmin usuarioLogueado={usuarioLogueado}></RutasAdmin>
              </RutasProtegidas>
            }
          ></Route>
          <Route
            exact
            path="/"
            element={<FormularioProducto></FormularioProducto>}
          ></Route>
          <Route
            exact
            path="/login"
            element={
              <LoginModal modalIsOpen={modalIsOpen} closeModal={closeModal} setUsuarioLogueado={setUsuarioLogueado}/>
            }
          ></Route>
          {/*<Route path="*" element={<Error404></Error404>}></Route>*/}
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;