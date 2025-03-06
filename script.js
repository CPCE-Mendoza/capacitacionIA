// script.js

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const toggleIcon = document.getElementById('toggleIcon');

    // Función para establecer el modo oscuro
    function setDarkMode(enabled) {
        if (enabled) {
            body.classList.add('dark-mode');
            toggleIcon.textContent = "\u{1F31E}"; // Sol
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            toggleIcon.textContent = "\u{1F319}"; // Luna
            localStorage.setItem('darkMode', 'disabled');
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
            //Si no hay ninguna preferencia, se queda en modo claro.
        }
    }

    // Event listener para el botón
    darkModeToggle.addEventListener('click', function() {
        // Alterna el modo oscuro y guarda la preferencia
        setDarkMode(!body.classList.contains('dark-mode'));
    });

    // Aplica la preferencia al cargar la página
    checkDarkModePreference();

    //Escuchamos si cambia la preferencia a nivel de sistema operativo.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newColorScheme = e.matches ? "dark" : "light";

        // Usa la preferencia del sistema SOLO si no hay una manual
        if (localStorage.getItem('darkMode') === null) {
          if (newColorScheme === "dark") {
              setDarkMode(true);  //Aplicamos el modo oscuro
          } else {
              setDarkMode(false); //Si no se ha cambiado, quitamos el modo oscuro
          }
        }
    });
});