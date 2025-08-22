import { onHashChange, triggerClickOnHashLink, initHashTag } from './_hash';
import { getBreakpointsObjectFromCss } from './_breakpoints';
import toggleNavBtn from './_toggle_nav_btn';
import {initPreloader} from "./_preloader";
initPreloader();
initHashTag();

let menuClicked = false;
let reactLoaded = false;

window.addEventListener('hashchange', function (event) {
    onHashChange()
    if (!menuClicked) { // if menu was not clicked, only history button clicked in browser
        triggerClickOnHashLink();
    }
    menuClicked = false;
});

const breakpointsObject = getBreakpointsObjectFromCss();
const breakpointMinLg = window.matchMedia(`(min-width: ${breakpointsObject.lg})`);

handleMinLg(breakpointMinLg);
breakpointMinLg.addEventListener('change', handleMinLg);

function handleMinLg (e) {
    if (e.matches) {
        const nav = document.querySelector('.b-nav');
        nav.classList.remove('b-nav--open');
        nav.classList.add('b-nav--close');
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const navToggle = new toggleNavBtn();
    navToggle.init();
});

const navLinks = document.querySelectorAll(".b-nav__link");

navLinks.forEach(link => {
    link.addEventListener("click", async function(e) {
        menuClicked = true;
        if (e.target.hash == "#skills" && !reactLoaded) {
            console.log("#skills");
            const { mountReact } = await import("../react/bootstrapReact.js");
            mountReact();
            reactLoaded = true;
        }
    });
});


/* add to accordion
 /* ---------------------------------------------------------------------- */

// $(function () {
//     $(".b-accordion .accordion-group").click(function () {
//             $(".accordion-group").removeClass("active");
//             $(this).addClass("active")
//         }
//     );
// });

