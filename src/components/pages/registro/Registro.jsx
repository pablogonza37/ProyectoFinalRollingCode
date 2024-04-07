import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Registro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="container mt-5 mainSection">
      <h2>Registro</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu nombre de usuario" value={username} onChange={handleUsernameChange} minLength={8} maxLength={16}
           />
             {username.length < 3 || username.length > 20 ? (
            <p style={{ color: 'red' }}>El nombre de usuario debe tener entre 3 y 20 caracteres</p>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu correo electrónico" value={email} onChange={handleEmailChange} maxLength={45} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Ingresa tu contraseña" value={password} onChange={handlePasswordChange} />
          {password.length < 6 || password.length > 16 ? (
            <p style={{ color: 'red' }}>La contraseña debe tener entre 6 y 16 caracteres</p>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Repita la contraseña</Form.Label>
          <Form.Control type="password" placeholder="Ingresa tu contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {password !== confirmPassword ? (
              <p style={{ color: 'red' }}>Las contraseñas no coinciden</p>
            ) : null}
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrarse
        </Button>
      </Form>
    </div>
  );
}

export default Registro;