
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
