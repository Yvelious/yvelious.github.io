
/* add to accordion
 /* ---------------------------------------------------------------------- */


$(function(){

    $(".b-accordion .accordion-group").click(function() {
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


$(function(){

    $(".b-nav .nav li").click(function(){
        $(".b-nav .nav li").removeClass("active");
        $(this).addClass("active");
    });

    $(".b-home-btn").click(function(){
        $(".b-nav .nav li").removeClass("active");

    });

})


/* darkbox
 /* ---------------------------------------------------------------------- */

    $(function(){
        $( 'a[data-darkbox=darkbox]' ).darkbox();
    })


/* scrollable
 /* ---------------------------------------------------------------------- */

$(function ts() {

    var _page =  $(window).width();

    if (_page > 768) {

            $(".b-page-wrap").scrollable({ circular: false, mousewheel: false,  vertical:true }).navigator({
            navi: ".b-nav",
            naviItem: 'li',
            activeClass: 'active',
            history: true

            });
    } else {


         // Add smooth-scroll class to your links
    $('.b-nav li a').on('click', function(e) {
        e.preventDefault();

        // Get href of link
        var scrollTarget = $(this).attr('href');

        // Get target position from top of the page
        var targetPosition = $(scrollTarget).offset().top;

        $('html,body').animate({scrollTop: targetPosition}, 300);

    });

    }

});




/* bnt download CV top 
 /* ---------------------------------------------------------------------- */

$(".navbar-toggle").click(function () {
$(".b-circle__links_cv_top").toggle();

});


/* preloader
 /* ---------------------------------------------------------------------- */

$(document).ready(function() {
        $('body').jpreLoader(
        {
        loaderVPos: '50%'


        }
            );

    });