import React, { useState } from 'react';
import Graph from './Graph';
import Modal from './Modal';
import { bruteForceClique, detectCompleteOrSparseGraph, greedyClique } from '../algorithms/CliqueAlgorithms';
import { Row, Col, Button, Toast, ToastContainer} from 'react-bootstrap';
import { ArrowLeftCircle, InfoCircle, Hammer, Puzzle, PiggyBank, Trash3 } from 'react-bootstrap-icons';

const CliqueVisualization = ({ onBack }) => {
    // Estados para nodos, aristas, el resultado del cálculo del clique y visibilidad del modal
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [cliqueResult, setCliqueResult] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [resultMessage, setResultMessage] = useState(null);

    // Función para limpiar el lienzo, reiniciando los nodos y aristas
    const clearCanvas = () => {
        setNodes([]);
        setEdges([]);
        setCliqueResult([]);
    };

    // Manejador para calcular el clique máximo usando fuerza bruta
    const handleBruteForce = () => {
        let start = window.performance.now();
        const result = bruteForceClique(nodes, edges);
        let end = window.performance.now();
        setCliqueResult(result);
        // Muestra el resultado al usuario mediante una alerta
        setResultMessage(<>
            <p>El clique máximo encontrado tiene tamaño: <span className='text-green'>{result.length}</span></p>
            <p>El tiempo de ejecución fue: <span className='text-yellow'>{end - start}</span></p>
        </>);
        setShow(true);
    };

    const handleDetectGraphType = () => {
        let start = window.performance.now();
        const result = detectCompleteOrSparseGraph(nodes, edges);
        let end = window.performance.now();

        if (result.type === 'sparse') {
            setResultMessage(<>
                <p>Tipo de grafo: <span className='text-blue'>{result.type}</span>.</p>
                <p>Tamaño del clique máximo: <span className='text-green'>{result.cliqueSize}</span>.</p>
                <p>El tiempo de ejecución fue: <span className='text-yellow'>{end - start}</span></p>
            </>);
            setShow(true);
        } else {
            setResultMessage(<>
                <p>Tipo de grafo: <span className='text-pink'>{result.type}</span>.</p> 
                <p>Tamaño del clique máximo: <span className='text-green'>{result.cliqueSize}</span>.</p>
                <p>El tiempo de ejecución fue: <span className='text-yellow'>{end - start}</span></p>
            </>);
            setShow(true);
        }
        // Muestra información sobre el tipo de grafo y el tamaño del clique máximo
    };   
    
    const handleGreedyClique = () => {
        let start = window.performance.now();
        const result = greedyClique(nodes, edges);
        let end = window.performance.now();

        setResultMessage(<>
            <p>Un clique encontrado usando heurística greedy tiene tamaño: <span className='text-green'>{result.length}</span></p>
            <p>El tiempo de ejecución fue: <span className='text-yellow'>{end - start}</span></p>
        </>);
        setShow(true);
        // Muestra información sobre el tipo de grafo y el tamaño del clique máximo
    };

    // Función para abrir el modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
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
                <li><strong>Fuerza Bruta:</strong> Ejecuta el algoritmo de fuerza bruta para encontrar la clique máxima en el grafo.</li>
                <li><strong>Disperso o Completo:</strong> Detecta si el grafo es disperso o completo y encuentra la clique máxima.</li>
                <li><strong>Heurístico Greedy:</strong> Utiliza un enfoque heurístico para encontrar un clique grande en el grafo.</li>
            </ul>
            <h2 className='text-green'>Tipos de Grafo Ideal</h2>
            <ul>
                <li><strong>Fuerza Bruta:</strong> Ideal para grafos pequeños o moderados, ya que el tiempo de ejecución aumenta exponencialmente con el número de nodos.</li>
                <li><strong>Disperso o Completo:</strong> Eficiente para identificar rápidamente grafos completos o dispersos y determinar la clique máxima en dichos casos.</li>
                <li><strong>Heurístico Greedy:</strong> Adecuado para grafos de tamaño moderado a grande donde encontrar la clique máxima de manera exacta no es computacionalmente viable.</li>
            </ul>
        </div>
    );    

    return (
        <div>
            <h1 className='text-yellow'>Problema de Clique</h1>
            
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
                            <Button variant='warning' className='text-white' onClick={handleBruteForce}><Hammer></Hammer> Fuerza Bruta</Button>
                        </Col>
                        <Col className='col-auto'>
                            <Button variant='warning' className='text-white' onClick={handleDetectGraphType} ><Puzzle></Puzzle> Disperso o Completo</Button>
                        </Col>
                        <Col className='col-auto'>
                            <Button variant='warning' className='text-white' onClick={handleGreedyClique} ><PiggyBank></PiggyBank> Heurístico Greedy</Button>
                        </Col>
                        <Col className='col-auto'>
                            <Button variant='danger' onClick={clearCanvas} ><Trash3></Trash3> Limpiar Lienzo</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Graph nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
            <ToastContainer position="middle-center" className="p-3" style={{ zIndex: 1 }}>
                <Toast className='bg-gray shadow-green' onClose={() => setShow(false)} show={show}>
                    <Toast.Header className='bg-darkBlue'>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                        />
                        <strong className="text-yellow me-auto">Resultado</strong>
                    </Toast.Header>
                    <Toast.Body className='text-white'>{resultMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {instructionsModalContent}
            </Modal>
        </div>
    );
};

export default CliqueVisualization;
