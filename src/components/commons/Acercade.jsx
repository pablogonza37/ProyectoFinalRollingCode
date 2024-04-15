import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const AcercaDe = () => {
  const developers = [
    {
      name: "Pablo Gaston Gonzalez",
      role: "¡Hola! Soy Pablo un estudiante apasionado de programación, siempre buscando nuevas formas de crear y desarrollar ideas innovadoras. Me gusta explorar las infinitas posibilidades que ofrece el mundo de la tecnología.",
      image:
        "https://i.ibb.co/jy55pds/Whats-App-Image-2024-04-13-at-19-12-19.jpg",
    },
    {
      name: "José Eugenio Navarro Bovi",
      role: "Soy José Bovi, futuro ingeniero en sistemas y progrmador web. Me gusta trabajar en equipo y pensar soluciones de manera lógica para resolver problemas.",
      image: "https://i.ibb.co/m6KSC91/imgmia.png",
    },
    {
      name: "Cristian Julian Aballay",
      role: "Developer",
      image: "url_de_la_imagen_2",
    },
    {
      name: "Ramiro Adrián Velásquez Barrozo",
      role: "Hola soy Ramiro, estoy en busqueda constante de nuevos conocimientos.",
      image: "https://i.ibb.co/6b0YdY4/foto-Ramiro.jpg",
    },
  ];

  return (
    <Container className="mt-5 mainSection">
      <h2 className="text-center mb-5 fst-italic">Acerca de Nosotros</h2>
      <Row>
        {developers.map((developer, index) => (
          <Col md={3} key={index} className="mb-3">
            <Card className="mb-3 h-100 shadow">
              <Card.Img variant="top" src={developer.image} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center text-black-90" >{developer.name}</Card.Title>
                <Card.Text className="text-center">
                  {developer.role}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AcercaDe;
