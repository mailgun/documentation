$(document).ready(function(){
    anchors = $('h2 a.headerlink, h3 a.headerlink');
    $(window).scroll($.debounce( 250, function(){
        var current_top = $(window).scrollTop();
        for(var i=anchors.length-1;i>=0;i--) {
            var anchor_top = $(anchors[i]).parent()[0].offsetTop;
            if (current_top > anchor_top - 200) {
              var href = $(anchors[i]).attr('href');
              if (window.history && window.history.replaceState) {
                  history.replaceState({},document.title,href)
              }
              $('.docs-sidebar li').removeClass('active');
              $('.docs-sidebar a[href="' + href + '"]').parent().addClass('active');
              break;
            }
        }
    }));
});