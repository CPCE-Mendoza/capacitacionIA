document.addEventListener('DOMContentLoaded', () => {
    const toggleCheckbox = document.getElementById("toggleCheckbox");
    const body = document.body;
    const images = document.querySelectorAll(".info-icon");
    const footerLogo = document.querySelector(".footerlogo");

    //  Función para cambiar imágenes según el tema
    function changeImages(mode) {
        images.forEach(img => {
            const lightSrc = img.getAttribute("data-light");
            const darkSrc = img.getAttribute("data-dark");

            if (mode === "dark" && darkSrc) {
                img.src = darkSrc;
            } else if (lightSrc) {
                img.src = lightSrc;
            }
        });

        if (footerLogo) {
            const footerLight = footerLogo.getAttribute("data-light");
            const footerDark = footerLogo.getAttribute("data-dark");

            footerLogo.src = mode === "dark" ? footerDark : footerLight;
        }
    }

    //  Cargar preferencia del usuario o detectar el sistema
    const savedTheme = localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    document.documentElement.setAttribute("data-theme", savedTheme);
    body.classList.toggle("dark-mode", savedTheme === "dark");
    toggleCheckbox.checked = savedTheme === "dark";
    changeImages(savedTheme); // Llamar a la función al cargar

    //  Evento para cambiar el tema
    toggleCheckbox.addEventListener("change", () => {
        const newTheme = toggleCheckbox.checked ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        body.classList.toggle("dark-mode", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
        changeImages(newTheme); // Llamar a la función al cambiar
    });

    //  Activar lazy-loading en imágenes
    document.querySelectorAll("img").forEach(img => {
        img.loading = "lazy";
    });


    // --- Carrusel ---
    const carousel = document.getElementById('heroCarousel');

    //Comprobación de que existe el carrusel:
    if (carousel) {
        const images = carousel.querySelectorAll('.hero-image');
        let currentImageIndex = 0;
        const intervalTime = 5000; // 5 segundos por imagen
        let intervalId; // Declaramos la variable fuera de la función

        function showNextImage() {
            // Oculta la imagen actual 
            if (images[currentImageIndex]) {
                images[currentImageIndex].classList.remove('active');
            }

            // Calcula el índice de la siguiente imagen
            currentImageIndex = (currentImageIndex + 1) % images.length;

            // Muestra la siguiente imagen
            if (images[currentImageIndex]) {
                images[currentImageIndex].classList.add('active');
            }
        }

        // --- Inicialización ---
        function startCarousel() {
            // Muestra la primera imagen al cargar la página
            if (images.length > 0) {
                images[0].classList.add('active'); // La primera imagen es visible al inicio.
            }
            //Arranca el loop
            intervalId = setInterval(showNextImage, intervalTime);
        }

        // Inicia el carrusel
        startCarousel();

        // --- Pausar y reanudar al hacer hover (opcional) ---
        carousel.addEventListener('mouseenter', () => {
            clearInterval(intervalId);
        });
        carousel.addEventListener('mouseleave', () => {
            intervalId = setInterval(showNextImage, intervalTime); 
        });
    }
});