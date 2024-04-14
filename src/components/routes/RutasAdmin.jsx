import { Routes, Route } from "react-router";
import Administrador from "../pages/Administrador";
import FormularioProducto from "../pages/producto/FormularioProducto";
import Registro from "../pages/Registro";
import Pedidos from "../pages/pedidos/Pedidos";


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
              <Registro
                rol={true}
                tituloRegistro="Crear usuario"
                usuarioLogueado={usuarioLogueado}
              ></Registro>
            }
          ></Route>
      </Routes>
    </>
  );
};

export default RutasAdmin;