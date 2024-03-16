import React, { useState } from 'react';
import Graph from './Graph';
import Button from './Button';
import { bruteForceClique, detectCompleteOrSparseGraph, greedyClique } from '../algorithms/CliqueAlgorithms';

const CliqueVisualization = ({ onBack }) => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [cliqueResult, setCliqueResult] = useState([]);

    const clearCanvas = () => {
        setNodes([]);
        setEdges([]);
        setCliqueResult([]);
    };

    const handleBruteForce = () => {
        const result = bruteForceClique(nodes, edges);
        setCliqueResult(result);
        // Puedes mostrar el resultado en la interfaz o como alerta por ahora
        alert(`El clique máximo encontrado tiene tamaño: ${result.length}`);
    };

    const handleDetectGraphType = () => {
        const result = detectCompleteOrSparseGraph(nodes, edges);
        if (result.type === 'sparse') {
            alert(`Tipo de grafo: ${result.type}. Tamaño del clique máximo: ${result.cliqueSize}`);
        } else {
            alert(`Tipo de grafo: ${result.type}. Tamaño del clique máximo: ${result.cliqueSize}`);
        }
        // Aquí podrías actualizar el estado o la UI con los detalles del clique encontrado
    };   
    
    const handleGreedyClique = () => {
        const result = greedyClique(nodes, edges);
        alert(`Un clique encontrado usando heurística greedy tiene tamaño: ${result.length}`);
        // Aquí puedes actualizar la interfaz para mostrar el clique o resaltarlo en el gráfico.
    };
    
    return (
        <div>
            <h1>Problema de Clique</h1>
            <Button text="Regresar al Menú Principal" onClick={onBack} />
            <Button text="Instrucciones" onClick={() => alert("Instrucciones")} />
            <Button text="Limpiar Lienzo" onClick={clearCanvas} />
            <Button text="Fuerza Bruta" onClick={handleBruteForce} />
            <Button text="Disperso o Completo" onClick={handleDetectGraphType} />
            <Button text="Heurístico Greedy" onClick={handleGreedyClique} />
            <Graph nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
        </div>
    );
};

export default CliqueVisualization;
