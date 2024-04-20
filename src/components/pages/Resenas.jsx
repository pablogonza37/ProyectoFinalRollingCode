import React, { useEffect, useState } from "react";
import { Card, Carousel, Button, Modal, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import {
  borrarReseniaAPI,
  crearReseniaAPI,
  leerReseniasAPI,
} from "../../helpers/queries";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Resenas = ({ usuarioLogueado }) => {
  const [resenias, setResenias] = useState([]);
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    listarResenias();
  }, []);

  const crearResenia = async (reseniaCreada) => {
    const resenia = {
      nombre: reseniaCreada.nombre,
      resenia: reseniaCreada.resenia,
      valoracion: reseniaCreada.valoracion,
    };

    const respuesta = await crearReseniaAPI(resenia);
    if (respuesta.status === 201) {
      Swal.fire({
        title: "Reseña agregada",
        text: `La reseña se agregó correctamente`,
        icon: "success",
      });
      listarResenias();
      reset();
      handleClose();
    } else {
      Swal.fire({
        title: "Ocurrio un error",
        text: `La reseña no pudo ser creada. Intente esta operación en unos minutos`,
        icon: "error",
      });
    }
  };

  const borrarResenia = async (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar la reseña?",
      text: "No se puede revertir este proceso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarReseniaAPI(id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Reseña Eliminada",
            text: `La reseña eliminada correctamente`,
            icon: "success",
          });

          setResenias(resenias.filter((resenia) => resenia.id !== id));
        } else {
          Swal.fire({
            title: "Ocurrió un error",
            text: `La resenia no fue eliminada. Intente mas tarde`,
            icon: "error",
          });
        }
      }
    });
  };

  const listarResenias = async () => {
    try {
      const respuesta = await leerReseniasAPI();
      setResenias(respuesta);
    } catch (error) {
      console.log(error);
    }
  };

  const renderStars = (valoracion) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < valoracion) {
        stars.push(<FaStar key={i} style={{ color: "#42c406f2" }} />);
      } else {
        stars.push(<FaStar key={i} style={{ color: "#ddd" }} />);
      }
    }
    return stars;
  };

  return (
    <section>
      <Carousel
        className="carousel-background my-4 p-5 d-flex justify-content-center position-relative shadow"
        wrap={true}
      >
        {resenias.map((resenia) => (
          <Carousel.Item interval={4000} key={resenia._id}>
            <div className="d-flex justify-content-center my-5 text-center">
              <Card style={{ width: "30rem" }} className="shadow card-resenia py-4">
                <Card.Body>
                  <Card.Title>{resenia.nombre}</Card.Title>
                  <Card.Text>{resenia.resenia}</Card.Text>
                  <Card.Text>{renderStars(resenia.valoracion)}</Card.Text>
                </Card.Body>
                {usuarioLogueado && usuarioLogueado.rol === "admin" && (
                  <div className="d-flex justify-content-center">
                    <Button
                      onClick={() => borrarResenia(resenia._id)}
                      variant="danger"
                      className="w-25 mb-2"
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </Carousel.Item>
        ))}
        {usuarioLogueado && (
          <div className="text-center position-absolute start-50 translate-middle-x">
            <Button onClick={handleShow} variant="outline-light">
              <i className="bi bi-plus-circle"></i>
            </Button>
          </div>
        )}
      </Carousel>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Reseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(crearResenia)}>
            <Form.Group controlId="formBasicName" className="mb-4">
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre"
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                  minLength: {
                    value: 2,
                    message: "El nombre debe tener como minimo 2 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "El nombre debe tener como maximo 25 caracteres",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.nombre?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicDescription" className="mb-4">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese su reseña"
                {...register("resenia", {
                  required: "La reseña es requerida",
                  minLength: {
                    value: 5,
                    message: "La reseña debe tener al menos 5 caracteres",
                  },
                  maxLength: {
                    value: 200,
                    message: "La reseña debe tener como maximo 200 caracteres",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.resenia?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicRating" className="mb-4">
              <Form.Control
                as="select"
                {...register("valoracion", {
                  required: "La valoracion es obligatorio",
                })}
              >
                <option value={0}>Seleccionar valoración</option>
                <option value={1}>★</option>
                <option value={2}>★★</option>
                <option value={3}>★★★</option>
                <option value={4}>★★★★</option>
                <option value={5}>★★★★★</option>
              </Form.Control>
              <Form.Text className="text-danger">
                {errors.valoracion?.message}
              </Form.Text>
            </Form.Group>
            <div className="d-flex justify-content-center mt-3">
              <Button variant="success" type="submit">
                Enviar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Resenas;
