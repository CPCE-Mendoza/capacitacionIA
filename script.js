// script.js

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const toggleIcon = document.getElementById('toggleIcon');

    // Función para alternar el modo
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');

        // Guarda la preferencia en localStorage *solo si se hace clic en el botón*
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
             toggleIcon.textContent = "\u{1F31E}"; // Sol

        } else {
            localStorage.setItem('darkMode', 'disabled');
            toggleIcon.textContent = "\u{1F319}"; // Luna
        }
    }

    // Verifica si hay una preferencia guardada en localStorage
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedDarkMode === 'enabled') {
        body.classList.add('dark-mode');
        toggleIcon.textContent = "\u{1F31E}"; // Sol

    } else if (savedDarkMode === 'disabled') {
        body.classList.remove('dark-mode'); // Asegura que se quite la clase
         toggleIcon.textContent = "\u{1F319}"; // Luna
    }
    //Si savedDarkMode es null, no se hace nada, se usa la preferencia del sistema

    // Event listener para el botón
    darkModeToggle.addEventListener('click', toggleDarkMode);
});