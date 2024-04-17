import { Container, Card, Spinner, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { obtenerProductoAPI, crearPedidoAPI } from "../../../helpers/queries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DetalleProducto = ({ usuarioLogueado }) => {
  const [productoSelecionado, setProductoSelecionado] = useState([]);
  const [spinnerDetalle, setSpinnerDetalle] = useState(true);
  const [error, setError] = useState(null);
  const navegacion = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    cargarDatosProducto();
  }, []);

  const cargarDatosProducto = async () => {
    try {
      setSpinnerDetalle(true);
      const respuesta = await obtenerProductoAPI(id);
      if (respuesta.status === 200) {
        const productoEncontrado = await respuesta.json();
        setProductoSelecionado(productoEncontrado);
      } else {
        setError("Error al cargar los datos desde la API");
      }
    } catch (error) {
      setError("Error al cargar los datos desde la API");
    } finally {
      setSpinnerDetalle(false);
    }
  };

  const mostrarComponente = spinnerDetalle ? (
    <div className="my-4 text-center">
      <Spinner animation="border" variant="dark" />
    </div>
  ) : error ? (
    <div className="alert alert-danger mt-3">{error}</div>
  ) : (
    <Card className="d-flex my-4 shadow">
      <Card.Img
        variant="top"
        src={productoSelecionado.imagen}
        className="img-detalle"
      />
      <Card.Body>
        <Card.Title>
          {productoSelecionado.nombreProducto} <hr />
        </Card.Title>
        <div>
          {productoSelecionado.descripcionAmplia} <hr />
        </div>
        <strong> Precio: ${productoSelecionado.precio} </strong>
      </Card.Body>
      <Card.Footer className="text-start">
      <Link
            variant="success"
            className="my-2 btn btn-success me-3"
            to='/#menu'
          >
            <i className="bi bi-arrow-left">Volver al menu</i>
          </Link>
      </Card.Footer>
    </Card>
  );

  return (
    <section className="mainSection">
      <Container>{mostrarComponente}</Container>
    </section>
  );
};

export default DetalleProducto;
