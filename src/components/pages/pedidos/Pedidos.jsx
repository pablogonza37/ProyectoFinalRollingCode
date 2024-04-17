import { Container, Modal, Button, Card, Form } from "react-bootstrap";
import ItemPedido from "./ItemPedido";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  obtenerPedidosAPI,
  cambiarEstadoPedidoAPI,
  leerUsuariosAPI,
} from "../../../helpers/queries";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Pedidos = ({ usuarioLogueado }) => {
  const [pedidos, setPedidos] = useState([]);
  const [total, setTotal] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
      cargarDatosPedidos();
      if (usuarioLogueado.rol === "admin") {
        cargarUsuariosRegistrados();
      }
  }, []);

  useEffect(() => {
    calcularTotal();
  }, [pedidos, filtroUsuario, filtroFecha, filtroEstado]);

  const cargarDatosPedidos = async () => {
    try {
      const respuesta = await obtenerPedidosAPI();
      if (usuarioLogueado.rol === "admin") {
        setPedidos(respuesta);
      } else {
        const pedidosFiltrados = respuesta.filter(
          (pedido) => pedido.usuario === usuarioLogueado.email
        );
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
    const pedidosFiltrados = pedidos.filter((pedido) => {
      if (filtroUsuario !== "" && pedido.usuario !== filtroUsuario)
        return false;
      if (filtroEstado !== "" && pedido.estado !== filtroEstado) return false;
      if (filtroFecha !== "" && pedido.fecha !== filtroFecha) return false;
      return true;
    });
    pedidosFiltrados.forEach((pedido) => {
      totalPrecio += parseFloat(pedido.precioTotal);
    });
    setTotal(totalPrecio);
  };

  const onSubmit = async (data) => {
    if (pedidos.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No hay pedidos",
        text: "Debe realizar un pedido.",
      });
      return;
    }

    try {
      await Promise.all(
        pedidos.map(async (pedido) => {
          if (pedido.estado === "pendiente") {
            await cambiarEstadoPedidoAPI(pedido._id);
            setPedidos((prevPedidos) =>
              prevPedidos.map((prevPedido) =>
                prevPedido._id === pedido._id
                  ? { ...prevPedido, estado: "en proceso" }
                  : prevPedido
              )
            );
          }
        })
      );

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
        {usuarioLogueado.rol === "admin" && (
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
            <label htmlFor="filtroEstado" className="form-label mt-3">
              Filtrar por estado:
            </label>
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
          </div>
        )}
        {pedidos.length === 0 ? (
          <p className="alert alert-danger">No hay pedidos.</p>
        ) : (
          <div>
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
                return pedido.fecha === filtroFecha;
              })
              .map((pedido) => (
                <ItemPedido
                  usuarioLogueado={usuarioLogueado}
                  usuario={pedido.usuario}
                  key={pedido._id}
                  pedido={pedido}
                  setPedidos={setPedidos}
                  desactivarBotones={pedido.estado === "realizado"}
                  setTotal={setTotal}
                ></ItemPedido>
              ))}
          </div>
        )}

        <Link variant="success" className="my-2 btn btn-success" to="/#menu">
          <i className="bi bi-arrow-left">Volver al menu</i>
        </Link>
      </div>

      <Card className="mt-3 mt-lg-0 mt-md-0 shadow">
        <Card.Body>
          <div>
          <strong>Envio:</strong><span className="text-warning">Gratis</span> <hr />
          <strong>Total:</strong> ${total}
          </div>
          <Button variant="success" className="mt-2" onClick={handleShow}>
            Confirmar Pedido
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Entrega</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu dirección de entrega"
                {...register("direccion", {
                  required: "La dirección es requerida",
                })}
              />
              {errors.direccion && <p>{errors.direccion.message}</p>}
            </Form.Group>

            <Form.Group controlId="formCiudad">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu ciudad"
                {...register("ciudad", { required: "La ciudad es requerida" })}
              />
              {errors.ciudad && <p>{errors.ciudad.message}</p>}
            </Form.Group>

            <Form.Group controlId="formDetalle">
              <Form.Label>Detalle(opcional)</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                as="textarea"
                {...register("detalle", {
                  maxLength: {
                    value: 100,
                    message: "El detalle debe tener como máximo 100 caracteres",
                  },
                })}
              />
              {errors.descripcionAmplia && (
                <p>{errors.descripcionAmplia.message}</p>
              )}
            </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Enviar
          </Button>
         
        </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Pedidos;
