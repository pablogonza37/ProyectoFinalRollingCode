import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { crearUsuarioAPI } from "../../helpers/queries";
import { useState, useEffect } from "react";

const Registro = ({ tituloRegistro, rol }) => {
  const [rolPorDefecto, setRolPorDefecto] = useState("usuario");
  const [rolVisible, setRolVisible] = useState(rol);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const usuario = {
      nombreUsuario: data.nombreUsuario,
      email: data.email,
      rol: data.rol || rolPorDefecto,
      password: data.password,
      suspendido: false,
    };

    const respuesta = await crearUsuarioAPI(usuario);
    if (respuesta.status === 201) {
      Swal.fire({
        title: "Usuario registrado",
        text: `El usuario "${usuario.nombreUsuario}" fue registrado correctamente`,
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Ocurrió un error",
        text: `El usuario "${usuario.nombreUsuario}" no pudo ser registrado. Intente esta operación en unos minutos`,
        icon: "error",
      });
    }
  };

  const password = watch("password", "");

  return (
    <div className="container my-5 mainSection">
      <h2>{tituloRegistro}</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre de usuario*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre de usuario"
            {...register("nombreUsuario", {
              required: "El nombre de usuario es obligatorio",
              minLength: {
                value: 3,
                message:
                  "El nombre de usuario debe tener al menos 3 caracteres",
              },
              maxLength: {
                value: 20,
                message:
                  "El nombre de usuario no puede tener más de 20 caracteres",
              },
            })}
          />
          {errors.nombre && (
            <p style={{ color: "red" }}>{errors.nombre.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo electrónico*</Form.Label>
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

        {rolVisible && (
          <Form.Group className="mb-3" controlId="formcategoria">
            <Form.Label>Rol*</Form.Label>
            <Form.Select
              {...register("rol", {
                required: " es obligatorio",
              })}
            >
              <option value="usuario">Usuario</option>
              <option value="admin">Admin</option>
            </Form.Select>
            <Form.Text className="text-danger">{errors.rol?.message}</Form.Text>
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Contraseña*</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Repita la contraseña*</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirma tu contraseña"
            {...register("confirmarContraseña", {
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />
          {errors.confirmarContraseña && (
            <p style={{ color: "red" }}>{errors.confirmarContraseña.message}</p>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrarse
        </Button>
      </Form>
    </div>
  );
};

export default Registro;
