import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { borrarProductoAPI, leerProductosAPI } from "../../../helpers/queries";

const ItemProducto = ({ producto, setData }) => {
  const borrarProducto = () => {
    Swal.fire({
      title: "¿Estas seguro de eliminar el producto?",
      text: "No se puede revertir este proceso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarProductoAPI(producto._id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Producto eliminado",
            text: `El producto "${producto.nombreProducto}" fue eliminado correctamente`,
            icon: "success",
          });

          const listaProductos = await leerProductosAPI();
          setData(listaProductos);
        } else {
          Swal.fire({
            title: "Ocurrio un error",
            text: `El producto "${producto.nombreProducto}" no fue eliminado. Intente realizar esta operación en unos minutos`,
            icon: "error",
          });
        }
      }
    });
  };

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
        <td>$ {producto.precio}</td>
        <td className="text-center">
        <Link
          className="btn btn-warning me-1"
          to={"/administrador/productos/editar/" + producto._id}
        >
          <i className="bi bi-pencil-square"></i>
        </Link>
          <Button variant="danger" onClick={borrarProducto}>
            <i className="bi bi-trash"></i>
          </Button>
        </td>
      </tr>
    );
};

export default ItemProducto;