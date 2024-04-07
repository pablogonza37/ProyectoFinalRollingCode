import React from 'react';
import { Button } from 'react-bootstrap';

const ItemUsuario = ({ usuario, setData }) => {
    return (
        <tr>
      <td>{usuario.nombre}</td>
      <td>{usuario.email}</td>
      <td>{usuario.rol}</td>
      <td className="text-center">
        <Button
          className="btn btn-secondary me-1"
        >
          <i className="bi bi-dash-circle"></i>
        </Button>
        <Button variant="danger">
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
    );
};

export default ItemUsuario;