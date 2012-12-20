
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
    $('#myTab a:last').tab('show');
    })


