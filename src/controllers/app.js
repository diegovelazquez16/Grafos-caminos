import Graph from "../models/Graph.js";
import View from "../views/View.js";

const graph = new Graph();

function showAlert(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

document.getElementById('closeModal').onclick = function() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

window.addVertices = function() {
    const verticesInput = document.getElementById('vertices').value;
    const vertices = verticesInput.split(',').map(v => v.trim());
    graph.addVertices(...vertices);
    document.getElementById('vertices').value = '';
    showAlert(`Vértices agregados: ${vertices.join(', ')}`);
}

window.addEdge = function() {
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const weight = parseInt(document.getElementById('weight').value, 10);
    if (graph.addConnection(start, end, weight)) {
        showAlert(`Arista agregada: ${start} -> ${end} (Peso: ${weight})`);
    } else {
        showAlert(`Error: No se pudo agregar la arista ${start} -> ${end}`);
    }
    document.getElementById('start').value = '';
    document.getElementById('end').value = '';
    document.getElementById('weight').value = '1';
}

window.executeBFS = function() {
    const startVertex = document.getElementById('startBFS').value;
    if (!graph.getVertices().includes(startVertex)) {
        showAlert(`Error: El vértice ${startVertex} no existe en el grafo.`);
        return;
    }

    let result = `${startVertex} (Distancia: 0), `;
    graph.depthFirstSearch(startVertex, (vertex, distance) => {
        result += `${vertex} (Distancia: ${distance}), `;
    });
    result = result.slice(0, -2);
    View.displayBFSResult(result);
    showAlert(`Recorrido BFS: ${result}`);
}

window.showVertices = function() {
    const vertices = graph.getVertices();
    showAlert(`Vértices en el grafo: ${vertices.join(', ')}`);
}

window.executeDijkstra = function() {
    const startVertex = document.getElementById('startDijkstra').value;
    if (!graph.getVertices().includes(startVertex)) {
        showAlert(`Error: El vértice ${startVertex} no existe en el grafo.`);
        return;
    }

    const { distances } = graph.dijkstra(startVertex);
    let result = `Distancias desde ${startVertex}: `;
    distances.forEach((distance, vertex) => {
        result += `${vertex} (Distancia: ${distance}), `;
    });
    result = result.slice(0, -2);
    View.displayBFSResult(result);
    showAlert(result);
}
