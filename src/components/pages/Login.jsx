import React, { useState } from "react";
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
    const respuesta = await login(usuario);
    if (respuesta.status === 200) {
      Swal.fire("¡Bienvenido!", "Has iniciado sesión correctamente", "success");
      const datos = await respuesta.json();
      sessionStorage.setItem(
        "usuarioRollingBistro",
        JSON.stringify({ email: datos.email, token: datos.token, rol:datos.rol, suspendido:datos.suspendido })
      );
      setUsuarioLogueado(datos);
      navegacion("/administrador/productos");
    } else {
      Swal.fire("Ocurrió un error", "Correo o contraseña incorrectos", "error");
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
                {...register("email", {
                  required: "Email es requerido",
                  pattern: {
                    value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
                    message: "Email inválido",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {formErrors.email?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "El password es obligatorio",
                  minLength: {
                    value: 8,
                    message: "el minimo es de 8 caracteres",
                  },
                  maxLength: {
                    value: 12,
                    message: "el maximo es de 15 caracteres",
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "El password debe contener al menos una letra mayúscula, una letra minúscula y un número",
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
