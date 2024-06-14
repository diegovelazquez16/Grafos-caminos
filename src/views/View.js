export default class View {
    static showMessage(message) {
        const outputElement = document.getElementById('output');
        outputElement.innerHTML += `${message}<br>`;
    }

    static displayBFSResult(result) {
        const outputElement = document.getElementById('output');
        outputElement.innerHTML = `BFS Result: ${result}`;
    }
}
