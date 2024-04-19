import { Container, Modal, Button, Card, Form } from "react-bootstrap";
import ItemPedido from "./ItemPedido";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  obtenerPedidosAPI,
  leerUsuariosAPI,
  cambiarPedidoAPI,
} from "../../../helpers/queries";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Pedidos = ({ usuarioLogueado, actualizarIndicePedidos }) => {
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
  } = useForm();
  const navegacion = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if(!usuarioLogueado){
      navegacion('/login');
      return
    }
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

  const filtrarPedidos = () => {
    return pedidos.filter((pedido) => {
      if (filtroUsuario !== "" && pedido.usuario !== filtroUsuario)
        return false;
      if (filtroEstado !== "" && pedido.estado !== filtroEstado) return false;
      if (filtroFecha !== "" && pedido.fecha !== filtroFecha) return false;
      return true;
    });
  };

  const calcularTotal = () => {
    let totalPrecio = 0;
    const pedidosFiltrados = filtrarPedidos();
    pedidosFiltrados.forEach((pedido) => {
      if (pedido.estado !== "enviado") {
        totalPrecio += parseFloat(pedido.precioTotal);
      }
    });
    setTotal(totalPrecio);
  };

  const confirmarPedido = () => {
    const pedidosFiltrados = filtrarPedidos();
    if (pedidosFiltrados.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No hay pedidos",
        text: "Debe realizar un pedido.",
      });
      return;
    }
    const todosEnProceso = pedidosFiltrados.every(
      (pedido) => pedido.estado !== "pendiente"
    );
    if (todosEnProceso) {
      Swal.fire({
        icon: "warning",
        title: "Pedidos confirmados",
        text: "Todos los pedidos ya han sido confirmados.",
      });
      return;
    }
    handleShow();  
  };

  const onSubmit = async (data) => {
    const pedidosFiltrados = filtrarPedidos().filter((pedido) => pedido.estado === "pendiente");
    if (pedidosFiltrados.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No hay pedidos pendientes",
        text: "No hay pedidos pendientes para confirmar.",
      });
      return;
    }
    try {
      const datosDireccion = `${data.direccion} - ${data.ciudad} - ${data.detalle || ""}`;
      await Promise.all(
        pedidosFiltrados.map(async (pedido) => {
          const pedidoActualizado = {
            ...pedido,
            direccion: datosDireccion,
            estado: "en proceso",
          };
          await cambiarPedidoAPI(pedidoActualizado, pedido._id);
        })
      );
      Swal.fire({
        icon: "success",
        title: "Pedidos confirmados",
        text: "Los pedidos pendientes han sido confirmados y están en proceso.",
        showConfirmButton: false,
        timer: 2000,
      });
      cargarDatosPedidos();
      handleClose();
      reset();
      actualizarIndicePedidos()
    } catch (error) {
      console.log(error);
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
    <Container className="mainSection mt-4">
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
              <option value="enviado">Enviado</option>
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
              .filter((pedido) => {
                if (usuarioLogueado.rol === 'usuario') {
                  return pedido.estado !== 'enviado';
                }
                return true;
              })
              .map((pedido) => (
                <ItemPedido
                  usuarioLogueado={usuarioLogueado}
                  usuario={pedido.usuario}
                  key={pedido._id}
                  pedido={pedido}
                  setPedidos={setPedidos}
                  desactivarBotones={pedido.estado !== "pendiente"}
                  setTotal={setTotal}
                  actualizarIndicePedidos={actualizarIndicePedidos}
                ></ItemPedido>
              ))}
          </div>
        )}

        <Link variant="success" className="mb-3 btn btn-dark" to="/#menu">
          <i className="bi bi-arrow-left">Volver al menú</i>
        </Link>
      </div>

      <Card className="my-3 mt-lg-0 mt-md-0 shadow">
        <Card.Body>
          <div>
            <strong>Envio:</strong>
            <span className="text-warning">Gratis</span> <hr />
            <strong>Total:</strong> ${total}
          </div>
          <Button variant="success" className="mt-2" onClick={confirmarPedido}>
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
                  minLength: {
                    value: 3,
                    message:
                      "El nombre debe tener como minimo 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message:
                      "El nombre debe tener como maximo 25 caracteres",
                  },
                })}
              />
              {errors.direccion && <p>{errors.direccion.message}</p>}
            </Form.Group>
            <Form.Group controlId="formCiudad">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu ciudad"
                {...register("ciudad", { required: "La ciudad es requerida",  minLength: {
                  value: 2,
                  message:
                    "El nombre debe tener como minimo 2 caracteres",
                },
                maxLength: {
                  value: 50,
                  message:
                    "El nombre debe tener como maximo 25 caracteres",
                }, })}
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
              Cerrar
            </Button>
            <Button variant="success" type="submit">
              Enviar dirección
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Pedidos;
