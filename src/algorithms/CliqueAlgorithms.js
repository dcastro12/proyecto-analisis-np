// Función que implementa el algoritmo de fuerza bruta para encontrar el clique máximo en un grafo
export const bruteForceClique = (nodes, edges) => {
    let maxCliqueSize = 0;  // Tamaño del máximo clique encontrado
    let maxClique = [];  // Almacena el máximo clique

    // Convertir la lista de aristas en un conjunto para una búsqueda rápida de conexiones entre nodos
    const edgeSet = new Set(edges.map(edge => `${edge.start}-${edge.end}`));

    // Generar todos los posibles subconjuntos de nodos para encontrar cliques potenciales
    const subsets = getAllSubsets(nodes.map((_, index) => index));

    // Verificar cada subconjunto para determinar si es un clique
    for (let subset of subsets) {
        if (subset.length <= maxCliqueSize) continue; // Ignorar subconjuntos más pequeños que el máximo encontrado

        // Comprobar si todos los nodos en el subconjunto están conectados entre sí
        let isClique = subset.every((node, _, arr) => 
            arr.every(otherNode => 
                node === otherNode || edgeSet.has(`${node}-${otherNode}`) || edgeSet.has(`${otherNode}-${node}`)
            )
        );

        // Actualizar el clique máximo si se encuentra uno más grande
        if (isClique && subset.length > maxCliqueSize) {
            maxCliqueSize = subset.length;
            maxClique = subset;
        }
    }

    // Devolver los nodos que forman el clique máximo
    return maxClique.map(index => nodes[index]);
};

// Función auxiliar para generar todos los subconjuntos de un conjunto dado
const getAllSubsets = (array) =>
    array.reduce((subsets, value) =>
        subsets.concat(subsets.map(set => [value, ...set])), [[]]);

// Función para detectar si un grafo es completo o disperso y encontrar el tamaño del clique máximo
export const detectCompleteOrSparseGraph = (nodes, edges) => {
    const n = nodes.length;
    const maxEdges = n * (n - 1) / 2;  // Máximo número de aristas en un grafo completo
    const edgeCount = edges.length;  // Número actual de aristas en el grafo

    // Comprobar si el grafo es completo
    if (edgeCount === maxEdges) {
        return { type: 'complete', cliqueSize: n };  // En un grafo completo, el clique máximo incluye todos los nodos
    } else if (edgeCount <= maxEdges * 0.25) {
        // Considerar el grafo como disperso si tiene menos del 25% de las aristas máximas
        // Encontrar el tamaño del clique máximo utilizando la función de fuerza bruta
        const clique = bruteForceClique(nodes, edges);
        return { type: 'sparse', cliqueSize: clique.length, clique };  // Devolver el tipo de grafo, tamaño y nodos del clique máximo
    }

    return { type: 'none', cliqueSize: 0 };  // El grafo no es ni completo ni disperso
};

// Implementación de un algoritmo heurístico greedy para encontrar un clique grande (no necesariamente el máximo)
export const greedyClique = (nodes, edges) => {
    if (nodes.length === 0) return [];

    // Crear un mapa para una búsqueda rápida de los nodos conectados
    const edgeMap = new Map();
    edges.forEach(edge => {
        if (!edgeMap.has(edge.start)) edgeMap.set(edge.start, []);
        if (!edgeMap.has(edge.end)) edgeMap.set(edge.end, []);
        edgeMap.get(edge.start).push(edge.end);
        edgeMap.get(edge.end).push(edge.start);
    });

    // Iniciar con un nodo y agregar nodos que estén conectados a todos los nodos en el clique actual
    let clique = [nodes[0].id];  // Iniciar el clique con el primer nodo
    let candidates = new Set(edgeMap.get(nodes[0].id));  // Candidatos para ser agregados al clique

    nodes.slice(1).forEach(node => {
        if (Array.from(candidates).every(candidate => edgeMap.get(node.id).includes(candidate))) {
            clique.push(node.id);  // Agregar el nodo al clique si está conectado a todos los nodos actuales en el clique
            candidates = new Set(candidates).intersection(new Set(edgeMap.get(node.id)));  // Actualizar los candidatos
        }
    });

    // Devolver los nodos que forman el clique encontrado
    return nodes.filter(node => clique.includes(node.id));
};
