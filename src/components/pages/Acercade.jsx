import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const AcercaDe = () => {
  const developers = [
    {
      name: "Pablo Gaston Gonzalez",
      role: "¡Hola! Soy Pablo un estudiante apasionado de programación, siempre buscando nuevas formas de crear y desarrollar ideas innovadoras. Me gusta explorar las infinitas posibilidades que ofrece el mundo de la tecnología.",
      image:
        "https://i.ibb.co/jy55pds/Whats-App-Image-2024-04-13-at-19-12-19.jpg",
      github: "https://github.com/pablogonza37",
    },
    {
      name: "José Eugenio Navarro Bovi",
      role: "Soy José Bovi, futuro ingeniero en sistemas y progrmador web. Me gusta trabajar en equipo y pensar soluciones de manera lógica para resolver problemas.",
      image: "https://i.ibb.co/m6KSC91/imgmia.png",
      github: "https://github.com/josxbovi",
    },
  ];

  return (
    <section className="bg-acerceDe">
    <Container className="mt-5 mainSection">
      <h2 className="text-center mb-5 fst-italic text-white bg-black py-3">Acerca de Nosotros</h2>
      <Row>
        {developers.map((developer, index) => (
          <Col md={6} key={index} className="mb-3">
            <Card className="mb-3 h-100 shadow growAnimation">
              <Card.Img variant="top" src={developer.image} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center text-black-90">
                  {developer.name}
                </Card.Title>
                <Card.Text className="text-center">{developer.role}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted d-flex justify-content-center">
                <Button variant="primary">
                  <i className="bi bi-github">
                    <a href={developer.github} className="text-white">
                      {" "}
                      Github
                    </a>
                  </i>
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </section>
  );
};

export default AcercaDe;
