import React, { useState } from 'react';
import Graph from './Graph';
import Button from './Button';
import Modal from './Modal';
import { bruteForceClique, detectCompleteOrSparseGraph, greedyClique } from '../algorithms/CliqueAlgorithms';

const CliqueVisualization = ({ onBack }) => {
    // Estados para nodos, aristas, el resultado del cálculo del clique y visibilidad del modal
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [cliqueResult, setCliqueResult] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para limpiar el lienzo, reiniciando los nodos y aristas
    const clearCanvas = () => {
        setNodes([]);
        setEdges([]);
        setCliqueResult([]);
    };

    // Manejador para calcular el clique máximo usando fuerza bruta
    const handleBruteForce = () => {
        const result = bruteForceClique(nodes, edges);
        setCliqueResult(result);
        // Muestra el resultado al usuario mediante una alerta
        alert(`El clique máximo encontrado tiene tamaño: ${result.length}`);
    };

    const handleDetectGraphType = () => {
        const result = detectCompleteOrSparseGraph(nodes, edges);
        if (result.type === 'sparse') {
            alert(`Tipo de grafo: ${result.type}. Tamaño del clique máximo: ${result.cliqueSize}`);
        } else {
            alert(`Tipo de grafo: ${result.type}. Tamaño del clique máximo: ${result.cliqueSize}`);
        }
        // Muestra información sobre el tipo de grafo y el tamaño del clique máximo
    };   
    
    const handleGreedyClique = () => {
        const result = greedyClique(nodes, edges);
        alert(`Un clique encontrado usando heurística greedy tiene tamaño: ${result.length}`);
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
            <h2>Instrucciones</h2>
            <ul>
                <li><strong>Crear Nodo:</strong> Haz clic en un espacio vacío del lienzo para crear un nuevo nodo.</li>
                <li><strong>Crear Arista:</strong> Haz clic en un nodo y luego en otro para crear una arista entre ellos.</li>
                <li><strong>Eliminar Nodo/Arista:</strong> Haz clic derecho en un nodo para eliminarlo junto con sus aristas.</li>
                <li><strong>Deseleccionar Nodo:</strong> Si un nodo está seleccionado, haz clic en el mismo nodo para deseleccionarlo.</li>
                <li><strong>Nota:</strong> Tocar un espacio vacío mientras un nodo está seleccionado lo deseleccionará y creará un nuevo nodo.</li>
            </ul>
            <h2>Botones</h2>
            <ul>
                <li><strong>Regresar al Menú Principal:</strong> Vuelve al menú inicial.</li>
                <li><strong>Limpiar Lienzo:</strong> Elimina todos los nodos y aristas del lienzo.</li>
                <li><strong>Fuerza Bruta:</strong> Ejecuta el algoritmo de fuerza bruta para encontrar la clique máxima en el grafo.</li>
                <li><strong>Disperso o Completo:</strong> Detecta si el grafo es disperso o completo y encuentra la clique máxima.</li>
                <li><strong>Heurístico Greedy:</strong> Utiliza un enfoque heurístico para encontrar un clique grande en el grafo.</li>
            </ul>
            <h2>Tipos de Grafo Ideal</h2>
            <ul>
                <li><strong>Fuerza Bruta:</strong> Ideal para grafos pequeños o moderados, ya que el tiempo de ejecución aumenta exponencialmente con el número de nodos.</li>
                <li><strong>Disperso o Completo:</strong> Eficiente para identificar rápidamente grafos completos o dispersos y determinar la clique máxima en dichos casos.</li>
                <li><strong>Heurístico Greedy:</strong> Adecuado para grafos de tamaño moderado a grande donde encontrar la clique máxima de manera exacta no es computacionalmente viable.</li>
            </ul>
        </div>
    );    

    return (
        <div>
            <h1>Problema de Clique</h1>
            <Button text="Regresar al Menú Principal" onClick={onBack} />
            <Button text="Instrucciones" onClick={handleOpenModal} />
            <Button text="Limpiar Lienzo" onClick={clearCanvas} />
            <Button text="Fuerza Bruta" onClick={handleBruteForce} />
            <Button text="Disperso o Completo" onClick={handleDetectGraphType} />
            <Button text="Heurístico Greedy" onClick={handleGreedyClique} />
            <Graph nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {instructionsModalContent}
            </Modal>
        </div>
    );
};

export default CliqueVisualization;
