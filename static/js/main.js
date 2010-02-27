// Require based on the page

jQuery("document").ready(function ($) {

// Get delicious links
(function () {
    var links = $("#links");

    function li(o) {
        return '<li><a href="' + o.u + '">' + o.d + '</a>' + o.n + '</li>';
    }

    $.getJSON(
       "http://feeds.delicious.com/v2/json/nlsmith?count=25&callback=?",
        function (data) { links.html($.map(data, li).join("")); }
    );
})();

// Contact form validation
$("#contact form").validate();

});

// Google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-1765938-1']);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script');
    ga.src = ('https:' == document.location.protocol ?
        'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    ga.setAttribute('async', 'true');
    document.documentElement.firstChild.appendChild(ga);
})();
