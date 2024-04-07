import { Button } from "react-bootstrap";

const ItemProducto = ({ producto }) => {
    return (
        <tr>
        <td>{producto.nombreProducto}</td>
        <td className="text-center">
          <img
            src={producto.imagen}
            className="img-thumbnail"
            alt="imagen del producto"
          ></img>
        </td>
        <td>{producto.categoria}</td>
        <td className="text-center">
          <Button
            className="btn btn-warning me-1"
          >
            <i className="bi bi-pencil-square"></i>
          </Button>
          <Button variant="danger" >
            <i className="bi bi-trash"></i>
          </Button>
        </td>
      </tr>
    );
};

export default ItemProducto;