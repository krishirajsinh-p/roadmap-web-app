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
    setupTouchGestures();
}

function setupTouchGestures() {
    diagramWrapper.addEventListener('touchstart', handleTouchStart, { passive: false });
    diagramWrapper.addEventListener('touchmove', handleTouchMove, { passive: false });
    diagramWrapper.addEventListener('touchend', handleTouchEnd, { passive: false });
    diagramWrapper.addEventListener('wheel', handleWheel, { passive: false });
}

function handleTouchStart(e) {
    e.preventDefault();
    if (e.touches.length === 2) {
        lastTouchDistance = getTouchDistance(e.touches);
    } else if (e.touches.length === 1) {
        startDrag(e.touches[0]);
    }
}

function handleTouchMove(e) {
    e.preventDefault();
    if (e.touches.length === 2) {
        const currentDistance = getTouchDistance(e.touches);
        const delta = currentDistance - lastTouchDistance;
        zoom(delta * 0.01);
        lastTouchDistance = currentDistance;
    } else if (e.touches.length === 1 && isDragging) {
        drag(e.touches[0]);
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
    endDrag();
}

function handleWheel(e) {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    zoom(delta);
}

function getTouchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
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
