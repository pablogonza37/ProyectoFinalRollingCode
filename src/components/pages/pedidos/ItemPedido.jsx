import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import {
  borrarPedidoAPI,
  obtenerPedidosAPI,
  cambiarEstadoPedidoAPI,
  cambiarPedidoAPI,
} from "../../../helpers/queries";
import Swal from "sweetalert2";

const ItemPedido = ({
  pedido,
  setPedidos,
  usuarioLogueado,
  desactivarBotones,
}) => {
  const [cantidad, setCantidad] = useState(pedido.cantidad);

  const borrarPedido = async () => {
    Swal.fire({
      title: "¿Estás seguro de eliminar el pedido?",
      text: "No se puede revertir este proceso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarPedidoAPI(pedido._id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Pedido Eliminado",
            text: `El Pedido "${pedido.nombreProducto}" fue eliminado correctamente`,
            icon: "success",
          });

          const listaPedidos = await obtenerPedidosAPI();
          setPedidos(listaPedidos);
        } else {
          Swal.fire({
            title: "Ocurrió un error",
            text: `El pedido "${pedido.nombreProducto}" no fue eliminado. Intente realizar esta operación en unos minutos`,
            icon: "error",
          });
        }
      }
    });
  };

  const cambiarEstadoPedido = async () => {
    Swal.fire({
      title: "¿Estás seguro de cambiar el estado del pedido?",
      text: "Esta acción actualizará el estado del pedido",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cambiar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await cambiarEstadoPedidoAPI("en proceso", pedido._id);
        Swal.fire({
          title: "Estado del Pedido Actualizado",
          text: `El estado del pedido "${pedido.nombreProducto}" ha sido actualizado correctamente`,
          icon: "success",
        });
        const listaPedidos = await obtenerPedidosAPI();
        setPedidos(listaPedidos);
      }
    });
  };

  const handleChangeCantidad = async (e) => {
    const nuevaCantidad = parseInt(e.target.value);
    setCantidad(nuevaCantidad);
    const nuevoPrecioTotal = nuevaCantidad * pedido.precio;
    const pedidoActualizado = {
      ...pedido,
      cantidad: nuevaCantidad,
      precioTotal: nuevoPrecioTotal,
    };
    const respuesta = await cambiarPedidoAPI(
      pedidoActualizado,
      pedido._id
    );
    if (respuesta.status === 200) {
      const listaPedidos = await obtenerPedidosAPI();
      setPedidos(listaPedidos);
    } else {
      Swal.fire({
        title: "Error al actualizar la cantidad",
        text: "No se pudo actualizar la cantidad del pedido. Intente nuevamente más tarde.",
        icon: "error",
      });
    }
  };

  return (
    <Card className="mb-3 w-100 shadow">
      <Card.Body>
        <div className="row">
          <div className="col-md-2 d-none d-md-block">
            <Card.Img
              src={pedido.imagen}
              className="img-thumbnail"
              alt="imagen del producto"
            />
          </div>
          <div className="col-md-7">
            <Card.Title>{pedido.nombreProducto}</Card.Title>
            <hr />
            <Card.Text>
              <strong>Fecha:</strong> {pedido.fecha}
              <br />
              <strong>Cantidad:</strong>
              <input
                type="number"
                min="1"
                value={cantidad}
                onChange={handleChangeCantidad}
                className="form-control mb-1 selectCantidad"
                disabled={
                  usuarioLogueado.rol === "usuario" &&
                  pedido.estado !== "pendiente"
                }
                style={{
                  width: "60px",
                  display: "inline-block",
                  marginRight: "5px",
                }}
              />
              <br />
              <strong>Precio:</strong> ${pedido.precioTotal}
              <br />
              <strong>Estado:</strong>
              <span className="badge text-bg-primary">{pedido.estado}</span>
            </Card.Text>
          </div>
          <div className="col-md-3 text-right">
            {usuarioLogueado.rol === "admin" && (
              <>
                <Button
                  variant="success"
                  onClick={cambiarEstadoPedido}
                  disabled={desactivarBotones}
                >
                  <i className="bi bi-check-square-fill"></i>
                </Button>{" "}
              </>
            )}
            <Button variant="danger" onClick={borrarPedido} disabled={desactivarBotones}>
              <i className="bi bi-trash"></i>
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ItemPedido;
