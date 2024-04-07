import React from 'react';
import { Button } from 'react-bootstrap';

const ItemUsuario = () => {
    return (
        <tr>
      <td>Juan</td>
      <td>juan@gmail.com</td>
      <td>admin</td>
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