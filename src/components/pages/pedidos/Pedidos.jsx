import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import ItemPedido from "./ItemPedido";
import { useEffect, useState } from "react";
import { obtenerPedidosAPI, cambiarEstadoPedidoAPI, leerUsuariosAPI } from "../../../helpers/queries";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Pedidos = ({ usuarioLogueado }) => {
  const [pedidos, setPedidos] = useState([]);
  const [total, setTotal] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const navegacion = useNavigate();

  useEffect(() => {
    if (!usuarioLogueado) {
      navegacion("/login");
    } else if (usuarioLogueado.suspendido) {
      Swal.fire({
        icon: "warning",
        title: "Cuenta suspendida",
        text: "Su cuenta ha sido suspendida. Por favor, contacte al soporte para más información."
      }).then(() => {
        navegacion("/");
      });
    } else {
      cargarDatosPedidos();
      if (usuarioLogueado.rol === 'admin') {
        cargarUsuariosRegistrados();
      }
    }
  }, []);

  useEffect(() => {
    calcularTotal();
  }, [pedidos]);

  useEffect(() => {
    calcularTotal();
  }, [filtroUsuario]);

  const cargarDatosPedidos = async () => {
    try {
      const respuesta = await obtenerPedidosAPI();
      if (usuarioLogueado.rol === 'admin') {
        setPedidos(respuesta);
      } else {
        const pedidosFiltrados = respuesta.filter(pedido => pedido.usuario === usuarioLogueado.email);
        setPedidos(pedidosFiltrados);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cargarUsuariosRegistrados = async () => {
    try {
      const usuariosRegistrados = await leerUsuariosAPI();
      setUsuarios(usuariosRegistrados);
    } catch (error) {
      console.log(error);
    }
  };

  const calcularTotal = () => {
    let totalPrecio = 0;
    const pedidosFiltrados = pedidos.filter(pedido => {
      if (filtroUsuario === "") return true;
      return pedido.usuario === filtroUsuario;
    });
    pedidosFiltrados.forEach((pedido) => {
      totalPrecio += parseFloat(pedido.precio);
    });
    setTotal(totalPrecio);
  };

  const confirmarPedido = async () => {
    if (pedidos.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No hay pedidos",
        text: "Debe realizar un pedido.",
      });
      return;
    }
    const pedidoEntregado = pedidos.find(
      (pedido) => pedido.estado === "entrega"
    );
    if (pedidoEntregado) {
      Swal.fire({
        icon: "warning",
        title: "Pedido ya enviado",
        text: `El pedido "${pedidoEntregado.nombreProducto}" ya está marcado como entregado.`,
      });
      return;
    }
  
    try {
      await Promise.all(pedidos.map(async (pedido) => {
        if (pedido.estado === "pendiente") {
          await cambiarEstadoPedidoAPI(pedido._id);
          setPedidos(prevPedidos => prevPedidos.map(prevPedido => 
            prevPedido._id === pedido._id ? {...prevPedido, estado: "realizado"} : prevPedido
          ));
        }
      }));
  
      Swal.fire({
        icon: "success",
        title: "Pedidos confirmados",
        text: "Los pedidos han sido confirmados y marcados como entregados.",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error al confirmar pedidos",
        text: "Hubo un error al confirmar los pedidos.",
      });
    }
  };


  const handleFiltroUsuarioChange = (e) => {
    setFiltroUsuario(e.target.value);
  };

  const handleFiltroEstadoChange = (e) => {
    setFiltroEstado(e.target.value);
  };

  const handleFiltroFechaChange = (e) => {
    setFiltroFecha(e.target.value);
  };

  return (
    <Container className="mainSection my-4">
      
        <h2 className="display-4">Pedidos</h2>
        <hr />
        <div>
          {usuarioLogueado.rol === 'admin' && (
            <div className="mb-3">
            <label htmlFor="filtroUsuario" className="form-label">Filtrar por usuario:</label>
            <select
              id="filtroUsuario"
              className="form-select w-100"
              value={filtroUsuario}
              onChange={handleFiltroUsuarioChange}
            >
              <option value="">Todos los usuarios</option>
              {usuarios.map((usuario) => (
                <option key={usuario._id} value={usuario.email}>{usuario.email}</option>
              ))}
            </select>
            <label htmlFor="filtroEstado" className="form-label mt-3">Filtrar por estado:</label>
            <select
              id="filtroEstado"
              className="form-select w-100"
              value={filtroEstado}
              onChange={handleFiltroEstadoChange}
            >
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="realizado">Realizado</option>
              <option value="en proceso">En proceso</option>
            </select>
            <label htmlFor="filtroFecha" className="form-label mt-3">Filtrar por fecha:</label>
            <input
              type="date"
              id="filtroFecha"
              className="form-control"
              value={filtroFecha}
              onChange={handleFiltroFechaChange}
            />
          </div>
          )}
          {pedidos.length === 0 ? (
            <p className="alert alert-danger">No hay pedidos disponibles.</p>
          ) : (
            <Table responsive striped bordered hover className="shadow">
              <thead className="table-dark">
                <tr>
                  {usuarioLogueado.rol === 'admin' && <th>Usuario</th>}
                  <th>Fecha</th>
                  <th>Nombre</th>
                  <th>Imagen</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
              {pedidos
  .filter((pedido) => {
    if (filtroUsuario === "") return true;
    return pedido.usuario === filtroUsuario;
  })
  .filter((pedido) => {
    if (filtroEstado === "") return true;
    return pedido.estado === filtroEstado;
  })
  .filter((pedido) => {
    if (filtroFecha === "") return true;
    // Comparar con la fecha del pedido, puedes ajustar la lógica según sea necesario
    return pedido.fecha === filtroFecha;
  })
  .map((pedido) => (
    <ItemPedido
      usuarioLogueado={usuarioLogueado}
      usuario={pedido.usuario}
      key={pedido._id}
      pedido={pedido}
      setPedidos={setPedidos}
      desactivarBotones={pedido.estado === 'realizado'} 
    ></ItemPedido>
  ))}
              </tbody>
            </Table>        
          )}
          <Link
            variant="success"
            className="my-2 btn btn-success"
            to='/#menu'
          >
            <i className="bi bi-arrow-left">Volver al menu</i>
          </Link>
        </div>
        
        {!usuarioLogueado || (usuarioLogueado.rol !== 'admin' && (
      <Card className="mt-3 mt-lg-0 mt-md-0 shadow">
        <Card.Header className="text-bg-dark">Estado de pedido</Card.Header>
        <Card.Body>
          <div>
            Envio: <span className="text-warning">gratis</span> <hr />
            Total: ${total}
          </div>
          <Button
            variant="success"
            className="mt-2"
            onClick={confirmarPedido}
          >
            Confirmar Pedido
          </Button>
        </Card.Body>
      </Card>
    ))}
      
    </Container>
  );
};

export default Pedidos;
