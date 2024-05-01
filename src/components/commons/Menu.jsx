import { useState } from 'react';
import { Nav, Navbar, Container, Button, Badge } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logoRollingBistro.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import Swal from "sweetalert2";
import { BiX } from "react-icons/bi"; // Importa el icono de Bootstrap

const Menu = ({ usuarioLogueado, setUsuarioLogueado, pedidosPendientes }) => {
  const navegacion = useNavigate();
  const [menuDesplegado, setMenuDesplegado] = useState(false); // Estado para controlar si el menú está desplegado

  const toggleMenu = () => {
    setMenuDesplegado(!menuDesplegado);
  };

  const logout = () => {
    sessionStorage.removeItem("usuarioRollingBistro");
    setUsuarioLogueado("");
    Swal.fire({
      title: "¡Sesión cerrada!",
      text: "Has cerrado sesión correctamente.",
      icon: "success",
      button: "Aceptar",
    });
    navegacion("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="nav text-white py-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="logo" className="img-fluid" width={200} />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="custom-toggler border-0"
          onClick={toggleMenu} 
        >
          {menuDesplegado ? ( 
            <i className="text-white bi bi-x-lg"></i>
          ) : (
            <span className="navbar-toggler-icon"></span> 
          )}
        </Navbar.Toggle>
        <Navbar.Collapse
          id="responsive-navbar-nav bg-dark"
          className={`text-white ${menuDesplegado ? "show" : ""}`} 
        >
          <Nav className="m-auto">
            <NavLink end className="text-white nav-link" to="/">
              Inicio
            </NavLink>
            <NavLink end className="text-white nav-link" to="/acercade">
              Acerca de
            </NavLink>
            <NavLink end className="text-white nav-link" to="/contacto">
              Contacto
            </NavLink>
            {usuarioLogueado !== "" && (
              <>
                <NavLink end className="text-white nav-link" to="/pedidos">
                  Pedidos{" "}
                  {pedidosPendientes.length > 0 && usuarioLogueado && (
                    <Badge bg="success" className="mb-1">
                      {pedidosPendientes.length}
                    </Badge>
                  )}
                </NavLink>
                {usuarioLogueado.rol === "admin" && (
                  <NavDropdown
                    title="Administrador"
                    id="collapsible-nav-dropdown"
                  >
                    <NavLink
                      end
                      className="nav-link"
                      to="/administrador/productos"
                    >
                      Productos
                    </NavLink>
                    <NavLink
                      end
                      className="nav-link"
                      to="/administrador/usuarios"
                    >
                      Usuarios
                    </NavLink>
                    <NavLink
                      end
                      className="nav-link"
                      to="/administrador/ventas"
                    >
                      Ventas
                    </NavLink>
                  </NavDropdown>
                )}
                
              </> 
            )}
           
          </Nav>
          {usuarioLogueado === "" && (
              <Nav className="d-flex flex-column flex-lg-row">
                <NavLink end className="text-white nav-link" to="/registro">
                  Registro
                </NavLink>
                <NavLink
                  className="text-white text-center nav-link border border-light rounded navLogin"
                  variant="link"
                  to="/login"
                >
                  Iniciar sesión
                </NavLink>
              </Nav>
          )}
          {usuarioLogueado !== "" && (
            <Nav className="d-flex flex-column flex-lg-row border border-light rounded navLogin">
              <Button
                className="nav-link text-white "
                variant="link"
                onClick={logout}
              >
                Cerrar sesión
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
