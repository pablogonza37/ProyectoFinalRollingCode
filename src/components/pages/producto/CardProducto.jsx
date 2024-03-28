import { Col, Card, Button } from "react-bootstrap";

const CardProducto = () => {
  return (
    <Col md={4} lg={3} className="mb-3">
      <Card className="h-100">
        <div>
          <img
            src="https://images.pexels.com/photos/414555/pexels-photo-414555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="cafe"
            className="card-img-top-nueva"
          />
        </div>
        <Card.Body>
          <Card.Title className="primary-font">Capuchino</Card.Title>
          <Card.Text>
            Descripción: Espuma de leche cremosa sobre un espresso fuerte.{" "}
            <br className="mb-2" />
            <span className="fw-bold">Precio: $350</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-end">
          <Button className="btn btn-primary me-2 mb-2">Hacer pedido</Button>
          <Button className="btn btn-success me-2 mb-2">Ver más</Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardProducto;
