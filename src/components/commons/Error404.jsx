import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer";
import "./Menu";
import "./style404.css";

const Error404 = () => {
return (
    <Container className="page_404">
        <div className="container">
            <div className="row">
                <div className="col-sm-12 ">
                    <div className="col-sm-10 col-sm-offset-1 text-center">
                        <div className="four_zero_four_bg">
                            <h1 className="text-center ">404</h1>
                        </div>

                        <div className="contant_box_404">
                            <h3 className="h2">Parece que te has perdido</h3>

                            <p>La página que buscas no está disponible!</p>

                            <a href="/" className="link_404">
                                Ir al Inicio
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Container>
);
};

export default Error404;
