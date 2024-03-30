import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import Inicio from "./components/pages/Inicio";
import Menu from "./components/commons/Menu";
import { useState } from "react";
import Footer from "./components/commons/Footer";

function App() {

  return (
    <>
      <Menu></Menu>
      <Inicio></Inicio>
      <Footer></Footer>
    </>
  );
}

export default App;
