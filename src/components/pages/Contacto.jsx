import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Contacto = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Swal.fire({
      icon: "success",
      title: "¡Consulta enviada!",
      text: "Gracias por contactarnos. Te responderemos pronto.",
    });
    reset();
  };

  return (
    <section className="bg-contacto">
      <Container className="mainSection my-4 d-flex justify-content-center">
        <Card className="p-3 shadow bg-card" style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title className="display-6">Contacto</Card.Title>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="formName" className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre"
                  {...register("name", {
                    required: "El nombre es obligatorio",
                    minLength: {
                      value: 3,
                      message: "El nombre debe tener al menos 3 caracteres",
                    },
                    maxLength: {
                      value: 20,
                      message:
                        "El nombre de usuario no puede tener más de 20 caracteres",
                    },
                  })}
                />
                {errors.name && (
                  <p style={{ color: "red" }}>{errors.name.message}</p>
                )}
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-4">
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  {...register("email", {
                    required: "El correo electrónico es obligatorio",
                    pattern: {
                      value:
                        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
                      message: "El correo electrónico ingresado no es válido",
                    },
                  })}
                />
                {errors.email && (
                  <p style={{ color: "red" }}>{errors.email.message}</p>
                )}
              </Form.Group>

              <Form.Group controlId="formConsulta" className="mb-4">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ingresa tu consulta"
                  {...register("consulta", {
                    required: "La consulta es obligatoria",
                    minLength: {
                      value: 5,
                      message: "La consulta debe tener al menos 5 caracteres",
                    },
                    maxLength: {
                      value: 500,
                      message:
                        "La consulta no puede tener más de 500 caracteres",
                    },
                  })}
                />
                {errors.consulta && (
                  <p style={{ color: "red" }}>{errors.consulta.message}</p>
                )}
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 mt-2">
                Enviar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default Contacto;
