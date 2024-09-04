import { renderDiagram } from './mermaid-config.js';
import { reset } from './panZoom.js';

export async function loadFileList() {
    try {
        const response = await fetch('/list-files');
        const files = await response.json();
        const fileList = document.getElementById('file-list');
        fileList.innerHTML = files.map(file => `<div class="file-item">${file}</div>`).join('');

        document.querySelectorAll('.file-item').forEach(item => {
            item.addEventListener('click', () => loadFile(item.textContent));
        });
    } catch (error) {
        console.error('Error loading file list:', error);
    }
}

async function loadFile(fileName) {
    try {
        const response = await fetch(`/get-file/${fileName}`);
        const content = await response.text();
        renderDiagram(content);
        reset();
    } catch (error) {
        console.error('Error loading file:', error);
    }
}
