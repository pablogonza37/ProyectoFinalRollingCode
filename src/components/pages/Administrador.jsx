import { Table, Spinner, Button } from "react-bootstrap";
import ItemProducto from "./producto/ItemProducto";
import ItemUsuario from "./usuario/ItemUsuario";
import { useEffect, useState } from "react";
import React from "react";
import { leerProductosAPI } from "../../helpers/queries";

const Administrador = ({ tipo }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    consultarAPI();
  }, [tipo]);

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

  const mostrarComponente = isLoading ? (
    <div className="my-4 text-center">
      <Spinner animation="border" variant="dark" />
    </div>
  ) : (
    <Table responsive striped bordered hover className="shadow">
      <thead className="table-dark">
        <tr className="text-center">
          <th>{tipo === "usuarios" ? "Nombre" : "Producto"}</th>
          <th>{tipo === "usuarios" ? "Email" : "URL de Imagen"}</th>
          <th>{tipo === "usuarios" ? "Rol" : "Categoria"}</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
      {data.map((item) => (
        <React.Fragment key={item.id}>
        {tipo === "usuarios" ? (
              <ItemUsuario usuario={item} setData={setData} />
            ) : (
              <ItemProducto producto={item} setData={setData} />
            )}
        </React.Fragment>
        ))}
      </tbody>
    </Table>
  );

  return (
    <section className="container mainSection">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4">{`Gestión de ${tipo}`}</h1>
        <Button variant="success">
          <i className="bi bi-file-earmark-plus"></i> Crear{" "}
          {tipo === "usuarios" ? "Usuario" : "Producto"}
        </Button>
      </div>
      <hr />
      {mostrarComponente}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </section>
  );
};

export default Administrador;
