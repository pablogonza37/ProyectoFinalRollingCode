import { Button } from "react-bootstrap";

const ItemProducto = () => {
    return (
        <tr>
        <td>Hamburgueasa</td>
        <td className="text-center">
          <img
            src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg"
            className="img-thumbnail"
            alt=""
          ></img>
        </td>
        <td>Hamburguesas</td>
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