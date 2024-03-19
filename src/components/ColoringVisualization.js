import React, { useState } from 'react';
import Graph from './Graph';
// import Button from './Button';
import {Button, Row, Col, Toast, ToastContainer} from 'react-bootstrap';
import { coloringGraph} from '../algorithms/ColoringAlgorithm';

import { ArrowLeftCircle, InfoCircle, PaintBucket, Trash3 } from 'react-bootstrap-icons';
import Modal from './Modal';

const ColoringVisualization = ({ onBack }) => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [executionTime, setExecutionTime] = useState(0);
    
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
        let start = window.performance.now();
        coloringGraph(nodes, edges);
        let end = window.performance.now();

        let result = end - start;
        
        if(nodes.length > 0) {
            setShow(true);
            setExecutionTime(result);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const instructionsModalContent = (
        <div className="instructions-content">
            <h2 className='text-yellow'>Instrucciones</h2>
            <ul>
                <li><strong>Crear Nodo:</strong> Haz clic en un espacio vacío del lienzo para crear un nuevo nodo.</li>
                <li><strong>Crear Arista:</strong> Haz clic en un nodo y luego en otro para crear una arista entre ellos.</li>
                <li><strong>Eliminar Nodo/Arista:</strong> Haz clic derecho en un nodo para eliminarlo junto con sus aristas.</li>
                <li><strong>Deseleccionar Nodo:</strong> Si un nodo está seleccionado, haz clic en el mismo nodo para deseleccionarlo.</li>
                <li><strong>Nota:</strong> Tocar un espacio vacío mientras un nodo está seleccionado lo deseleccionará y creará un nuevo nodo.</li>
            </ul>
            <h2 className='text-blue'>Botones</h2>
            <ul>
                <li><strong>Regresar:</strong> Vuelve al menú inicial.</li>
                <li><strong>Limpiar Lienzo:</strong> Elimina todos los nodos y aristas del lienzo.</li>
                <li><strong>Colorear Grafo:</strong> Ejecuta el algoritmo de coloración de grafos, para colorear cada nodo con un color que no se repita según sus nodos adyacentes.</li>
            </ul>
        </div>
    );
    
    return (
        <div>
            <h1 className='text-pink'>Coloración de Grafo</h1>
            <Row className='justify-content-center p-3'>
                <Col className='col-auto p-4 bg-gray rounded'>
                    <Row>
                        <Col className='col-auto'>
                            <Button variant='dark' onClick={onBack}><ArrowLeftCircle></ArrowLeftCircle> Regresar</Button>
                        </Col>
                        <Col className='col-auto'>
                            <Button variant="success" onClick={handleOpenModal}><InfoCircle></InfoCircle> Instrucciones</Button>
                        </Col>
                        <Col className='col-auto'>
                            <Button variant='warning' className='text-white' onClick={handleColoring} ><PaintBucket></PaintBucket> Colorear Grafo</Button>
                        </Col>
                        <Col className='col-auto'>
                            <Button variant='danger' onClick={clearCanvas} ><Trash3></Trash3> Limpiar Lienzo</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
            <span>
                <Graph nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
                <ToastContainer position="top-start" className="p-3" style={{ zIndex: 1 }}>
                    <Toast className='bg-gray' onClose={() => setShow(false)} show={show}>
                        <Toast.Header className='bg-darkBlue'>
                            <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                            />
                            <strong className="text-yellow me-auto">Tiempo de ejecución</strong>
                        </Toast.Header>
                        <Toast.Body className='text-white'>El tiempo de ejecución fue de <span className='text-green'>{executionTime}ms</span></Toast.Body>
                    </Toast>
                </ToastContainer>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    {instructionsModalContent}
                </Modal>
            </span>
        </div>
    );
};

export default ColoringVisualization;
