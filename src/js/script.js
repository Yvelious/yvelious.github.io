import Collapse from 'bootstrap/js/dist/collapse';
import { onHashChange, triggerClickOnHashLink, initHashTag } from './_hash';
import { getBreakpointsObjectFromCss } from './_breakpoints';
import toggleNavBtn from './_toggle_nav_btn'


initHashTag();
window.addEventListener('hashchange', onHashChange);
window.addEventListener('popstate', triggerClickOnHashLink);

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

/* add to accordion
 /* ---------------------------------------------------------------------- */

$(function () {
    $(".b-accordion .accordion-group").click(function () {
            $(".accordion-group").removeClass("active");
            $(this).addClass("active")
        }
    );
});

/* tabs
 /* ---------------------------------------------------------------------- */


$(function () {
    $('#myTab a:first').tab('show');
})


/* menu
 /* ---------------------------------------------------------------------- */


/* darkbox
 /* ---------------------------------------------------------------------- */

$(function () {
    $('a[data-darkbox=darkbox]').darkbox();
})


/* scrollable
 /* ---------------------------------------------------------------------- */

$(function ts() {

    var _page = $(window).width();

    if (_page > 768) {
        /*  $(".b-page-wrap").scrollable({ circular: false, mousewheel: false,  vertical:true }).navigator({
          navi: ".b-nav",
          naviItem: 'li',
          activeClass: '',
          history: true
          });*/
    } else {


        // Add smooth-scroll class to your links
        $('.b-header li a').on('click', function (e) {
            /* e.preventDefault();

             // Get href of link
             var scrollTarget = $(this).attr('href');

             // Get target position from top of the page
             var targetPosition = $(scrollTarget).offset().top;

             $('html,body').animate({scrollTop: targetPosition}, 300);
     */
        });

    }

});


/* bnt download CV top
 /* ---------------------------------------------------------------------- */


/* preloader
 /* ---------------------------------------------------------------------- */

$(document).ready(function () {
    $('body').jpreLoader(
        {
            loaderVPos: '0'


        }
    );

});