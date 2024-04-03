import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import Inicio from "./components/pages/Inicio";
import Menu from "./components/commons/Menu";
import { useState } from "react";
import Footer from "./components/commons/Footer";
import LoginModal from './components/commons/Login';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Menu openLoginModal={openModal} />
      <LoginModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      <Inicio></Inicio>
      <Footer></Footer>
    </>
  );
}

export default App;