import { renderDiagram } from './mermaid-config.js';
import { reset } from './panZoom.js';

export async function loadFileList() {
    try {
        const response = await fetch('/list-files');
        const files = await response.json();
        const fileList = document.getElementById('file-list');
        fileList.innerHTML = files.map(file => `
            <div class="file-item">
                <span>${file}</span>
                <button class="delete-file" data-file="${file}">×</button>
            </div>
        `).join('');

        document.querySelectorAll('.file-item span').forEach(item => {
            item.addEventListener('click', () => loadFile(item.textContent));
        });

        document.querySelectorAll('.delete-file').forEach(button => {
            button.addEventListener('click', (e) => deleteFile(e.target.dataset.file));
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

async function deleteFile(fileName) {
    if (confirm(`Are you sure you want to delete ${fileName}?`)) {
        try {
            const response = await fetch(`/delete-file/${fileName}`, { method: 'DELETE' });
            if (response.ok) {
                loadFileList();
            } else {
                console.error('Error deleting file:', await response.text());
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    }
}

export function setupFileUpload() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');

    uploadArea.addEventListener('click', () => fileInput.click());

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
}

async function handleFiles(files) {
    for (const file of files) {
        if (file.name.endsWith('.mmd') || file.name.endsWith('.txt')) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('/upload-file', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    loadFileList();
                } else {
                    console.error('Error uploading file:', await response.text());
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.warn('Skipping file with unsupported extension:', file.name);
        }
    }
}