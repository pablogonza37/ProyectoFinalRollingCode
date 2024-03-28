import { Container, Row, Col } from "react-bootstrap";

const Inicio = () => {
  return (
    <section className="mainSection w-100">
      <div className="relativeContainer w-100">
        <h1 className="slogan text-white display-1 text-center">
          Rolling Bistro <br />
          <span className="display-6">¡Sabores autenticos.!</span>
        </h1>

        <img
          className="banner shadow"
          src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg"
          alt="imagen banner"
        />
      </div>
      <Container className='container'>
        <Row>
          <Col md={6} className="p-lg-5 text-bg-light d-flex align-items-center lead">
            Rolling bistro: Un restaurante moderno con cocina innovadora,
            ambiente acogedor y servicio excepcional. ideal para disfrutar de
            una experiencia gastronomica unica.
          </Col>
          <Col md={6} className="p-lg-5">
            <img
              src="https://static.wixstatic.com/media/46dc18_3487b934a84548e090e13f5ce1bf08ad~mv2.jpg/v1/fill/w_555,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/46dc18_3487b934a84548e090e13f5ce1bf08ad~mv2.jpg"
              alt=""
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Inicio;
