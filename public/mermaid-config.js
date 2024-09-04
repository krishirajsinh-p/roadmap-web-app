import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

export function initializeMermaid() {
    mermaid.initialize({ startOnLoad: false });
}

export function renderDiagram(content) {
    const diagramWrapper = document.getElementById('diagram-wrapper');
    diagramWrapper.innerHTML = '';
    const newDiagram = document.createElement('div');
    newDiagram.className = 'mermaid';
    newDiagram.textContent = content;
    diagramWrapper.appendChild(newDiagram);
    mermaid.init(undefined, newDiagram);
}
