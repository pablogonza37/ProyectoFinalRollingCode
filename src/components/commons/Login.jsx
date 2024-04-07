import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; 
import '../../App.css';
import { login } from '../../helpers/queries';

Modal.setAppElement('#root');

const LoginModal = ({ modalIsOpen, closeModal, setUsuarioLogueado }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm();
  const navegacion = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (usuario) => {
    if (login(usuario)) {
      Swal.fire({
        title: "Usuario logueado",
        text: `Bienvenido "${usuario.mail}"`,
        icon: "success",
      });
      navegacion('/administrador/productos');
      setUsuarioLogueado(usuario.mail);
      closeModal();
    } else {
      setErrors({ message: "El usuario o la contraseña son incorrectos" });
    }
  };

  const cerrarModal = ()=>{
    navegacion('/');
    closeModal();
  }

  return (
    <div className='mainSection bg-dark'>
      <Modal
        isOpen={modalIsOpen}
        className={'unstyle'}
        onRequestClose={closeModal}
        style={{ overlay: {}, content: {} }} 
        contentLabel="Modal de inicio de sesión"
      >
        <h2>Iniciar sesión</h2>
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

          {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}

          <Button variant="primary" type="submit">
            Iniciar sesión
          </Button>
        </Form>
        <button onClick={cerrarModal} className="btn btn-light">Cerrar</button>
      </Modal>
    </div>
  );
}

export default LoginModal;
