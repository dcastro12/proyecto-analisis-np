import React from 'react';
import {Container, Button, Row, Col, Image} from 'react-bootstrap';
import './Menu.css'; // Estilos CSS para el menú

const Menu = ({ onCliqueClick, onGraphColoringClick, onSubsetSumClick }) => {
    return (
        <Container className='justify-content-center h-100 d-flex flex-column'>
            <Row>
                <h1 className='text-green fw-bold'>Algoritmos NP</h1>
            </Row>
            <Row className='justify-content-around mt-5'>
                <Col className='col-3'>
                    <Image src="graphClique.svg" className='img-menu hover-yellow' onClick={onCliqueClick} fluid rounded></Image>
                    <label className='text-yellow fw-bold'>Clique</label>
                </Col>
                <Col className='col-3'>
                    <Image src="graphColoring.svg" className='img-menu hover-pink' onClick={onGraphColoringClick} fluid rounded></Image>
                    <label className='text-pink fw-bold'>Coloración de Grafos</label>
                </Col>
                
                {/* <Button onClick={onCliqueClick}>Clique</Button>
                <Button onClick={onGraphColoringClick}>Coloración de Grafos</Button>
                <Button onClick={onSubsetSumClick}>Problema del subconjunto</Button> */}
            </Row>
            <Row className='justify-content-around mt-5'>
                <Col className='col-3'>
                    <Image src="subsetSum.svg" className='img-menu hover-blue' onClick={onSubsetSumClick} fluid rounded></Image>
                    <label className='text-blue fw-bold'>Problema del subconjunto</label>
                </Col>
            </Row>
            
        </Container>
    );
};

export default Menu;
