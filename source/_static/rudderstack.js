!(function () {
  "use strict";
  window.RudderSnippetVersion = "3.0.14";
  var e = "rudderanalytics";
  window[e] || (window[e] = []);
  var rudderanalytics = window[e];
  if (Array.isArray(rudderanalytics)) {
    if (
      true === rudderanalytics.snippetExecuted &&
      window.console &&
      console.error
    ) {
      console.error(
        "RudderStack JavaScript SDK snippet included more than once."
      );
    } else {
      (rudderanalytics.snippetExecuted = true),
        (window.rudderAnalyticsBuildType = "legacy");
      var sdkBaseUrl = "https://cdn.rudderlabs.com/v3";
      var sdkName = "rsa.min.js";
      var scriptLoadingMode = "async";
      var t = [
        "setDefaultInstanceKey",
        "load",
        "ready",
        "page",
        "track",
        "identify",
        "alias",
        "group",
        "reset",
        "setAnonymousId",
        "startSession",
        "endSession",
        "consent",
      ];
      for (var r = 0; r < t.length; r++) {
        var n = t[r];
        rudderanalytics[n] = (function (t) {
          return function () {
            var r;
            Array.isArray(window[e])
              ? rudderanalytics.push(
                  [t].concat(Array.prototype.slice.call(arguments))
                )
              : null === (r = window[e][t]) ||
                void 0 === r ||
                r.apply(window[e], arguments);
          };
        })(n);
      }
      try {
        new Function('return import("")'),
          (window.rudderAnalyticsBuildType = "modern");
      } catch (a) {}
      var i = document.head || document.getElementsByTagName("head")[0];
      var d = document.body || document.getElementsByTagName("body")[0];
      (window.rudderAnalyticsAddScript = function (e, t, r) {
        var n = document.createElement("script");
        (n.src = e),
          n.setAttribute("data-loader", "RS_JS_SDK"),
          t && r && n.setAttribute(t, r),
          "async" === scriptLoadingMode
            ? (n.async = true)
            : "defer" === scriptLoadingMode && (n.defer = true),
          i ? i.insertBefore(n, i.firstChild) : d.insertBefore(n, d.firstChild);
      }),
        (window.rudderAnalyticsMount = function () {
          "undefined" == typeof globalThis &&
            (Object.defineProperty(Object.prototype, "__globalThis_magic__", {
              get: function get() {
                return this;
              },
              configurable: true,
            }),
            (__globalThis_magic__.globalThis = __globalThis_magic__),
            delete Object.prototype.__globalThis_magic__),
            window.rudderAnalyticsAddScript(
              ""
                .concat(sdkBaseUrl, "/")
                .concat(window.rudderAnalyticsBuildType, "/")
                .concat(sdkName),
              "data-rsa-write-key",
              "1rAOS5TDzgx9T39bG58kwN5ZUQz"
            );
        }),
        "undefined" == typeof Promise || "undefined" == typeof globalThis
          ? window.rudderAnalyticsAddScript(
              "https://polyfill-fastly.io/v3/polyfill.min.js?version=3.111.0&features=Symbol%2CPromise&callback=rudderAnalyticsMount"
            )
          : window.rudderAnalyticsMount();
      var loadOptions = {};
      rudderanalytics.load(
        "1rAOS5TDzgx9T39bG58kwN5ZUQz",
        "https://mailgun-dataplane.rudderstack.com",
        loadOptions
      );
      rudderanalytics.page();
    }
  }
})();
