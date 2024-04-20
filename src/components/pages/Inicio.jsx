import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import { leerProductosAPI } from "../../helpers/queries";
import Banner from "../../assets/banner.jpeg";
import muestra1 from "../../assets/muestra1.webp";
import Resenas from "./Resenas";

const Inicio = ({
  openLoginModal,
  usuarioLogueado,
  actualizarIndicePedidos,
}) => {
  const [productosInicio, setProductosInicio] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [spinnerInicio, setSpinnerInicio] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productosPorPagina] = useState(12);

  useEffect(() => {
    consultarAPI();
  }, []);

  useEffect(() => {
    if (categoriaSeleccionada) {
      const productosFiltrados = productosInicio.filter(
        (producto) => producto.categoria === categoriaSeleccionada
      );
      setProductosFiltrados(productosFiltrados);
    } else {
      setProductosFiltrados(productosInicio);
    }
  }, [categoriaSeleccionada, productosInicio]);

  const consultarAPI = async () => {
    try {
      setSpinnerInicio(true);
      const resp = await leerProductosAPI();
      if (resp && resp.length > 0) {
        setProductosInicio(resp);
        setError(null);
      }
    } catch (error) {
      setError("Error al cargar las recetas desde la API");
      console.error(error);
    } finally {
      setSpinnerInicio(false);
    }
  };

  const handleCategoriaChange = (e) => {
    setCurrentPage(1);
    setCategoriaSeleccionada(e.target.value);
  };

  const indexOfLastProducto = currentPage * productosPorPagina;
  const indexOfFirstProducto = indexOfLastProducto - productosPorPagina;
  const currentProductos = productosFiltrados.slice(
    indexOfFirstProducto,
    indexOfLastProducto
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="mainSection">
      <div className="relativeContainer w-100">
        <div className="slogan text-center text-white">
          <h1 className="display-1  lead">Rolling Bistro</h1>
          <p className="display-6">¡Sabores autenticos.!</p>
          <br />
          <Button
            className="btn btn-success w-100 border border-light rounded-5 growAnimation shadow"
            href="/#menu"
          >
            <span className="display-6 lead btnMenu mt-3">Ver Menú</span>
          </Button>
        </div>

        <img className="banner shadow" src={Banner} alt="imagen banner" />
      </div>
      <Container className="container">
        <Row>
          <Col
            md={6}
            className="p-lg-5 p-md-4 text-bg-light d-flex align-items-center lead text-dark-emphasis my-4 shadow"
          >
            "Rolling Bistro es mucho más que un simple restaurante; es una
            experiencia culinaria excepcionalmente moderna y única. Nuestro
            concepto innovador fusiona lo mejor de la cocina contemporánea con
            un ambiente acogedor y un servicio excepcional, creando así un
            espacio donde los comensales pueden deleitarse con sabores audaces y
            emocionantes mientras se sumergen en una atmósfera acogedora y
            sofisticada. Nuestro equipo de chefs apasionados y creativos se
            esfuerza por ofrecer platos que desafían las expectativas y deleitan
            los sentidos."
          </Col>
          <Col md={6} className="p-lg-5 p-md-4">
            <img src={muestra1} alt="" className="img-fluid" />
          </Col>
        </Row>
      </Container>

      <Resenas usuarioLogueado={usuarioLogueado} className="mt-3"></Resenas>

      <Container className="mt-5" id="menu">
        <h2 className="display-4 btnMenu">Nuestro Menú</h2>
        <hr />
        <Form.Select
          aria-label="Default select example"
          className="mb-4 w-50 "
          onChange={handleCategoriaChange}
        >
          <option value="">Todas las categorías</option>
          <option value="Carne asada">Carne asada</option>
          <option value="Empanadas">Empanadas</option>
          <option value="Hamburguesas">Hamburguesas</option>
          <option value="Milanesas">Milanesas</option>
          <option value="Pastas">Pastas</option>
          <option value="Pizzas">Pizzas</option>
          <option value="Postres">Postres</option>
        </Form.Select>
        {spinnerInicio && (
          <div className="my-4 text-center">
            <Spinner animation="border" variant="dark" />
          </div>
        )}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {!spinnerInicio && !error && productosFiltrados.length === 0 && (
          <div className="alert alert-info mt-3">No hay productos.</div>
        )}
        {!spinnerInicio && !error && currentProductos.length > 0 && (
          <Row>
            {currentProductos.map((producto) => (
              <CardProducto
                key={producto._id}
                producto={producto}
                openLoginModal={openLoginModal}
                usuarioLogueado={usuarioLogueado}
                actualizarIndicePedidos={actualizarIndicePedidos}
              />
            ))}
          </Row>
        )}
        {productosFiltrados.length > productosPorPagina && (
          <ul className="pagination justify-content-center mt-4">
            {Array.from({
              length: Math.ceil(productosFiltrados.length / productosPorPagina),
            }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  index + 1 === currentPage ? "active" : ""
                }`}
              >
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
};

export default Inicio;
