
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

    $(".nav li").click(function(){
        $(".nav li").removeClass("active");
        $(this).addClass("active");
    });

    $(".b-home-btn").click(function(){
        $(".nav li").removeClass("active");

    });

})