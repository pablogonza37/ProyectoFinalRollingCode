import { Button } from "react-bootstrap";
import { borrarPedidoAPI, obtenerPedidosAPI } from "../../../helpers/queries";
import Swal from "sweetalert2";

const ItemPedido = ({ pedido, setPedidos }) => {
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
        const respuesta = await borrarPedidoAPI(pedido.id);
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

    return (
        <tr>
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
          <Button variant="danger" onClick={borrarPedido}>
            <i className="bi bi-trash"></i>
          </Button>
        </td>
      </tr>
    );
};

export default ItemPedido;