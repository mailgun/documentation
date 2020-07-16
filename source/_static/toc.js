var TOC = {
    load: function () {
        $('#toc_button').click(TOC.toggle);
    },

    toggle: function () {
        if ($('#sphinxsidebar').toggle().is(':hidden')) {
            $('div.document').css('left', "0px");
            $('toc_button').removeClass("open");
        } else {
            $('div.document').css('left', "281px");
            $('#toc_button').addClass("open");
        }
        return $('#sphinxsidebar');
    }
};

$(function () {
    TOC.load();

    // make header fixed on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() >= $('#body').offset().top) {
            $('section.subnav').addClass('subnav-fixed');
            $('section.main').addClass('main-with-subnav');
        } else {
            $('section.subnav').removeClass('subnav-fixed');
            $('section.main').removeClass('main-with-subnav');
        }
    });
});

// monkey patch for text highlighting
highlightText_patched = jQuery.fn.highlightText;
jQuery.fn.highlightText = function () {
    highlightText_patched.apply(this, arguments);

    // go to highlighted text if found
    var highlighted_text = $('.document .highlighted')[0];
    if (highlighted_text) {
        var scrolling_pos = $(highlighted_text).offset().top - $('section.subnav').height() - 10;
        $(window).scrollTop(scrolling_pos);
    }
}

// Main nav dropdown for features
$(".js-dropdown-toggle").click(function(ev){
    var dropdown = $(this).siblings('.dropdown-menu');
    var dropdownToggle = $(this);
    dropdown.toggleClass('is-visible');
    // dropdown.toggle();
    ev.stopPropagation();
    return false;
});

// Hide dropdown if click outside
$('body').click(function() {
    $('.dropdown-menu').removeClass('is-visible');
});
$('.dropdown-menu').click(function(ev){
    ev.stopPropagation();
});

/* mobile menu active expands and closes */
$(".styled-hamburger").click(function() {
    $(".styled-lists").toggleClass("active");
});
  
/* toggle for mobile dropdown menus individually  */
$('a.styled-link.products').on('click', function(){
    $('ul.styled-submenu.products').toggleClass('collapse');
});

$('a.styled-link.deliverability-services').on('click', function(){
    $('ul.styled-submenu.deliverability-services').toggleClass('collapse');
});

$('a.styled-link.solutions').on('click', function(){
    $('ul.styled-submenu.solutions').toggleClass('collapse');
});

$('a.styled-link.docs').on('click', function(){
    $('ul.styled-submenu.docs').toggleClass('collapse');
});

/* adds and removes href property for main nav links based on mobile or not */
if(window.innerWidth <= 1023) {
    $('a.styled-link.sub').removeAttr("href");
} else {
    $('a.styled-link.sub').addAttr("href");
}