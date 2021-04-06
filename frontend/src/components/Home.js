import React from 'react';
import { Row, Col, Container, Carousel } from 'react-bootstrap';

function Home() {
    return (
        <Container fluid>
            <Carousel >
                <Carousel.Item interval={1000}>
                    <img
                        style={{ width: "100vw", height: "85vh", background: "#000000" }}
                    />
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                        style={{ width: "100vw", height: "85vh", background: "#000000" }}
                    />
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                        style={{ width: "100vw", height: "85vh", background: "#000000" }}
                    />
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
}

export default Home;