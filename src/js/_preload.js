// preloader.js
export function initPreloader() {

    const preloader = document.querySelector('.preloader');
    const bar = document.querySelector('.preloader__bar');
    const percentDisplay = document.querySelector('.preloader__percent');

    window.addEventListener('DOMContentLoaded', () => {
        const visibleImages = [...document.images].filter(img => {
            const rect = img.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        });

        const total = visibleImages.length + 1; // +1 for fonts
        let loaded = 0;

        const updateProgress = () => {
            loaded++;
            const percent = Math.round((loaded / total) * 100);
            bar.value = percent;
            preloader.setAttribute('data-value', percent);

            if (loaded === total) {
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }, 400);
            }
        };

        visibleImages.forEach(img => {
            const image = new Image();
            image.onload = image.onerror = updateProgress;
            image.src = img.src;
        });

        if (document.fonts) {
            document.fonts.ready.then(updateProgress);
        } else {
            updateProgress(); // fallback
        }
    });
}