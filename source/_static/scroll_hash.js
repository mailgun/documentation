$(document).ready(function(){
    anchors = $('h2 a.headerlink, h3 a.headerlink');
    $(document).scroll(function(e) {
        var current_top = $(window).scrollTop();
        for(var i=anchors.length-1;i>=0;i--) {
            var anchor_top = $(anchors[i]).parent()[0].offsetTop;
            if (current_top > anchor_top - 200) {
              var href = $(anchors[i]).attr('href');
              if (window.history && window.history.replaceState) {
                  history.replaceState({},document.title,href)
              }
              $('.docs-sidebar ul li ul li a').css('font-weight', 'normal');
              $('.docs-sidebar ul li ul li a[href="' + href + '"]').css('font-weight', 'bold');
              break;
            }
        }
    });
});