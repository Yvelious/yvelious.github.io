// javascript
// src/js/_preloader.js

export let preloader = null;
export let bar = null;

let total = 1;
let loaded = 0;
let reactLoaded = false;

function getPreloaderEl() {
    return preloader || document.querySelector('.preloader');
}

function getBarEl() {
    return bar || document.querySelector('.preloader__bar');
}

function updateProgress() {
    loaded++;
    const percent = Math.round((loaded / total) * 100);

    const progress = getBarEl();
    if (progress) progress.value = percent;
    const el = getPreloaderEl();
    if (el) el.setAttribute('data-value', percent);

    if (loaded === total) {
        setTimeout(() => {
            if (el) el.style.opacity = '0';
            setTimeout(() => {
                if (el) el.style.display = 'none';
            }, 500);
        }, 400);
    }
}

export function resetPreloader() {
    const el = getPreloaderEl();
    if (!el) return;

    el.removeAttribute('style');
    el.dataset.value = "0";

    const progress = el.querySelector('progress');
    if (progress) progress.value = 0;
}

export function preloaderReactLoaded(localTotal = 1) {
    if (!reactLoaded) {
        resetPreloader();
        loaded = 0;
        total = localTotal;
        updateProgress();
        if (total === 1) {
            reactLoaded = true;
        }
    }
}

export function initPreloader() {
    document.addEventListener('DOMContentLoaded', () => {
        preloader = document.querySelector('.preloader');
        bar = document.querySelector('.preloader__bar');
        const styleTag = document.getElementById('critical-css');
        const cssBgUrls = [];

        //
        const visibleImages = [...document.images].filter(img => {
            const rect = img.getBoundingClientRect();

            return rect.top < window.innerHeight && rect.bottom > 0;
        });

        if (styleTag?.sheet) {
            try {
                const processRule = (rule) => {
                    if (rule.type === 1) { // STYLE_RULE
                        const bgImage = rule.style?.backgroundImage;
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
                    // Check if the rule contains embedded rules (like @layer, @media etc.)
                    else if (rule.cssRules) {
                        // Рекурсивно обрабатываем все вложенные правила
                        Array.from(rule.cssRules).forEach(processRule);
                    }
                };

                Array.from(styleTag.sheet.cssRules).forEach(processRule);
            } catch (e) {
                console.warn('Error while reading critical-css rules:', e);
            }
        }

        total = visibleImages.length + cssBgUrls.length + 1;
        loaded = 0;
        reactLoaded = false;

        visibleImages.forEach(img => {
            if (img.complete) {
                updateProgress();
            } else {
                img.addEventListener('load', updateProgress, { once: true });
                img.addEventListener('error', updateProgress, { once: true });
            }
        });

        cssBgUrls.forEach(url => {
            const bg = new Image();
            const onLoad = () => {
                updateProgress();
                bg.onload = bg.onerror = null;
            };
            if (bg.complete) {
                updateProgress();
            } else {
                bg.onload = onLoad;
                bg.onerror = onLoad;
                bg.src = url;
            }
        });

        if (document.fonts) {
            document.fonts.ready.then(updateProgress);
        } else {
            updateProgress(); // fallback
        }
    });
}