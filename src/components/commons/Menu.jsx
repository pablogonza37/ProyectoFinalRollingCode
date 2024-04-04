import { Nav, Navbar, Container, Button } from "react-bootstrap";
import logo from "../../assets/logoRollingBistro.png";
import NavDropdown from "react-bootstrap/NavDropdown";

const Menu = ({ openLoginModal }) => {
  return (
    <Navbar collapseOnSelect expand="lg" className="nav text-white">
      <Container>
        <Navbar.Brand href="#home"><img src={logo} alt="logo" className="img-fluid" width={200} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler"/>
        <Navbar.Collapse id="responsive-navbar-nav" className="text-white">
          <Nav className="m-auto ">
            <Nav.Link href="#features" className="text-white">Inicio</Nav.Link>
            <Nav.Link href="#pricing" className="text-white">Acerca de</Nav.Link>
            <NavDropdown title="Administrador" id="collapsible-nav-dropdown" >
              <NavDropdown.Item href="#action/3.1">Productos</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Usuarios
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" className="text-white">
                Pedidos
              </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets" className="text-white">Registro</Nav.Link>
            <Nav.Link eventKey={2} href="" className="text-white" onClick={openLoginModal}>
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;