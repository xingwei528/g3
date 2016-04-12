$(function() {
        $(".lets-talk").click(function() {
            $('html, body').animate({
                scrollTop: $("#contact").offset().top
            }, 500);
        });
        // FOR GETTING GCLID COOKIE
        function readCookie(name) {
            var n = name + "=";
            var cookie = document.cookie.split(';');
            for (var i = 0; i < cookie.length; i++) {
                var c = cookie[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(n) == 0) {
                    return c.substring(n.length, c.length);
                }
            }
            return null;
        }
        var kqbh3zd0zn67wh;
        page_url = localStorage.getItem('LANDING_PAGE_URL');
        (function(d, t) {
            var s = d.createElement(t),
                options = {
                    'userName': 'tivix',
                    'formHash': 'kqbh3zd0zn67wh',
                    'autoResize': true,
                    'height': '697',
                    'async': true,
                    'host': 'wufoo.com',
                    'header': 'hide',
                    'ssl': false,
                    'defaultValues': 'field30=' + readCookie('gclid') + '&field34=' + page_url
                };
            s.src = ('https:' == d.location.protocol ? 'https://' : 'http://') + 'wufoo.com/scripts/embed/form.js';
            s.onload = s.onreadystatechange = function() {
                var rs = this.readyState;
                if (rs)
                    if (rs != 'complete')
                        if (rs != 'loaded') return;
                try {
                    kqbh3zd0zn67wh = new WufooForm();
                    kqbh3zd0zn67wh.initialize(options);
                    kqbh3zd0zn67wh.display();
                } catch (e) {}
            };
            var scr = d.getElementsByTagName(t)[0],
                par = scr.parentNode;
            par.insertBefore(s, scr);
        })(document, 'script');
    });
    