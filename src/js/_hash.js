// hash.js
export function onHashChange() {
    const currentHash = window.location.hash;
    const nav = document.querySelector('.b-nav');
    nav.classList.remove('b-nav--open');
    nav.classList.add('b-nav--close');
}

export function triggerClickOnHashLink() {
    const currentHash = window.location.hash;
    if (currentHash) {
        const link = document.querySelector(`a[href="${currentHash}"]`);
        if (link) {
            link.click();
        }
    }
}

export function initHashTag() {
    const defaultHash = '#home';
    const currentHash = window.location.hash || defaultHash;

    if (history.pushState) {
        history.pushState(null, null, currentHash);
    } else {
        window.location.hash = currentHash;
    }
    triggerClickOnHashLink();
}