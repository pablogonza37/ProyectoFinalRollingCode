import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import { leerProductosAPI } from "../../helpers/queries";
import { useEffect, useState } from "react";

const Inicio = () => {
  const [productosInicio, setProductosInicio] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [spinnerInicio, setSpinnerInicio] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

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
    setCategoriaSeleccionada(e.target.value);
  };

  return (
    <section className="mainSection">
      <div className="relativeContainer w-100">
        <h1 className="slogan text-white display-1 text-center lead">
          Rolling Bistro <br />
          <span className="display-6">¡Sabores autenticos.!</span>
          <br />
          <Button className="btn btn-success w-50 border border-light" href="#menu">Ver Menu</Button>
        </h1>

        <img
          className="banner shadow"
          src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg"
          alt="imagen banner"
        />
      </div>
      <Container className="container">
        <Row>
          <Col
            md={6}
            className="p-lg-5 p-md-4 text-bg-light d-flex align-items-center lead text-dark-emphasis my-4"
          >
            Rolling bistro: Un restaurante moderno con cocina innovadora,
            ambiente acogedor y servicio excepcional. ideal para disfrutar de
            una experiencia gastronomica unica.
          </Col>
          <Col md={6} className="p-lg-5 p-md-4">
            <img
              src="https://static.wixstatic.com/media/46dc18_3487b934a84548e090e13f5ce1bf08ad~mv2.jpg/v1/fill/w_555,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/46dc18_3487b934a84548e090e13f5ce1bf08ad~mv2.jpg"
              alt=""
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
      <Container className="mt-5" id='menu'>
        <h2 className="display-4">Nuestros Productos</h2>
        <hr />
        <Form.Select aria-label="Default select example" className="mb-4 w-50 " onChange={handleCategoriaChange}>
          <option value="">Categoria</option>
          <option value="Hamburguesas">Hamburguesas</option>
          <option value="Pastas">Pastas</option>
          <option value="Carnes">Carnes a la Parrilla</option>
          <option value="Postres">Postres</option>
          <option value="Americana">Americana</option>
        </Form.Select>
        {spinnerInicio && (
          <div className="my-4 text-center">
            <Spinner animation="border" variant="dark" />
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}
        {!spinnerInicio && !error && productosFiltrados.length === 0 && (
          <div className="alert alert-info mt-3">No hay productos.</div>
        )}
        {!spinnerInicio && !error && productosFiltrados.length > 0 && (
        <Row >
          {productosFiltrados.map((producto) => (
              <CardProducto key={producto.id} producto={producto} />
            ))}
        </Row>
        )}
      </Container>
    </section>
  );
};

export default Inicio;
