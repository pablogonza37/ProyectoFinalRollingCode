import React from 'react';
import { Button } from 'react-bootstrap';
import { borrarPedidoAPI, obtenerPedidosAPI, cambiarEstadoPedidoAPI } from "../../../helpers/queries";
import Swal from "sweetalert2";

const ItemPedido = ({ pedido, setPedidos, usuarioLogueado, usuario, desactivarBotones }) => {
  const borrarPedido = () => {
    Swal.fire({
      title: "¿Estas seguro de eliminar el pedido?",
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
            title: "Ocurrio un error",
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
        await cambiarEstadoPedidoAPI(pedido._id); 
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

  return (
    <tr>
      {usuarioLogueado.rol === "admin" && (
        <td>
         {usuario}
        </td>
      )}
      <td>{pedido.fecha}</td>
      <td>{pedido.nombreProducto}</td>
      <td className="text-center">
        <img
          src={pedido.imagen}
          className="img-thumbnail"
          alt="imagen del producto"
        ></img>
      </td>
      <td>${pedido.precio}</td>
      <td>{pedido.estado}</td>
      <td className="text-center">
      {usuarioLogueado.rol === "admin" && (
        <Button variant="success" onClick={cambiarEstadoPedido} disabled={desactivarBotones}>
        <i className="bi bi-check-square-fill"></i>
      </Button>
      )}
        <Button 
          variant="danger" 
          onClick={borrarPedido} 
          disabled={usuarioLogueado.rol === "usuario" && pedido.estado === "realizado"}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemPedido;
