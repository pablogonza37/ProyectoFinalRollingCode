import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import Inicio from "./components/pages/Inicio";
import Menu from "./components/commons/Menu";
import { useState } from "react";
import Footer from "./components/commons/Footer";
import DetalleProducto from "./components/pages/producto/DetalleProducto";

function App() {

  return (
    <>
      <Menu></Menu>
      <Inicio></Inicio>
      <DetalleProducto></DetalleProducto>
      <Footer></Footer>
    </>
  );
}

export default App;
