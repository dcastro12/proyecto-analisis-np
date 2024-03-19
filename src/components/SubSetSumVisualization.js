import React, { useState } from 'react';
import {Button, Row, Col, Form, ToastContainer, Toast} from 'react-bootstrap';
// import { isSubsetSum } from '../algorithms/SubSetSumAlgorithm';
import { getSubsetsWithSum } from '../algorithms/SubSetSumAlgorithm';
import { ArrowLeftCircle, InfoCircle, Braces } from 'react-bootstrap-icons';
import Modal from './Modal';

const SubSetSumVisualization = ({ onBack }) => {
    const [newSet, setNewSet] = useState([]);
    const [newTarget, setNewTarget] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resultMessage, setResultMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [executionTime, setExecutionTime] = useState(0);

    const handleCalculateSubsets = () => {
        let start = window.performance.now();
        let subsets = getSubsetsWithSum(newSet, newSet.length, newTarget);
        let end = window.performance.now();

        if(subsets.length > 0) {
            setShow(true);
            setExecutionTime(end - start);
        }
         
        let message;
        if(subsets.length > 0) {
            message = <Col className='col-5 py-4 px-3 bg-darkBlue rounded text-white'>
                <h4 className='text-yellow'>Conjunto: {"["}<span className='text-yellow'>{newSet.join(", ")}</span>{"]"}</h4>
                <h4 className='text-pink'>Objetivo: <span className='text-pink'>{newTarget}</span></h4>
                <h5 className='text-center text-green pt-3'>{subsets.length} subconjuntos encontrados</h5>
                {subsets.map((subset, index) => {
                    return <p className='h6'><span className='text-blue'>Subconjunto {index}:</span> {"["}{subset.join(", ")}{"]"}</p>
                })}
            </Col>
        }
        else {
            message = <h5 className='text-center text-red pt-3'>{subsets.length} subconjuntos encontrados</h5>;
        }

        setResultMessage(message);
    };

    const handleChangeSet = (e) => {
        let result = [];
        e.target.value.replaceAll(" ", "").split(",")
            .forEach(x => {
                let num = parseInt(x);

                if(!isNaN(num))
                    result.push(num);
            });

        setNewSet(result);
    }

    const handleChangeTarget = (e) => {
        setNewTarget(e.target.value);
    }

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
                <li><strong>Ingresar un conjunto de números (separados por coma):</strong> Por ejemplo: 4, 7, 9.</li>
                <li><strong>Ingresar un número objetivo</strong></li>
            </ul>
            <h2 className='text-blue'>Botones</h2>
            <ul>
                <li><strong>Regresar:</strong> Vuelve al menú inicial.</li>
                <li><strong>Calcular subconjuntos:</strong> Ejecuta el algoritmo para encontrar todos los subconjuntos que sumados son iguales a el objetivo, dentro del conjunto proporcionado.</li>
            </ul>
        </div>
    );

    return (
        <div>
            <h1 className='text-blue'>Problema del Subconjunto (Subset Sum)</h1>
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
                            <Button variant='warning' className='text-white' onClick={handleCalculateSubsets} ><Braces></Braces> Calcular subconjuntos</Button>
                        </Col>
                    </Row>  
                </Col>
            </Row>
            <Row className='justify-content-center mt-3'>
                <Col className='col-auto'>
                    <Form.Group className="mb-3" controlId="controlInput1">
                        <Form.Label className='text-white'>Conjunto</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el conjunto separado por comas" onInput={handleChangeSet}/>
                    </Form.Group>
                </Col>
                <Col className='col-auto'>
                    <Form.Group className="mb-3" controlId="controlInput2">
                        <Form.Label className='text-white'>Objetivo</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el objetivo" onInput={handleChangeTarget}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className='mt-4 text-start justify-content-center'>
                {resultMessage}
                {/* <SubSetComponent set={set} target={target}></SubSetComponent> */}
            </Row>
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
        </div>
    );
};

export default SubSetSumVisualization;
