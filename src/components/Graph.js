import React, { useRef, useEffect } from 'react';
import p5, { Color } from 'p5';
import './Graph.css';

// Componente Graph que recibe nodos y aristas como props y permite interacción mediante p5.js
const Graph = ({ nodes, setNodes, edges, setEdges }) => {
    const canvasRef = useRef(null);
    let selectedNodeIndex = null;


    const sketch = (p) => {
        p.setup = () => {
            // Ajustar el lienzo al tamaño del contenedor
            const canvas = p.createCanvas(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
            canvas.mousePressed(handleMousePressed);
            canvas.mouseClicked(handleMouseClicked);
            // Prevenir el menú contextual dentro del lienzo
            canvasRef.current.addEventListener('contextmenu', (e) => e.preventDefault());
            p.background(220);
        };

        p.windowResized = () => {
            // Ajustar el lienzo cuando se cambia el tamaño de la ventana
            p.resizeCanvas(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
        };

        const handleMouseClicked = () => {
            if (p.mouseButton === p.LEFT) {
                let nodeFound = false;
                let clickedNodeIndex = null;
                for (let i = 0; i < nodes.length; i++) {
                    const d = p.dist(p.mouseX, p.mouseY, nodes[i].x, nodes[i].y);
                    if (d < 15) {
                        nodeFound = true;
                        clickedNodeIndex = i;
                        if (selectedNodeIndex === null) {
                            selectedNodeIndex = i;
                        } else if (selectedNodeIndex !== i) {
                            // Verificar si ya hay una arista entre los nodos seleccionados
                            const existingEdge = edges.find(edge =>
                                (edge.start === selectedNodeIndex && edge.end === clickedNodeIndex) ||
                                (edge.start === clickedNodeIndex && edge.end === selectedNodeIndex)
                            );
                            if (!existingEdge) {
                                edges.push({ start: selectedNodeIndex, end: clickedNodeIndex });
                            }
                            selectedNodeIndex = null;
                        } else {
                            selectedNodeIndex = null; // Deseleccionar el nodo si se hace clic nuevamente
                        }
                        break;
                    }
                }

                if (!nodeFound && selectedNodeIndex === null) {
                    nodes.push({ x: p.mouseX, y: p.mouseY, color: "white" });
                }
            }
        };

        // Maneja el evento de presionar el botón del mouse, específicamente para eliminar nodos con clic derecho
        const handleMousePressed = (e) => {
            if (p.mouseButton === p.RIGHT) {
                // Busca si se hizo clic derecho en algún nodo para eliminarlo junto con sus aristas
                for (let i = nodes.length - 1; i >= 0; i--) {
                    const d = p.dist(p.mouseX, p.mouseY, nodes[i].x, nodes[i].y);
                    if (d < 15) {
                        // Crea una nueva lista de nodos sin el nodo eliminado
                        const newNodes = nodes.filter((_, index) => index !== i);
                        setNodes(newNodes);
        
                        // Crea una nueva lista de aristas sin las conectadas al nodo eliminado
                        const newEdges = edges.filter(edge => edge.start !== i && edge.end !== i)
                            .map(edge => ({
                                start: edge.start > i ? edge.start - 1 : edge.start,
                                end: edge.end > i ? edge.end - 1 : edge.end,
                            }));
                        setEdges(newEdges);
        
                        break;
                    }
                }
            }
        };

        p.draw = () => {
            p.background("#191f2b");
            drawEdges(p);
            drawNodes(p);
        };

        const drawNodes = (p) => {
            nodes.forEach((node, index) => {
                node.color ? p.fill(`${node.color}`) : p.fill(255);
                p.stroke("#141b26");
                p.strokeWeight(2);
                p.circle(node.x, node.y, 50);

                p.textSize(20);
                p.textAlign(p.CENTER, p.CENTER);
                p.fill("white");
                p.stroke("black");
                p.strokeWeight(4);
                p.text(`${index}`, node.x, node.y);

                if (index === selectedNodeIndex) {
                    p.fill(0, 255, 0, 150);
                    p.circle(node.x, node.y, 45);
                }
            });
        };

        // Función auxiliar para dibujar las aristas
            const drawEdges = (p) => {
                edges.forEach(edge => {
                    const start = nodes[edge.start];
                    const end = nodes[edge.end];
                    p.stroke("#666d94");
                p.strokeWeight(7);
                p.line(start.x, start.y, end.x, end.y);

                p.stroke("white"); // Color del borde de las aristas
                    p.strokeWeight(1); // Grosor del borde de las aristas
                    p.line(start.x, start.y, end.x, end.y); // Dibuja la línea que representa la arista
                });
            };
        };

    // Configura el sketch de p5.js cuando el componente se monta y lo limpia cuando se desmonta
    useEffect(() => {
        let myP5 = new p5(sketch, canvasRef.current);

        return () => {
            myP5.remove(); // Limpia el sketch de p5.js
        };
    }, [nodes, edges]); // Dependencias del efecto: los nodos y las aristas

    return <div ref={canvasRef} style={{ width: '100%', height: '100vh' }}></div>; // Renderiza el contenedor del lienzo
};

export default Graph;