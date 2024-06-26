import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { crearPedidoAPI } from "../../../helpers/queries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CardProducto = ({ producto, usuarioLogueado, actualizarIndicePedidos }) => {
  const navegacion = useNavigate();
  const [cantidad, setCantidad] = useState(1);

  const hacerPedido = async () => {
    if (usuarioLogueado) {
      if (usuarioLogueado.suspendido) {
        Swal.fire({
          title: "Usuario suspendido",
          text: "Tu cuenta está suspendida. No puedes realizar pedidos.",
          icon: "warning",
        });
        return;
      }
      const pedido = {
        usuario: usuarioLogueado.email,
        fecha: obtenerFechaDeHoy(),
        nombreProducto: producto.nombreProducto,
        imagen: producto.imagen,
        precio: producto.precio,
        precioTotal: producto.precio * cantidad, 
        cantidad: cantidad, 
        estado: "pendiente",
        direccion: "no definida"
      };

      const resp = await crearPedidoAPI(pedido);
      if (resp.status === 201) {
        Swal.fire({
          title: "Pedido realizado",
          text: `El pedido de ${cantidad} "${producto.nombreProducto}" fue realizado correctamente`,
          icon: "success",
        });
        actualizarIndicePedidos()
      } else {
        Swal.fire({
          title: "Ocurrió un error",
          text: `El pedido de "${producto.nombreProducto}" no pudo ser realizado. Intente esta operación en unos minutos`,
          icon: "error",
        });
      }
    } else {
      navegacion('/login');
    }
  };

  const obtenerFechaDeHoy = () => {
    const fecha = new Date();
    const año = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    if (mes < 10) {
        mes = "0" + mes;
    }
    let dia = fecha.getDate();
    if (dia < 10) {
        dia = "0" + dia;
    }
    const fechaFormateada = `${año}-${mes}-${dia}`;
    return fechaFormateada;
};

  return (
    <Col md={4} lg={3} className="mb-3">
      <Card className="h-100 shadow">
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
            {producto.descripcionBreve}.{" "}
            <br className="mb-2" />
            <span className="fw-bold lead">${producto.precio}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex flex-column">
          <div>
          <Button className="btn btn-dark me-2 mb-1" onClick={hacerPedido}>Hacer pedido</Button>
          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
            className="form-control mb-1 selectCantidad"
            style={{ width: "60px", display: "inline-block", marginRight: "5px" }}
          />
          </div>
          <Link className="btn btn-success w-100" to={"/detalle/" + producto._id}>
            Ver más
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardProducto;
