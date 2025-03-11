document.addEventListener("DOMContentLoaded", () => {
    const toggleCheckbox = document.getElementById("toggleCheckbox");
    const body = document.body;
    const images = document.querySelectorAll(".info-icon");
    const toggleIcons = document.querySelectorAll(".toggle-icon");
    const links = document.querySelectorAll("a[href^='#']"); // Enlaces internos
    const footerLogo = document.querySelector(".footerlogo"); // Seleccionamos el logo del footer

    // 📌 Función para cambiar las imágenes según el modo
    function changeImages(mode) {
        images.forEach(img => {
            img.src = mode === "dark" ? img.dataset.dark : img.dataset.light;
        });

        // Cambiar la imagen del logo en el footer
        if (footerLogo) {
            footerLogo.src = mode === "dark" ? footerLogo.dataset.dark : footerLogo.dataset.light;
        }
    }

    // 📌 Cargar preferencia de modo oscuro desde localStorage
    const initialMode = localStorage.getItem("darkMode") === "enabled" ? "dark" : "light";
    body.classList.toggle("dark-mode", initialMode === "dark");
    toggleCheckbox.checked = initialMode === "dark"; // Aseguramos que el checkbox refleje el estado

    // 📌 Configurar las imágenes según el modo al cargar la página
    changeImages(initialMode);

    // 📌 Evento para cambiar el modo claro/oscuro al hacer click en el toggleCheckbox
    toggleCheckbox.addEventListener("change", () => {
        const mode = toggleCheckbox.checked ? "dark" : "light";
        body.classList.toggle("dark-mode", mode === "dark");
        localStorage.setItem("darkMode", mode === "dark" ? "enabled" : "disabled");
        changeImages(mode);
    });

    // 📌 Implementar smooth-scroll en los enlaces de navegación
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Ajuste opcional según tu navbar
                    behavior: "smooth"
                });
            }
        });
    });

    // 📌 Activar lazy-loading en imágenes
    document.querySelectorAll("img").forEach(img => {
        img.loading = "lazy";
    });
});
