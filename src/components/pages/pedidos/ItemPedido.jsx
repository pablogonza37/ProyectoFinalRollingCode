import { Button } from "react-bootstrap";

const ItemPedido = ({ pedido, setPedidos }) => {
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
          <Button variant="danger">
            <i className="bi bi-trash"></i>
          </Button>
        </td>
      </tr>
    );
};

export default ItemPedido;