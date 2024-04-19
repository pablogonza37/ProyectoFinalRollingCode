import { useState } from "react";
import { Card, Carousel, Button, Modal, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { leerResenasAPI } from "../helpers/queries";
import { useForm } from "react-hook-form";

const Resenas = () => {
  const [resenias, setResenias] = useState([]);
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

  const listarResenias = async () => {
    try {
      const respuesta = await leerResenasAPI();
      setResenias(respuesta);
    } catch (error) {
      console.log(error);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < 4) {
        stars.push(<FaStar key={i} />);
      } else {
        stars.push(<FaStar key={i} style={{ color: "#ddd" }} />);
      }
    }
    return stars;
  };

  return (
    <section>
      <Carousel className="carousel-background my-4 p-5 d-flex justify-content-center">
        <Carousel.Item interval={2000}>
          <div className="d-flex justify-content-center my-5 text-center">
            <Card style={{ width: "30rem" }}>
              <Card.Body>
                <Card.Title>pablo</Card.Title>
                <Card.Text>1</Card.Text>
                <Card.Text>{renderStars()}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Carousel.Item>
      </Carousel>
      <div className="text-center">
        <Button onClick={handleShow}>
          <i className="bi bi-plus-circle"></i>
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Reseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicName">
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre"
                {...register("nombre", {
                    required: "El nombre es obligatorio",
                    minLength: {
                      value: 2,
                      message:
                        "El nombre debe tener como minimo 2 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "El nombre debe tener como maximo 25 caracteres",
                    },
                  })}
              />
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese su reseña"
                {...register("resenia", {
                    required: "La reseña es requerida",
                    minLength: {
                      value: 50,
                      message:
                        "La reseña debe tener al menos 50 caracteres",
                    },
                    maxLength: {
                      value: 200,
                      message:
                        "La reseña debe tener como maximo 200 caracteres",
                    },
                })}
              />
            </Form.Group>
            <Form.Group controlId="formBasicRating">
              <Form.Label>Valoración</Form.Label>
              <Form.Control as="select"  {...register("valoracion", {
                    required: "La valoracion es obligatorio"
                  })}>
                <option value={0}>Seleccionar</option>
                <option value={1}>★</option>
                <option value={2}>★★</option>
                <option value={3}>★★★</option>
                <option value={4}>★★★★</option>
                <option value={5}>★★★★★</option>
              </Form.Control>
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
