export default class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }

    addVertices(...vertices) {
        for (let value of vertices) {
            if (!this.adjacencyList.has(value)) {
                this.adjacencyList.set(value, []);
            }
        }
    }

    addConnection(start, end, weight = 1) {
        if (this.adjacencyList.has(start) && this.adjacencyList.has(end)) {
            this.adjacencyList.get(start).push({ node: end, weight });
            this.adjacencyList.get(end).push({ node: start, weight });
            return true;
        }
        return false;
    }

    dijkstra(start) {
        const distances = new Map();
        const visited = new Set();
        const previous = new Map();

        for (let vertex of this.adjacencyList.keys()) {
            distances.set(vertex, Infinity);
        }
        distances.set(start, 0);

        while (true) {
            let minDistance = Infinity;
            let minVertex = null;

            for (let [vertex, distance] of distances) {
                if (!visited.has(vertex) && distance < minDistance) {
                    minDistance = distance;
                    minVertex = vertex;
                }
            }

            if (minVertex === null) break;

            visited.add(minVertex);

            const neighbors = this.adjacencyList.get(minVertex);
            for (let neighbor of neighbors) {
                const totalWeight = distances.get(minVertex) + neighbor.weight;
                if (totalWeight < distances.get(neighbor.node)) {
                    distances.set(neighbor.node, totalWeight);
                    previous.set(neighbor.node, minVertex);
                }
            }
        }

        return { distances, previous };
    }

    depthFirstSearch(start, callback) {
        const stack = [{ node: start, distance: 0 }];
        const visited = new Set();
        const distances = new Map();

        for (let vertex of this.adjacencyList.keys()) {
            distances.set(vertex, Infinity);
        }
        distances.set(start, 0);

        visited.add(start);

        while (stack.length > 0) {
            const { node, distance } = stack.pop();
            const neighbors = this.adjacencyList.get(node);

            for (let neighbor of neighbors) {
                if (!visited.has(neighbor.node)) {
                    visited.add(neighbor.node);
                    stack.push({ node: neighbor.node, distance: distance + neighbor.weight });
                    distances.set(neighbor.node, distance + neighbor.weight);
                    callback(neighbor.node, distance + neighbor.weight);
                }
            }
        }
    }

    getVertices() {
        return Array.from(this.adjacencyList.keys());
    }
}
