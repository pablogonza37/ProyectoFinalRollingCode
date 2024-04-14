import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import ItemPedido from "./ItemPedido";
import { useEffect, useState } from "react";
import { obtenerPedidosAPI, cambiarEstadoPedidoAPI } from "../../../helpers/queries";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Pedidos = ({ usuarioLogueado }) => {
  const [pedidos, setPedidos] = useState([]);
  const [total, setTotal] = useState();
  const navegacion = useNavigate();

  useEffect(() => {
    if (!usuarioLogueado) {
      navegacion("/login");
    } else {
      cargarDatosPedidos();
    }
  }, []);

  useEffect(() => {
    calcularTotal();
  }, [pedidos]);

  const cargarDatosPedidos = async () => {
    try {
      const respuesta = await obtenerPedidosAPI();
      setPedidos(respuesta);
    } catch (error) {
      console.log(error);
    }
  };

  const calcularTotal = () => {
    let totalPrecio = 0;
    pedidos.forEach((pedido) => {
      totalPrecio += parseFloat(pedido.precio);
    });
    setTotal(totalPrecio);
  };

  const confirmarPedido = async () => {
    if (pedidos.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No hay pedidos",
        text: "Debe realizar un pedido.",
      });
      return;
    }
    const pedidoEntregado = pedidos.find(
      (pedido) => pedido.estado === "entrega"
    );
    if (pedidoEntregado) {
      Swal.fire({
        icon: "warning",
        title: "Pedido ya enviado",
        text: `El pedido "${pedidoEntregado.nombreProducto}" ya está marcado como entregado.`,
      });
      return;
    }
  
    try {
      await Promise.all(pedidos.map(async (pedido) => {
        if (pedido.estado === "pendiente") {
          await cambiarEstadoPedidoAPI(pedido._id);
          setPedidos(prevPedidos => prevPedidos.map(prevPedido => 
            prevPedido._id === pedido._id ? {...prevPedido, estado: "realizado"} : prevPedido
          ));
        }
      }));
  
      Swal.fire({
        icon: "success",
        title: "Pedidos confirmados",
        text: "Los pedidos han sido confirmados y marcados como entregados.",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error al confirmar pedidos",
        text: "Hubo un error al confirmar los pedidos.",
      });
    }
  };

  return (
    <Container className="mainSection my-4">
      <Row>
        <h2 className="display-4">Pedidos</h2>
        <hr />
        <Col md={9}>
          {pedidos.length === 0 ? (
            <p className="alert alert-danger">No hay pedidos disponibles.</p>
          ) : (
            <Table responsive striped bordered hover className="shadow">
              <thead className="table-dark">
                <tr>
                  <th>Fecha</th>
                  <th>Nombre</th>
                  <th>Imagen</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <ItemPedido
                    key={pedido._id}
                    pedido={pedido}
                    setPedidos={setPedidos}
                  ></ItemPedido>
                ))}
              </tbody>
            </Table>        
          )}
          <Link
            variant="success"
            className="my-2 btn btn-success"
            to='/#menu'
          >
            Volver al menu
          </Link>
        </Col>
        <Col md={3}>
          <Card className="mt-3 mt-lg-0 mt-md-0 shadow">
            <Card.Header className="text-bg-dark">Estado de pedido</Card.Header>
            <Card.Body>
              <div>
                Envio: <span className="text-warning">gratis</span> <hr />
                Total: ${total}
              </div>
              <Button
                variant="success"
                className="mt-2"
                onClick={confirmarPedido}
              >
                Confirmar Pedido
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Pedidos;
