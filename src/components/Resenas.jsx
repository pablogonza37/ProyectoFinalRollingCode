import { Card, Carousel, Button } from "react-bootstrap";
import { FaStar } from 'react-icons/fa';

const Resenas = () => {

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
          if (i < 4) {
            stars.push(<FaStar key={i} />);
          } else {
            stars.push(<FaStar key={i} style={{ color: '#ddd' }} />);
          }
        }
        return stars;
      };

    return (
        <section >
        <Carousel className="carousel-background my-4 p-5 d-flex justify-content-center">
      <Carousel.Item interval={2000}>
        <div className="d-flex justify-content-center">
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title >pablo</Card.Title>
            <Card.Text>1</Card.Text>
            <Card.Text>
              {renderStars()}
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
      </Carousel.Item>

      <Carousel.Item interval={2000} >
      <div className="d-flex justify-content-center">
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title >pablo</Card.Title>
            <Card.Text>1</Card.Text>
            <Card.Text>
              {renderStars()}
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
      </Carousel.Item>

      <Carousel.Item interval={2000}>
      <div className="d-flex justify-content-center">
        <Card style={{ width: "40rem" }}>
          <Card.Body>
            <Card.Title >pablo</Card.Title>
            <Card.Text>1</Card.Text>
            <Card.Text>
              {renderStars()}
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
      </Carousel.Item>
    </Carousel>
    <Button>agregar reseña</Button>
    </section>
    );
};

export default Resenas;