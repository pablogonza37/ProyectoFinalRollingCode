import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logoRollingBistro.png";
import NavDropdown from "react-bootstrap/NavDropdown";

const Menu = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navegacion = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("usuarioRollingBistro");
    setUsuarioLogueado("");
    navegacion("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="nav text-white">
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
                <div className="ms-lg-5 d-flex flex-column flex-lg-row border border-light">
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
                    className="text-white text-center nav-link border border-light"
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
