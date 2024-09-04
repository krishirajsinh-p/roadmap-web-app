export function setupSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggle-sidebar');

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        toggleButton.innerHTML = sidebar.classList.contains('collapsed') ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-chevron-left"></i>';
    });
}
