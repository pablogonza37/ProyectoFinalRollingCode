import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import Inicio from "./components/pages/Inicio";
import Menu from "./components/commons/Menu";
import Footer from "./components/commons/Footer";
import DetalleProducto from "./components/pages/producto/DetalleProducto";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RutasProtegidas from "./components/routes/RutasProtegidas";
import RutasAdmin from "./components/routes/RutasAdmin";
import { useEffect, useState } from "react";
import Registro from "./components/pages/Registro";
import Pedidos from "./components/pages/pedidos/Pedidos";
import AcercaDe from "./components/pages/Acercade";
import Error404 from "./components/pages/Error404";
import Login from "./components/pages/Login";
import Contacto from "./components/pages/Contacto";
import { obtenerPedidosAPI } from "./helpers/queries";

function App() {
  const usuario = JSON.parse(sessionStorage.getItem("usuarioRollingBistro")) || "";
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuario);
  const [pedidosPendientes, setPedidosPendientes] = useState([]);

  useEffect(() => {
    actualizarIndicePedidos()
  }, [usuarioLogueado]);

  const actualizarIndicePedidos = async () => {
    try {
      const pedidos = await obtenerPedidosAPI();
      let pedidosFiltrados = [];
      if (usuarioLogueado.rol === 'admin') {
        pedidosFiltrados = pedidos.filter(pedido => pedido.estado !== 'enviado');
      } else {
        pedidosFiltrados = pedidos.filter(pedido => pedido.usuario === usuarioLogueado.email && pedido.estado !== 'enviado');
      }
      setPedidosPendientes(pedidosFiltrados);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Menu usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} pedidosPendientes={pedidosPendientes}/>
        <Routes>
          <Route exact path="/" element={<Inicio usuarioLogueado={usuarioLogueado} actualizarIndicePedidos={actualizarIndicePedidos} pedidosPendientes={pedidosPendientes}></Inicio>}></Route>
          <Route
            exact
            path="/detalle/:id"
            element={<DetalleProducto usuarioLogueado={usuarioLogueado}></DetalleProducto>}
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
            path="/registro"
            element={<Registro tituloRegistro='Registro' rol={false}></Registro>}
          ></Route>
          <Route
            exact
            path="/pedidos"
            element={<Pedidos usuarioLogueado={usuarioLogueado} actualizarIndicePedidos={actualizarIndicePedidos}></Pedidos>}
          ></Route>
          <Route
            exact
            path="/login"
            element={
              <Login setUsuarioLogueado={setUsuarioLogueado}/>
            }
          ></Route>
          <Route exact path="/acercade" element={<AcercaDe></AcercaDe>}></Route>
          <Route exact path="/contacto" element={<Contacto></Contacto>}></Route>
          <Route path="*" element={<Error404></Error404>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;