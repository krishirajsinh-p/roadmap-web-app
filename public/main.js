import { initializeMermaid } from './mermaid-config.js';
import { setupSidebar } from './sidebar.js';
import { setupToolbar } from './toolbar.js';
import { setupPanZoom } from './panZoom.js';
import { loadFileList, setupFileUpload } from './file-loader.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeMermaid();
    setupSidebar();
    setupToolbar();
    setupPanZoom();
    loadFileList();
    setupFileUpload();
});
