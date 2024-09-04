let currentZoom = 1;
let isDragging = false;
let startX, startY;
let translateX = 0, translateY = 0;
let zoomFactor = 0;

const diagramWrapper = document.getElementById('diagram-wrapper');

export function reset() {
    const diagramContainer = document.getElementById('diagram-container');
    const diagramWrapper = document.getElementById('diagram-wrapper');

    // Get the dimensions of the container and the diagram
    const containerWidth = diagramContainer.clientWidth;
    const containerHeight = diagramContainer.clientHeight;
    const diagramWidth = diagramWrapper.scrollWidth;
    const diagramHeight = diagramWrapper.scrollHeight;

    // Calculate scale factor to fit the diagram within the container
    const scaleX = containerWidth / diagramWidth;
    const scaleY = containerHeight / diagramHeight;
    currentZoom = Math.min(scaleX, scaleY) * 0.9; // Choose the smaller scale factor to fit both dimensions

    zoomFactor = Math.min(scaleX, scaleY) / 2;
    translateX = 0;
    translateY = 0;
    updateTransform();
}

export function setupPanZoom() {
    setupZoom();
    setupDrag();
}

function setupZoom() {
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');
    const resetZoomButton = document.getElementById('reset-zoom');

    zoomInButton.addEventListener('click', () => zoom(zoomFactor));
    zoomOutButton.addEventListener('click', () => zoom(-zoomFactor));
    resetZoomButton.addEventListener('click', reset);
}

function setupDrag() {
    diagramWrapper.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
}

function zoom(delta) {
    currentZoom = Math.max(zoomFactor / 2, currentZoom + delta);
    updateTransform();
}

function startDrag(e) {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
}

function drag(e) {
    if (isDragging) {
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
    }
}

function endDrag() {
    isDragging = false;
}

function updateTransform() {
    diagramWrapper.style.transform = `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
}
