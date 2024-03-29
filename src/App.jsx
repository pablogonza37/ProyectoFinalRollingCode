import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Inicio from "./components/pages/Inicio";
import Menu from "./components/commons/Menu";
import { useState } from "react";

function App() {

  return (
    <>
      <Menu></Menu>
      <Inicio></Inicio>
    </>
  );
}

export default App;
