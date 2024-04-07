import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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
        <Link
          className="btn btn-warning me-1"
          to={"/administrador/productos/editar/" + producto.id}
        >
          <i className="bi bi-pencil-square"></i>
        </Link>
          <Button variant="danger" >
            <i className="bi bi-trash"></i>
          </Button>
        </td>
      </tr>
    );
};

export default ItemProducto;