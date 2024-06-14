export default class Graph {
    #adjacencyList = new Map();

    constructor() {}

    addVertices(...vertices) {
        vertices.forEach(vertex => {
            this.#adjacencyList.set(vertex, []);
        });
    }

    addVertex(vertex) {
        this.#adjacencyList.set(vertex, []);
    }

    addEdge(start, end, weight = 1) {
        if (this.#adjacencyList.has(start) && this.#adjacencyList.has(end)) {
            this.#adjacencyList.get(start).push({ node: end, weight });
            return true;
        }
        return false;
    }

    breadthFirstSearch(callback) {
        let visited = new Map();
        let queue = [];

        // Start BFS from the first vertex added to the graph
        let startVertex = [...this.#adjacencyList.keys()][0];
        queue.push(startVertex);
        visited.set(startVertex, true);

        while (queue.length > 0) {
            let currentVertex = queue.shift();
            callback(currentVertex);

            this.#adjacencyList.get(currentVertex).forEach(neighbor => {
                if (!visited.has(neighbor.node)) {
                    queue.push(neighbor.node);
                    visited.set(neighbor.node, true);
                }
            });
        }
    }
}
