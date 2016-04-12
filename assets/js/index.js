$(window).load(function() {
    var sliderOptions = {
        mode: 'fade',
        speed: 350,
        controls: false,
        pagerCustom: '#project_thumbs'
    }
    $('.project-slider').bxSlider(sliderOptions);
});

$(document).ready(function() {
    var $body = $('body');
    var $side_nav = $('#side_nav');
    var $menu_button = $('#menu_button');
    var $logo = $('#logo');
    var $content = $('#content_container');
    $side_nav.mouseover(function(e) {
        $body.addClass('nav-in');
    });
    $side_nav.mouseout(function(e) {
        $body.removeClass('nav-in');
    });
    $menu_button.click(function() {
        $body.toggleClass('nav-open');
        $menu_button.blur();
    });
    $logo.click(function() {
        if (!$body.hasClass('nav-in')) {
            $body.addClass('nav-in');
            return false;
        }
    });
    $content.click(function() {
        $body.removeClass('nav-in');
    });
});
