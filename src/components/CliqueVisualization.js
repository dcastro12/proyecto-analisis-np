import React, { useState } from 'react';
import Graph from './Graph';
import Button from './Button';
import { bruteForceClique, detectCompleteOrSparseGraph, greedyClique } from '../algorithms/CliqueAlgorithms';

const CliqueVisualization = ({ onBack }) => {
    // Estados para nodos, aristas y el resultado del cálculo del clique
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [cliqueResult, setCliqueResult] = useState([]);

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

    const handleShowInstructions = () => {
        const instructions = `
    Instrucciones:
    
    - Crear Nodo: Haz clic en un espacio vacío del lienzo para crear un nuevo nodo.
    - Crear Arista: Haz clic en un nodo y luego en otro para crear una arista entre ellos.
    - Eliminar Nodo/Arista: Haz clic derecho en un nodo para eliminarlo junto con sus aristas.
    - Deseleccionar Nodo: Si un nodo está seleccionado, haz clic en el mismo nodo para deseleccionarlo.
    - Nota: Tocar un espacio vacío mientras un nodo está seleccionado lo deseleccionará y creará un nuevo nodo.
    
    Botones:
    
    - Regresar al Menú Principal: Vuelve al menú inicial.
    - Limpiar Lienzo: Elimina todos los nodos y aristas del lienzo.
    - Fuerza Bruta: Ejecuta el algoritmo de fuerza bruta para encontrar la clique máxima en el grafo.
    - Disperso o Completo: Detecta si el grafo es disperso o completo y encuentra la clique máxima.
    - Heurístico Greedy: Utiliza un enfoque heurístico para encontrar un clique grande en el grafo.
    
    Tipos de Grafo Ideal:
    
    - Fuerza Bruta: Ideal para grafos pequeños o moderados, ya que el tiempo de ejecución aumenta exponencialmente con el número de nodos.
    - Disperso o Completo: Eficiente para identificar rápidamente grafos completos o dispersos y determinar la clique máxima en dichos casos.
    - Heurístico Greedy: Adecuado para grafos de tamaño moderado a grande donde encontrar la clique máxima de manera exacta no es computacionalmente viable.
    `;
    
        alert(instructions);
    };
    
    
    return (
        <div>
            <h1>Problema de Clique</h1>
            <Button text="Regresar al Menú Principal" onClick={onBack} />
            <Button text="Instrucciones" onClick={handleShowInstructions} />
            <Button text="Limpiar Lienzo" onClick={clearCanvas} />
            <Button text="Fuerza Bruta" onClick={handleBruteForce} />
            <Button text="Disperso o Completo" onClick={handleDetectGraphType} />
            <Button text="Heurístico Greedy" onClick={handleGreedyClique} />
            <Graph nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
        </div>
    );
};

export default CliqueVisualization;
