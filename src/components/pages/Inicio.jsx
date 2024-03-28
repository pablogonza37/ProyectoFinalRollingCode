import { Container, Row, Col, Form, Button } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";

const Inicio = () => {
  return (
    <section className="mainSection">
      <div className="relativeContainer w-100">
        <h1 className="slogan text-white display-1 text-center lead">
          Rolling Bistro <br />
          <span className="display-6">¡Sabores autenticos.!</span>
          <br />
          <Button className="btn btn-success w-50 border border-light" href="#menu">Ver Menu</Button>
        </h1>

        <img
          className="banner shadow"
          src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg"
          alt="imagen banner"
        />
      </div>
      <Container className="container">
        <Row>
          <Col
            md={6}
            className="p-lg-5 p-md-4 text-bg-light d-flex align-items-center lead text-dark-emphasis my-4"
          >
            Rolling bistro: Un restaurante moderno con cocina innovadora,
            ambiente acogedor y servicio excepcional. ideal para disfrutar de
            una experiencia gastronomica unica.
          </Col>
          <Col md={6} className="p-lg-5 p-md-4">
            <img
              src="https://static.wixstatic.com/media/46dc18_3487b934a84548e090e13f5ce1bf08ad~mv2.jpg/v1/fill/w_555,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/46dc18_3487b934a84548e090e13f5ce1bf08ad~mv2.jpg"
              alt=""
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
      <Container className="mt-5" id='menu'>
        <h2 className="display-4">Nuestros Productos</h2>
        <hr />
        <Form.Select aria-label="Default select example" className="mb-4 w-50 ">
          <option>Categoria</option>
          <option value="Italiana">Italiana</option>
          <option value="Vegetariana">Vegetariana</option>
          <option value="Carnes">Carnes a la Parrilla</option>
          <option value="Postres">Postres</option>
          <option value="Americana">Americana</option>
        </Form.Select>
        <Row >
          <CardProducto />
          <CardProducto />
          <CardProducto />
          <CardProducto />
        </Row>
      </Container>
    </section>
  );
};

export default Inicio;
