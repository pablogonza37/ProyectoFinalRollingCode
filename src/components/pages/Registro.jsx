import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { crearUsuarioAPI } from '../../helpers/queries';

const Registro = ({ tituloRegistro }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  const onSubmit = async (data) => {
    const usuario = {
      nombre: data.nombre,
      email: data.email,
      password: data.password,
      confirmarContraseña: data.confirmarContraseña,
    };

    const respuesta = await crearUsuarioAPI(usuario);
    if (respuesta.status === 201) {
      setTimeout(() => {
        reset();
      }, 2000);
      Swal.fire({
        title: "Usuario registrado",
        text: `El usuario "${usuario.nombre}" fue registrado correctamente`,
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Ocurrió un error",
        text: `El usuario "${usuario.nombre}" no pudo ser registrado. Intente esta operación en unos minutos`,
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
            {...register("nombre", {
              required: "El nombre de usuario es obligatorio",
              minLength: {
                value: 3,
                message: "El nombre de usuario debe tener al menos 3 caracteres"
              },
              maxLength: {
                value: 20,
                message: "El nombre de usuario no puede tener más de 20 caracteres"
              }
            })}
          />
          {errors.nombre && (
            <p style={{ color: 'red' }}>{errors.nombre.message}</p>
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
                value: /^\S+@\S+$/i,
                message: "El correo electrónico ingresado no es válido"
              }
            })}
          />
          {errors.email && (
            <p style={{ color: 'red' }}>{errors.email.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña*</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres"
              }
            })}
          />
          {errors.password && (
            <p style={{ color: 'red' }}>{errors.password.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Repita la contraseña*</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirma tu contraseña"
            {...register("confirmarContraseña", {
              validate: value =>
                value === password || "Las contraseñas no coinciden"
            })}
          />
          {errors.confirmarContraseña && (
            <p style={{ color: 'red' }}>{errors.confirmarContraseña.message}</p>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrarse
        </Button>
      </Form>
    </div>
  );
}

export default Registro;
