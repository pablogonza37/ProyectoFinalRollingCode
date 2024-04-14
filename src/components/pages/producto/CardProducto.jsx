import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { crearPedidoAPI } from "../../../helpers/queries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CardProducto = ({ producto, usuarioLogueado }) => {
  const navegacion = useNavigate();

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
        fecha: obtenerFechaDeHoy(),
        nombreProducto: generarIdUnico(producto.nombreProducto),
        imagen: producto.imagen,
        precio: producto.precio,
        estado: "pendiente"
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
          title: "Ocurrió un error",
          text: `El pedido de "${producto.nombreProducto}" no pudo ser realizado. Intente esta operación en unos minutos`,
          icon: "error",
        });
      }
    } else {
      navegacion('/login');
    }
  };

  const generarIdUnico = (nombreProducto) => {
    return nombreProducto + "_" + Date.now();
  };

  const obtenerFechaDeHoy = () => {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${año}`;

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
            Descripción: {producto.descripcionBreve}.{" "}
            <br className="mb-2" />
            <span className="fw-bold lead">${producto.precio}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-end">
          <Button className="btn btn-primary me-2 mb-2" onClick={hacerPedido}>Hacer pedido</Button>
          <Link className="btn btn-success me-2  mb-2" to={"/detalle/" + producto._id}>
            Ver más
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardProducto;
