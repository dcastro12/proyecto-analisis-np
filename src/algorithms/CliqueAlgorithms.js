export const bruteForceClique = (nodes, edges) => {
    let maxCliqueSize = 0;
    let maxClique = [];

    // Convertir la lista de aristas en un conjunto para una búsqueda rápida
    const edgeSet = new Set(edges.map(edge => `${edge.start}-${edge.end}`));

    // Generar todos los posibles subconjuntos de nodos (cliques potenciales)
    const subsets = getAllSubsets(nodes.map((_, index) => index));

    // Verificar cada subconjunto
    for (let subset of subsets) {
        if (subset.length <= maxCliqueSize) continue; // No es necesario verificar subconjuntos más pequeños

        let isClique = subset.every((node, _, arr) => 
            arr.every(otherNode => 
                node === otherNode || edgeSet.has(`${node}-${otherNode}`) || edgeSet.has(`${otherNode}-${node}`)
            )
        );

        if (isClique && subset.length > maxCliqueSize) {
            maxCliqueSize = subset.length;
            maxClique = subset;
        }
    }

    return maxClique.map(index => nodes[index]);
};

export const detectCompleteOrSparseGraph = (nodes, edges) => {
    const n = nodes.length;
    const maxEdges = n * (n - 1) / 2;
    const edgeCount = edges.length;

    if (edgeCount === maxEdges) {
        // El grafo es completo
        return { type: 'complete', cliqueSize: n };
    } else if (edgeCount <= maxEdges * 0.25) {
        // Consideramos el grafo como disperso si tiene menos del 25% de las aristas máximas
        // Usar la función de fuerza bruta para encontrar el tamaño del clique máximo en grafos dispersos
        const clique = bruteForceClique(nodes, edges);
        return { type: 'sparse', cliqueSize: clique.length, clique };
    }

    return { type: 'none', cliqueSize: 0 }; // No es ni completo ni disperso
};

export const greedyClique = (nodes, edges) => {
    if (nodes.length === 0) return [];

    // Convertir la lista de aristas en un mapa para una búsqueda rápida
    const edgeMap = new Map();
    edges.forEach(edge => {
        if (!edgeMap.has(edge.start)) edgeMap.set(edge.start, []);
        if (!edgeMap.has(edge.end)) edgeMap.set(edge.end, []);
        edgeMap.get(edge.start).push(edge.end);
        edgeMap.get(edge.end).push(edge.start);
    });

    // Empezar con un nodo y tratar de agregar más nodos que estén conectados a todos los nodos en el clique actual
    let clique = [nodes[0].id];
    let candidates = new Set(edgeMap.get(nodes[0].id));

    nodes.slice(1).forEach(node => {
        if (Array.from(candidates).every(candidate => edgeMap.get(node.id).includes(candidate))) {
            clique.push(node.id);
            candidates = new Set(candidates).intersection(new Set(edgeMap.get(node.id)));
        }
    });

    return nodes.filter(node => clique.includes(node.id));
};

const getAllSubsets = (array) =>
    array.reduce((subsets, value) =>
        subsets.concat(subsets.map(set => [value, ...set])), [[]]);
