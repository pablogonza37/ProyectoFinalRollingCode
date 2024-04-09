import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import ItemPedido from "./ItemPedido";

const Pedidos = () => {
  return (
    <Container className="mainSection my-4">
      <Row>
        <h2 className="display-4">Pedidos</h2>
        <hr />
        <Col md={9}>
          <Table responsive striped bordered hover className="shadow">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              
                <ItemPedido
                 
                ></ItemPedido>
              
            </tbody>
          </Table>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Header className="text-bg-dark">Estado de pedido</Card.Header>
            <Card.Body>
              <Card.Text>
                Envio: <span className="text-warning">gratis</span> <hr />
                Total: $10000
              </Card.Text>
              <Button variant="primary">Confirmar Pedido</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Pedidos;
