import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  borrarUsuarioAPI,
  leerUsuariosAPI,
  inhabilitarUsuarioAPI,
} from "../../../helpers/queries";

const ItemUsuario = ({ usuario, setData }) => {
  const borrarUsuario = () => {
    Swal.fire({
      title: "¿Estas seguro de eliminar el usuario?",
      text: "No se puede revertir este proceso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarUsuarioAPI(usuario.id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "UsuarioEliminado",
            text: `El usuario "${usuario.nombre}" fue eliminado correctamente`,
            icon: "success",
          });

          const listaUsuarios = await leerUsuariosAPI();
          setData(listaUsuarios);
        } else {
          Swal.fire({
            title: "Ocurrio un error",
            text: `El usuario "${usuario.nombre}" no fue eliminado. Intente realizar esta operación en unos minutos`,
            icon: "error",
          });
        }
      }
    });
  };

  const inhabilitarUsuario = async () => {
    Swal.fire({
      title: "¿Estás seguro de inhabilitar el usuario?",
      text: "No se podrá revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Inhabilitar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await inhabilitarUsuarioAPI(usuario.id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Usuario Inhabilitado",
            text: `El usuario "${usuario.nombre}" fue inhabilitado correctamente`,
            icon: "success",
          });

          const listaUsuarios = await leerUsuariosAPI();
          setData(listaUsuarios);
        } else {
          Swal.fire({
            title: "Ocurrió un error",
            text: `No se pudo inhabilitar el usuario "${usuario.nombre}". Intente realizar esta operación en unos minutos`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <tr>
      <td>{usuario.nombre}</td>
      <td>{usuario.email}</td>
      <td>{usuario.rol}</td>
      <td className="text-center">
        <Button className="btn btn-secondary me-1" onClick={inhabilitarUsuario}>
          <i className="bi bi-dash-circle"></i>
        </Button>
        <Button variant="danger" onClick={borrarUsuario}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemUsuario;
