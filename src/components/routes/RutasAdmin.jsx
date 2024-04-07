import { Routes, Route } from "react-router";
import Administrador from "../pages/Administrador";
import FormularioRegistro from "../pages/usuario/FormularioRegistro";
import FormularioProducto from "../pages/producto/FormularioProducto";


const RutasAdmin = ({usuarioLogueado}) => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Administrador></Administrador>}></Route>
        <Route
          exact
          path="productos/crear"
          element={
            <FormularioProducto
              editar={false}
              titulo="Nuevo producto"
            ></FormularioProducto>
          }
        ></Route>
        <Route
          exact
          path="productos/editar/:id"
          element={
            <FormularioProducto
              editar={true}
              titulo="Editar producto"
            ></FormularioProducto>
          }
        ></Route>
        <Route
          exact
          path="usuarios/editar/:id"
          element={
            <FormularioRegistro
              editar={true}
              titulo="Editar Usuario"
              rol=""
            ></FormularioRegistro>
          }
        ></Route>
        <Route
          exact
          path="/usuarios"
          element={<Administrador tipo="usuarios" />}
        />
        <Route
          exact
          path="/productos"
          element={<Administrador tipo="productos" />}
        />
        <Route
            exact
            path="/usuarios/crear"
            element={
              <FormularioRegistro
                editar={false}
                rol={true}
                titulo="Crear usuario"
                usuarioLogueado={usuarioLogueado}
              ></FormularioRegistro>
            }
          ></Route>
      </Routes>
    </>
  );
};

export default RutasAdmin;