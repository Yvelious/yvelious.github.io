import { onHashChange, triggerClickOnHashLink, initHashTag } from './_hash';
import { getBreakpointsObjectFromCss } from './_breakpoints';
import { preloaderReactLoaded } from './_preloader';
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


    const navLinks = document.querySelectorAll(".b-nav__link");

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            menuClicked = true; // set the flag when a menu link is clicked
        });
    });

    const accordionButtons = document.querySelectorAll('#skills-section .b-switcher__btn');

    accordionButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            if (btn.disabled) {
                e.stopImmediatePropagation();
                e.preventDefault();
                return;
            }
            accordionButtons.forEach(item => {
                item.disabled = false;
            })
            btn.disabled = true; // disable the clicked button
        });
    });
});

//create min-height for skills section to avoid layout shift on switcher btn click
const skillsSection =  document.querySelector('#skills-section');
const skillsSectionHeight= skillsSection.offsetHeight;
skillsSection.style.minHeight = `${skillsSectionHeight}px`;






const graphBtn = document.querySelector('.b-graph-btn');
graphBtn.addEventListener('click', async () => {
    if (!reactLoaded) {
        preloaderReactLoaded(4); //25%
        const {mountReact} = await import( '../react/bootstrapReact.js');
        preloaderReactLoaded(3); // 33%
        await mountReact();
        preloaderReactLoaded(2); // 50%
        reactLoaded = true
    }
})


/* add to accordion
 /* ---------------------------------------------------------------------- */

// $(function () {
//     $(".b-accordion .accordion-group").click(function () {
//             $(".accordion-group").removeClass("active");
//             $(this).addClass("active")
//         }
//     );
// });

