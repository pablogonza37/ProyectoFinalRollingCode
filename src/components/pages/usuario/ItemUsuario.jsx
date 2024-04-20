import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  borrarUsuarioAPI,
  leerUsuariosAPI,
  suspenderUsuarioAPI,
  levantarSuspensionUsuarioAPI,
} from "../../../helpers/queries";

const ItemUsuario = ({ usuario, setData, desactivarBotonesAdmin }) => {
  const borrarUsuario = () => {
    Swal.fire({
      title: "¿Estás seguro de eliminar el usuario?",
      text: "No se puede revertir este proceso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarUsuarioAPI(usuario._id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Usuario Eliminado",
            text: `El usuario "${usuario.nombreUsuario}" fue eliminado correctamente`,
            icon: "success",
          });

          const listaUsuarios = await leerUsuariosAPI();
          setData(listaUsuarios);
        } else {
          Swal.fire({
            title: "Ocurrió un error",
            text: `El usuario "${usuario.nombreUsuario}" no fue eliminado. Intente realizar esta operación en unos minutos`,
            icon: "error",
          });
        }
      }
    });
  };

  const suspenderUsuario = async () => {
    const confirmText = usuario.suspendido ? "Habilitar" : "Suspender"; 
    const icon = usuario.suspendido ? "bi bi-plus-circle" : "bi bi-dash-circle";
    Swal.fire({
      title: `¿Estás seguro de ${confirmText} el usuario?`,
      text: "No se podrá revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmText,
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let respuesta;
        if (usuario.suspendido) {
          respuesta = await levantarSuspensionUsuarioAPI(usuario._id);
        } else {
          respuesta = await suspenderUsuarioAPI(usuario._id);
        }
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Usuario Actualizado",
            text: `El usuario "${usuario.nombreUsuario}" fue ${confirmText.toLowerCase()} correctamente`,
            icon: "success",
          });

          const listaUsuarios = await leerUsuariosAPI();
          setData(listaUsuarios);
        } else {
          Swal.fire({
            title: "Ocurrió un error",
            text: `No se pudo ${confirmText.toLowerCase()} el usuario "${usuario.nombreUsuario}". Intente realizar esta operación en unos minutos`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <tr>
      <td>{usuario.nombreUsuario}</td>
      <td>{usuario.email}</td>
      <td>{usuario.rol}</td>
      <td>{`${usuario.suspendido}`}</td>
      <td className="text-center">
        <Button className="btn btn-secondary" onClick={suspenderUsuario} disabled={usuario.rol === 'admin'}>
          <i className={usuario.suspendido ? "bi bi-plus-circle" : "bi bi-dash-circle"}></i>
        </Button>
        <Button variant="danger" onClick={borrarUsuario} className='ms-lg-1 mt-lg-0' disabled={usuario.rol === 'admin'}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemUsuario;
