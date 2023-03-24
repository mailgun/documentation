!(function () {
    var e = (window.rudderanalytics = window.rudderanalytics || []);
    (e.methods = [
      "load", 
      "page", 
      "track", 
      "identify", 
      "alias", 
      "group", 
      "ready", 
      "reset", 
      "getAnonymousId", 
      "setAnonymousId", 
      "getUserId", 
      "getUserTraits", 
      "getGroupId", 
      "getGroupTraits", 
      "startSession", 
      "endSession"
    ]),
        (e.factory = function (t) {
            return function () {
                e.push([t].concat(Array.prototype.slice.call(arguments)));
            };
        });
    for (var t = 0; t < e.methods.length; t++) {
        var r = e.methods[t];
        e[r] = e.factory(r);
    }
    (e.loadJS = function (e, t) {
        var r = document.createElement("script");
        (r.type = "text/javascript"), (r.async = !0), (r.src = "https://cdn.rudderlabs.com/v1.1/rudder-analytics.min.js");
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(r, a);
    }),
        e.loadJS(),
        e.load("1rAOS5TDzgx9T39bG58kwN5ZUQz", "https://mailgun-dataplane.rudderstack.com"),
        e.page();
})();