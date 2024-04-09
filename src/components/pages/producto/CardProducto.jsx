import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { crearPedidoAPI } from "../../../helpers/queries";
import Swal from "sweetalert2";

const CardProducto = ({ producto }) => {

  const hacerPedido = async () => {
    const pedido = {
      id: producto.id,
      nombreProducto: producto.nombreProducto,
      imagen: producto.imagen,
      precio: producto.precio
    };
    
    const resp = await crearPedidoAPI(pedido);
    if (resp.status === 201) {
      Swal.fire({
        title: "Pedido realizado",
        text: `El pedido de "${producto.nombreProducto}" fue realizado correctamente`,
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Ocurrio un error",
        text: `El pedido de "${producto.nombreProducto}" no pudo ser realizado. Intente esta operación en unos minutos`,
        icon: "error",
      });
    }
  }

  return (
    <Col md={4} lg={3} className="mb-3">
      <Card className="h-100">
        <div>
          <img
            src={producto.imagen}
            alt="Hamburguesa"
            className="card-img-top-nueva"
          />
        </div>
        <Card.Body>
          <Card.Title className="primary-font">{producto.nombreProducto}</Card.Title>
          <Card.Text>
            Descripción: {producto.descripcionBreve}.{" "}
            <br className="mb-2" />
            <span className="fw-bold">{producto.precio}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-end">
          <Button className="btn btn-primary me-2 mb-2" onClick={hacerPedido}>Hacer pedido</Button>
          <Link className="btn btn-success me-2" to={"/detalle/" + producto.id}>
            Ver más
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardProducto;
