import { Button } from "react-bootstrap";

const ItemPedido = () => {
    return (
        <tr>
        <td>pedido</td>
        <td className="text-center">
          <img
            src=""
            className="img-thumbnail"
            alt="imagen del producto"
          ></img>
        </td>
        <td>$500</td>
        <td>pendiente</td>
        <td className="text-center">
        <Button
          className="btn btn-warning me-1"
        >
          <i className="bi bi-pencil-square"></i>
        </Button>
          <Button variant="danger">
            <i className="bi bi-trash"></i>
          </Button>
        </td>
      </tr>
    );
};

export default ItemPedido;