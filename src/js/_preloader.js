// preloader.js
export function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const bar = document.querySelector('.preloader__bar');
    const styleTag = document.getElementById('critical-css');
    const cssBgUrls = [];

    window.addEventListener('DOMContentLoaded', () => {
        const visibleImages = [...document.images].filter(img => {
            const rect = img.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        });

        if (styleTag?.sheet) {
            try {
                for (const rule of styleTag.sheet.cssRules) {
                    if (rule.type === CSSRule.STYLE_RULE) {
                        const bgImage = rule.style.backgroundImage;
                        if (bgImage && bgImage.includes('url(')) {
                            const match = bgImage.match(/url\(["']?(.*?)["']?\)/);
                            const url = match?.[1];
                            const selector = rule.selectorText;
                            if (url && selector) {
                                const elements = document.querySelectorAll(selector);
                                elements.forEach(el => {
                                    const rect = el.getBoundingClientRect();
                                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                                        cssBgUrls.push(url);
                                    }
                                });
                            }
                        }
                    }
                }
            } catch (e) {
                console.warn('Error:', e);
            }
        }

        const total = visibleImages.length + cssBgUrls.length + 1;

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

        cssBgUrls.forEach(url => {
            const bg = new Image();
            bg.onload = bg.onerror = updateProgress;
            bg.src = url;
        });

        if (document.fonts) {
            document.fonts.ready.then(updateProgress);
        } else {
            updateProgress(); // fallback
        }
    });
}
