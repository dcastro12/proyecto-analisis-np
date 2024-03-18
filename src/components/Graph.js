import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import './Graph.css';

// Componente Graph que recibe nodos y aristas como props y permite interacción mediante p5.js
const Graph = ({ nodes, setNodes, edges, setEdges }) => {
    const canvasRef = useRef(null); // Referencia al elemento del DOM donde se renderizará el lienzo
    let selectedNodeIndex = null; // Almacena el índice del nodo seleccionado, si lo hay

    // Función que define cómo se debe comportar y dibujar el sketch de p5.js
    const sketch = (p) => {
        // Configuración inicial del sketch, se llama una vez cuando el sketch se inicia
        p.setup = () => {
            // Crea el lienzo con el tamaño del contenedor y configura los controladores de eventos
            const canvas = p.createCanvas(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
            canvas.mousePressed(handleMousePressed);
            canvas.mouseClicked(handleMouseClicked);
            canvasRef.current.addEventListener('contextmenu', (e) => e.preventDefault()); // Previene el menú contextual
        };

        // Se llama cada vez que se redimensiona la ventana, ajusta el tamaño del lienzo
        p.windowResized = () => {
            p.resizeCanvas(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
        };

        // Maneja los clics del mouse, seleccionando nodos o creando nuevos
        const handleMouseClicked = () => {
            // Comportamiento al hacer clic izquierdo en el lienzo
            if (p.mouseButton === p.LEFT) {
                let nodeFound = false;
                let clickedNodeIndex = null;
                // Busca si se hizo clic en algún nodo
                for (let i = 0; i < nodes.length; i++) {
                    const d = p.dist(p.mouseX, p.mouseY, nodes[i].x, nodes[i].y);
                    if (d < 15) { // Se considera un clic dentro del nodo si la distancia es menor a 15
                        nodeFound = true;
                        clickedNodeIndex = i;
                        // Lógica para seleccionar nodos y crear aristas
                        if (selectedNodeIndex === null) {
                            selectedNodeIndex = i; // Selecciona el nodo si no había uno seleccionado
                        } else if (selectedNodeIndex !== i && !edges.find(edge => 
                            (edge.start === selectedNodeIndex && edge.end === clickedNodeIndex) ||
                            (edge.start === clickedNodeIndex && edge.end === selectedNodeIndex))) {
                            // Crea una arista si se selecciona otro nodo y no existe una arista entre ellos
                            edges.push({ start: selectedNodeIndex, end: clickedNodeIndex });
                            selectedNodeIndex = null; // Después de crear la arista, deselecciona el nodo
                        } else {
                            selectedNodeIndex = null; // Deselecciona el nodo si se hace clic en él nuevamente
                        }
                        break;
                    }
                }

                // Si se hizo clic en el lienzo pero no en un nodo, y no hay nodo seleccionado, crea un nuevo nodo
                if (!nodeFound && selectedNodeIndex === null) {
                    nodes.push({ x: p.mouseX, y: p.mouseY });
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
                        selectedNodeIndex = null; // Deselecciona el nodo si está seleccionado
                        nodes.splice(i, 1); // Elimina el nodo
                        // Elimina todas las aristas conectadas al nodo eliminado
                        edges = edges.filter(edge => edge.start !== i && edge.end !== i);
                        edges = edges.filter(edge => edge.end !== i && edge.start !== i);
                        // Ajusta los índices de los nodos en las aristas restantes
                        edges.forEach(edge => {
                            if (edge.start > i) edge.start--;
                            if (edge.end > i) edge.end--;
                        });
                        
                        break;
                    }
                }
            }
        };

        // Función de dibujo que se ejecuta en cada cuadro, redibuja los nodos y las aristas
        p.draw = () => {
            p.background(255); // Establece el fondo del lienzo
            drawEdges(p); // Dibuja las aristas
            drawNodes(p); // Dibuja los nodos
        };

        // Función auxiliar para dibujar los nodos
        const drawNodes = (p) => {
            nodes.forEach((node, index) => {
                p.fill(255); // Color de relleno para los nodos
                p.stroke(0); // Color del borde de los nodos
                p.strokeWeight(2); // Grosor del borde de los nodos
                p.circle(node.x, node.y, 30); // Dibuja el círculo que representa el nodo

                // Resalta el nodo seleccionado
                if (index === selectedNodeIndex) {
                    p.fill(0, 255, 0, 150); // Color de relleno para el nodo seleccionado
                    p.circle(node.x, node.y, 30); // Dibuja el círculo nuevamente para el nodo seleccionado
                }
            });
        };

        // Función auxiliar para dibujar las aristas
        const drawEdges = (p) => {
            edges.forEach(edge => {
                const start = nodes[edge.start];
                const end = nodes[edge.end];
                p.stroke(0); // Color del borde de las aristas
                p.strokeWeight(2); // Grosor del borde de las aristas
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