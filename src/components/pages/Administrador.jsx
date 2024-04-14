import { Table, Spinner, Button } from "react-bootstrap";
import ItemProducto from "./producto/ItemProducto";
import ItemUsuario from "./usuario/ItemUsuario";
import { useEffect, useState } from "react";
import React from "react";
import { leerProductosAPI, leerUsuariosAPI } from "../../helpers/queries";
import { Link } from "react-router-dom";

const Administrador = ({ tipo }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtrarCategoria, setFiltrarCategoria] = useState(""); 

  useEffect(() => {
    consultarAPI();
  }, [tipo, filtrarCategoria]);

  const consultarAPI = async () => {
    try {
      setIsLoading(true);
      let resp;
      if (tipo === "usuarios") {
        resp = await leerUsuariosAPI();
      } else if (tipo === "productos") {
        resp = await leerProductosAPI();
      }
      setData(resp);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Error al cargar los datos desde la API");
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (event) => {
    setFiltrarCategoria(event.target.value);
  };

  const mostrarComponente = isLoading ? (
    <div className="my-4 text-center">
      <Spinner animation="border" variant="dark" />
    </div>
  ) : (
    <React.Fragment>
      {tipo === "productos" && (
        <div className="mb-3">
          <label htmlFor="categoryFilter" className="mr-2">Filtrar por Categoría: </label>
          <select id="categoryFilter" className="form-select w-50" value={filtrarCategoria} onChange={handleCategoryChange}>
            <option value="">Todas</option>
            <option value="Hamburguesas">Hamburguesas</option>
            <option value="Pastas">Pastas</option>
            <option value="Postres">Postres</option>
            <option value="Carne asada">Carne asada</option>
            <option value="Milanesas">Milanesas</option>
            <option value="Pizzas">Pizzas</option>
            <option value="Empanadas">Empanadas</option>
            
          </select>
        </div>
      )}
      <Table responsive striped bordered hover className="shadow">
        <thead className="table-dark">
          <tr className="text-center">
            <th>{tipo === "usuarios" ? "Nombre" : "Producto"}</th>
            <th>{tipo === "usuarios" ? "Email" : "URL de Imagen"}</th>
            <th>{tipo === "usuarios" ? "Rol" : "Categoría"}</th>
            <th>{tipo === "usuarios" ? "Suspendido" : "Precio"}</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <React.Fragment key={item._id}>
              {tipo === "usuarios" ? (
                <ItemUsuario usuario={item} setData={setData} />
              ) : (
                (filtrarCategoria === "" || item.categoria === filtrarCategoria) && (
                  <ItemProducto producto={item} setData={setData} />
                )
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );

  return (
    <section className="container mainSection">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4">{`Gestión de ${tipo}`}</h1>
        <Link className="btn btn-success" to={`/administrador/${tipo}/crear`}>
          <i className="bi bi-file-earmark-plus"></i> Crear{" "}
          {tipo === "usuarios" ? "Usuario" : "Producto"}
        </Link>
      </div>
      <hr />
      {mostrarComponente}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </section>
  );
};

export default Administrador;
