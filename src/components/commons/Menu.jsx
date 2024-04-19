import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logoRollingBistro.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import Swal from "sweetalert2";

const Menu = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navegacion = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("usuarioRollingBistro");
    setUsuarioLogueado("");
    Swal.fire({
      title: "¡Sesión cerrada!",
      text: "Has cerrado sesión exitosamente.",
      icon: "success",
      button: "Aceptar"
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
          className="custom-toggler"
        />
        <Navbar.Collapse id="responsive-navbar-nav bg-dark" className="text-white">
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
            <NavLink end className="text-white nav-link" to="/pedidos">
              Pedidos
            </NavLink>
            {usuarioLogueado !== "" ? (
              <>
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
                <div className="ms-lg-5 d-flex flex-column flex-lg-row border border-light rounded navLogin">
                  <Button
                    className="nav-link text-white "
                    variant="link"
                    onClick={logout}
                  >
                    Cerrar sesión
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="ms-lg-5 d-flex flex-column flex-lg-row">
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
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
