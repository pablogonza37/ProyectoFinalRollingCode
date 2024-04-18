import { Container, Table, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import ItemVenta from "./ItemVenta";
import { leerUsuariosAPI, leerVentasAPI, leerProductosAPI } from "../../../helpers/queries"; // Agrega la función leerProductosAPI si no existe

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]); // Nuevo estado para almacenar productos
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroProducto, setFiltroProducto] = useState(""); // Nuevo estado para filtrar por producto

  useEffect(() => {
    cargarUsuariosRegistrados();
    cargarDatosVentas();
    cargarProductos(); // Llama a la función para cargar los productos
  }, []);

  useEffect(() => {
    calcularTotal();
  }, [ventas, filtroUsuario, filtroFecha, filtroProducto]); // Agrega filtroProducto al arreglo de dependencias

  const handleFiltroUsuarioChange = (e) => {
    setFiltroUsuario(e.target.value);
  };

  const handleFiltroFechaChange = (e) => {
    setFiltroFecha(e.target.value);
  };

  const handleFiltroProductoChange = (e) => {
    setFiltroProducto(e.target.value);
  };

  const cargarUsuariosRegistrados = async () => {
    try {
      const usuariosRegistrados = await leerUsuariosAPI();
      setUsuarios(usuariosRegistrados);
    } catch (error) {
      console.log(error);
    }
  };

  const cargarDatosVentas = async () => {
    try {
      const respuesta = await leerVentasAPI();
      setVentas(respuesta);
    } catch (error) {
      console.log(error);
    }
  };

  const cargarProductos = async () => { // Función para cargar los productos
    try {
      const productosObtenidos = await leerProductosAPI(); // Utiliza la función para leer los productos
      setProductos(productosObtenidos);
    } catch (error) {
      console.log(error);
    }
  };

  const filtrarVentas = () => {
    return ventas.filter((venta) => {
      if (filtroUsuario !== "" && venta.usuario !== filtroUsuario) return false;
      if (filtroFecha !== "" && venta.fecha !== filtroFecha) return false;
      if (filtroProducto !== "" && venta.nombreProducto !== filtroProducto) return false; // Agrega la condición para filtrar por producto
      return true;
    });
  };

  const calcularTotal = () => {
    let totalPrecio = 0;
    const ventasFiltradas = filtrarVentas();
    ventasFiltradas.forEach((venta) => {
      totalPrecio += parseFloat(venta.precioTotal);
    });
    setTotalVentas(totalPrecio);
  };

  return (
    <Container className="mainSection my-4">
      <h2 className="display-4">Ventas</h2>
      <hr />
      <div>
        <div className="mb-3">
          <label htmlFor="filtroUsuario" className="form-label">
            Filtrar por usuario:
          </label>
          <select
            id="filtroUsuario"
            className="form-select w-100"
            value={filtroUsuario}
            onChange={handleFiltroUsuarioChange}
          >
            <option value="">Todos los usuarios</option>
            {usuarios.map((usuario) => (
              <option key={usuario._id} value={usuario.email}>
                {usuario.email}
              </option>
            ))}
          </select>
          <label htmlFor="filtroFecha" className="form-label mt-3">
            Filtrar por fecha:
          </label>
          <input
            type="date"
            id="filtroFecha"
            className="form-control"
            value={filtroFecha}
            onChange={handleFiltroFechaChange}
          />
          <label htmlFor="filtroProducto" className="form-label mt-3"> {/* Agrega el label para filtrar por producto */}
            Filtrar por producto:
          </label>
          <select
            id="filtroProducto"
            className="form-select w-100"
            value={filtroProducto}
            onChange={handleFiltroProductoChange}
          >
            <option value="">Todos los productos</option>
            {productos.map((producto) => (
              <option key={producto._id} value={producto.nombreProducto}> {/* Suponiendo que el nombre es único */}
                {producto.nombreProducto}
              </option>
            ))}
          </select>
        </div>
        {ventas.length === 0 ? (
          <p className="alert alert-danger">No hay ventas.</p>
        ) : (
          <Table responsive striped bordered hover className="shadow">
            <thead className="table-dark">
              <tr className="text-center">
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {ventas
                .filter((venta) => {
                  if (filtroUsuario === "") return true;
                  return venta.usuario === filtroUsuario;
                })
                .filter((venta) => {
                  if (filtroFecha === "") return true;
                  return venta.fecha === filtroFecha;
                })
                .filter((venta) => {
                  if (filtroProducto === "") return true; // Agrega la condición para filtrar por producto
                  return venta.nombreProducto === filtroProducto; // Agrega la condición para filtrar por producto
                })
                .map((venta) => (
                  <ItemVenta key={venta._id} venta={venta}></ItemVenta>
                ))}
            </tbody>
          </Table>
        )}
      </div>

      <div className="text-end alert alert-info lead">
        <Badge bg="success">Total: ${totalVentas}</Badge>
      </div>
    </Container>
  );
};

export default Ventas;
