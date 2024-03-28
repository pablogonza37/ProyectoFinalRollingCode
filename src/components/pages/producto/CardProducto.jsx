import { Col, Card, Button } from "react-bootstrap";

const CardProducto = () => {
  return (
    <Col md={4} lg={3} className="mb-3">
      <Card className="h-100">
        <div>
          <img
            src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg"
            alt="Hamburguesa"
            className="card-img-top-nueva"
          />
        </div>
        <Card.Body>
          <Card.Title className="primary-font">Hamburguesa</Card.Title>
          <Card.Text>
            Descripción: hfjhasjkhjkashfjkhasfjkhskjhfkjash.{" "}
            <br className="mb-2" />
            <span className="fw-bold">Precio: $5000</span>
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
