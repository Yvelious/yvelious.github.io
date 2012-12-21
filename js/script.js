
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

$(function() {

    // выбираем элемент #flowplanes и делаем из него скролл. используем плагины circular и navigator
    $(".b-page-wrap").scrollable({ circular: true, mousewheel: true,  vertical:true }).navigator({

        // для навигации используем #flowtabs
        navi: ".b-nav",

        // выбираем теги А внутри навигации для закладок (не прямые потомку)
        naviItem: 'li',

        // назначаем класс "current" для текущего тега А в навигаторе
        activeClass: 'active',

        // активируем кнопки назад/вперед браузера
        history: true

    });
});
