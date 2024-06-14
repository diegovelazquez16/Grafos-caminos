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
    showAlert(`Vertices añadidos: ${vertices.join(', ')}`);
}

window.addEdge = function() {
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const weight = parseInt(document.getElementById('weight').value, 10);
    if (graph.addEdge(start, end, weight)) {
        showAlert(`Arista añadido: ${start} -> ${end} (Weight: ${weight})`);
    } else {
        showAlert(`Error: no se añadio ningun vertice ${start} ${end}`);
    }
    document.getElementById('start').value = '';
    document.getElementById('end').value = '';
    document.getElementById('weight').value = '1';
}

window.executeBFS = function() {
    let result = '';
    graph.breadthFirstSearch(vertex => {
        result += `${vertex} `;
    });
    View.displayBFSResult(result.trim());
    showAlert(`Recorrido:  ${result.trim()}`);
}
