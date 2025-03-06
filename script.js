// script.js

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const toggleCheckbox = document.getElementById('toggleCheckbox'); // Usamos el checkbox

    // Función para establecer el modo oscuro
    function setDarkMode(enabled) {
        if (enabled) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            toggleCheckbox.checked = true; // Asegura que el checkbox esté marcado
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            toggleCheckbox.checked = false; // Asegura que el checkbox esté desmarcado
        }
    }

    // Verifica la preferencia del usuario (localStorage o sistema)
    function checkDarkModePreference() {
        const savedDarkMode = localStorage.getItem('darkMode');

        if (savedDarkMode === 'enabled') {
            setDarkMode(true);
        } else if (savedDarkMode === 'disabled') {
            setDarkMode(false);
        } else {
            // Si no hay preferencia guardada, usa la del sistema
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setDarkMode(true);
            }
        }
    }

    // Event listener para el botón (ahora para el checkbox)
     toggleCheckbox.addEventListener('change', function() { // Usamos 'change'
         setDarkMode(toggleCheckbox.checked); // Pasamos el estado del checkbox
     });

    // Aplica la preferencia al cargar la página
    checkDarkModePreference();

    // Escuchamos si cambia la preferencia a nivel de sistema operativo.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newColorScheme = e.matches ? "dark" : "light";

        // Usa la preferencia del sistema SOLO si no hay una manual
        if (localStorage.getItem('darkMode') === null) {
            if (newColorScheme === "dark") {
                setDarkMode(true);
            } else {
                setDarkMode(false);
            }
        }
    });
});