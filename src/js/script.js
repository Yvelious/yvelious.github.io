import Collapse from 'bootstrap/js/dist/collapse';









function getBreakpointsObjectFromCss() {
    const breakpoints = getComputedStyle(document.body, ':before').getPropertyValue('content').replace(/\"/g, '').trim();
    const breakpointsArray = breakpoints.split(', ').map(item => item.split(': '));
    return Object.fromEntries(breakpointsArray);
}

const breakpointsObject = getBreakpointsObjectFromCss();
const breakpointMinLg = window.matchMedia(`(min-width: ${breakpointsObject.lg})`);

const toggleNav = () => {
    const nav = document.querySelector(".b-nav");
    nav.classList.toggle("b-nav--close");
    nav.classList.toggle("b-nav--open");
};
const toggleButton = document.querySelector(".navbar-toggle");
toggleButton.addEventListener("click", toggleNav);

function onHashChange() {
    // Получаем текущий хэштэг
    const currentHash = window.location.hash;
    // if (!currentHash) {
    //     window.location.hash = "#home";
    // }
    const nav = document.querySelector('.b-nav');
    nav.classList.remove('b-nav--open');
    nav.classList.add('b-nav--close');


    console.log(3333);
}

// Добавляем обработчик события hashchange
window.addEventListener('hashchange', onHashChange);

// Вызываем функцию сразу, чтобы обработать текущий хэштэг при загрузке страницы
onHashChange();

function triggerClickOnHashLink() {
    const currentHash = window.location.hash;
    if (currentHash) {
        const link = document.querySelector(`a[href="${currentHash}"]`);
        if (link) {
            link.click();
        }
    }
}

window.addEventListener('popstate', triggerClickOnHashLink);

// Пример использования history.pushState
function addHashTag(hash) {
    if (history.pushState) {
        history.pushState(null, null, '#' + hash);
        triggerClickOnHashLink();
    } else {
        window.location.hash = hash;
    }
}

// Пример вызова функции
addHashTag('home');
function handleMinLg (e) {
    if(e.matches) {

        if (e.matches) {
            const nav = document.querySelector('.b-nav');
            nav.classList.remove('b-nav--open');
            nav.classList.add('b-nav--close');

            console.log(111);

        }
    } else {




        // document.querySelectorAll(".b-nav__link").forEach(link => {
        //     link.addEventListener("click", () => {
        //         const navToggle = document.querySelector(".navbar-toggle");
        //         navToggle.click();
        //     });
        // });
    }
}

handleMinLg(breakpointMinLg);
breakpointMinLg.addEventListener('change', handleMinLg);

/* add to accordion
 /* ---------------------------------------------------------------------- */


$(function () {



    $(".b-accordion .accordion-group").click(function () {
            $(".accordion-group").removeClass("active");
            $(this).addClass("active")
        }
    );
})
;


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