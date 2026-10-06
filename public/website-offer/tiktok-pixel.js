// TikTok Pixel base code supplied by TikTok Events Manager for Waslivo.
!function (w, d, t) {
  w.TiktokAnalyticsObject = t;
  var ttq = w[t] = w[t] || [];
  ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
  ttq.setAndDefer = function (queue, method) {
    queue[method] = function () { queue.push([method].concat(Array.prototype.slice.call(arguments, 0))); };
  };
  for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
  ttq.instance = function (id) {
    for (var queue = ttq._i[id] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(queue, ttq.methods[n]);
    return queue;
  };
  ttq.load = function (id, options) {
    var url = "https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i = ttq._i || {};
    ttq._i[id] = [];
    ttq._i[id]._u = url;
    ttq._t = ttq._t || {};
    ttq._t[id] = +new Date();
    ttq._o = ttq._o || {};
    ttq._o[id] = options || {};
    var script = d.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = url + "?sdkid=" + id + "&lib=" + t;
    var firstScript = d.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  };
  ttq.load('DB2LQLRC77U04C8M43E0');
  ttq.page();
}(window, document, 'ttq');
