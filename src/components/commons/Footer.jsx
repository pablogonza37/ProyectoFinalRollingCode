import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="text-white footer py-5 text-center">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <div>
              <h3>Dirección</h3>
              <p>
                <i className="bi bi-geo-alt-fill"></i>
                <a
                  href="https://www.google.com/maps/dir//Gral.+Paz+576,+T4000+San+Miguel+de+Tucum%C3%A1n,+Tucum%C3%A1n/@-26.8365594,-65.2895685,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x94225d3ad7f30f1d:0xf8606cd659b8e3e4!2m2!1d-65.207167!2d-26.8365833?entry=ttu"
                  className="text-white" target="_blank"
                >
                  Gral. Paz 576, T4000 San Miguel
                </a>
              </p>
              <p>Tucumán, Argentina</p>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            {" "}
            <div>
              <h3>Horarios</h3>
              <p>Lun - Vie: 11:00 - 22:00</p>
              <p>Sáb - Dom: 11:00 - 24:00</p>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            {" "}
            <div>
              <h3>Contáctanos</h3>
              <p><Link className="text-white" to='*'>info@rollingbistro.com</Link></p>
              <p>+54-0381-12345678</p>
            </div>
          </Col>
        </Row>
        <hr />
        <p>&copy; Todos los derechos reservados</p>
      </Container>
    </section>
  );
};

export default Footer;
