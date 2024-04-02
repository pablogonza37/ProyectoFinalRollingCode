import { Container, Card } from "react-bootstrap";

const DetalleProducto = () => {
  return (
    <section className="mainSection">
      <Container>
        <Card className="d-flex ">
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default DetalleProducto;
