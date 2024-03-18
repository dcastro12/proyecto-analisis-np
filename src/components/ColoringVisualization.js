import React, { useState } from 'react';
import Graph from './Graph';
// import Button from './Button';
import {Button, Row, Col} from 'react-bootstrap';
import { coloringGraph} from '../algorithms/ColoringAlgorithm';

const ColoringVisualization = ({ onBack }) => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    
    const clearCanvas = () => {
        setNodes([]);
        setEdges([]);
    };

    const resetColors = () => {
        nodes.forEach(node => {
            node.color = "white"
        })
    }

    const handleColoring = () => {
        resetColors();
        coloringGraph(nodes, edges);
    };

    
    return (
        <div>
            <h1>Coloración de Grafo</h1>
            <Row className='justify-content-center'>
            	<Col className='col-auto'>
                    <Button variant='light' onClick={onBack}>Regresar al Menú Principal</Button>
                </Col>
            	<Col className='col-auto'>
                    <Button variant="warning" onClick={() => alert("Instrucciones")}>Instrucciones</Button>
                </Col>
            	<Col className='col-auto'>
                    <Button variant='success' onClick={handleColoring} >Colorear Grafo</Button>
                </Col>
            	<Col className='col-auto'>
                    <Button variant='danger' onClick={clearCanvas} >Limpiar Lienzo</Button>
                </Col>
            </Row>
            <Graph nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
        </div>
    );
};

export default ColoringVisualization;
