document.addEventListener("DOMContentLoaded", () => {
    const toggleCheckbox = document.getElementById("toggleCheckbox");
    const body = document.body;
    const images = document.querySelectorAll(".info-icon");
    const toggleIcons = document.querySelectorAll(".toggle-icon");
    const links = document.querySelectorAll("a[href^='#']"); // Enlaces internos

    // 📌 Función para cambiar las imágenes según el modo
    function changeImages(mode) {
        images.forEach(img => {
            img.src = mode === "dark" ? img.dataset.dark : img.dataset.light;
        });
    }

    // 📌 Cargar preferencia de modo oscuro de localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        toggleCheckbox.checked = true;
        changeImages("dark");
    } else {
        changeImages("light");
    }

    // 📌 Evento para cambiar el modo oscuro/claro
    toggleCheckbox.addEventListener("change", () => {
        if (toggleCheckbox.checked) {
            body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
            changeImages("dark");
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
            changeImages("light");
        }
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
