import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Button, Container, Form, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { login } from "../../helpers/queries";


const Login = ({ setUsuarioLogueado }) => {

  const [errors, setErrors] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const navegacion = useNavigate();


  const onSubmit = async (usuario) => {
    if (login(usuario)) {
      Swal.fire({
        title: "Usuario logueado",
        text: `Bienvenido "${usuario.mail}"`,
        icon: "success",
      });
      navegacion("/administrador/productos");
      setUsuarioLogueado(usuario.mail);
    } else {
      setErrors({ message: "El usuario o la contraseña son incorrectos" });
    }
  };


  return (
    <Container className="mainSection my-4 d-flex justify-content-center">
      <Card style={{ width: "25rem" }} className="p-3">
        <h2 className="m-1">Iniciar sesión</h2>
        <hr />
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                {...register("mail", {
                  required: "Email es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {formErrors.mail?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {formErrors.password?.message}
              </Form.Text>
            </Form.Group>

            {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
            <hr />
            <Button variant="primary" type="submit">
              Iniciar sesión
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
