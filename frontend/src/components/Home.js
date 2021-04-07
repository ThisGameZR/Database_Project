import React from 'react';
import { Row, Col, Container, Carousel } from 'react-bootstrap';

function Home() {
    return (
        
            <Carousel >
                <Carousel.Item interval={3000}>
                    <img style={{ width: "100vw", background: "#000000" }} src="https://cdn.minethost.com/aun/Brand_Png/slide1.png"/>
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img style={{ width: "100vw", background: "#000000" }} src="https://cdn.minethost.com/aun/Brand_Png/slide2.png"/>
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img style={{ width: "100vw", background: "#000000" }} src="https://cdn.minethost.com/aun/Brand_Png/slide1.png"/>
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        
    );
}

export default Home;