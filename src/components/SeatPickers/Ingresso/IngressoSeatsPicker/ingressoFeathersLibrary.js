/*
  This is the ingresso Feathers, library, since it is only provided from a cdn,
  there might be a good way of ising this from their cdn instead and using dynamic imports
  this code is fetched fomr this url: https://storage.googleapis.com/ticketswitch/feather/0.4.3/feather.min.js
  documentation for its usage is here: https://github.com/ingresso-group/feather-demo
*/
/* eslint-disable */ 
export default function t() {
  var l = {
    initialised: !1,
    eventQueue: [],
    config: null,
    events: [
      "CHART_INITIALISED",
      "ADD_SEAT",
      "REMOVE_SEAT",
      "EMPTY_BASKET",
      "GO_TO_CHECKOUT",
      "NEW_AVAILABILITY_DATA",
      "UPDATE_CONCESSIONS",
      "NEW_SEND_METHODS_DATA",
      "NEW_LEGEND_COLORS",
      "RESERVE_STOPPED",
      "UPDATE_BASKET",
      "ERROR",
    ],
    preloaderContainer: null,
    iframe: null,
    customPreloader: null,
    defaultDomain: "https://test.ticketswitch.com",
  };
  function c(e) {
    return ("ON_" + e).toLowerCase().replace(/(\_\w)/g, function (e) {
      return e[1].toUpperCase();
    });
  }
  return (
    (l.init = function (e) {
      // eslint-disable-next-line no-unused-expressions
      (l.config = e),
        l.healthCheck() &&
          ((document.querySelector(l.config.selector).innerHTML = ""),
          l.addListener(),
          l.createPreloader(),
          l.createIFrame(),
          l.config.allowControlsOnSmallScreens &&
            l.addEventToQueue("ALLOW_CONTROLS_ON_SMALL_SCREENS"),
          l.config.chartBackgroundColor &&
            l.changeChartBackgroundColor(l.config.chartBackgroundColor),
          l.selectPerformance(l.config.perfID),
          l.config.hasCustomLegend && l.hasCustomLegend());
    }),
    (l.createPreloader = function () {
      if (
        ((l.preloaderContainer = document.createElement("div")),
        l.customPreloader)
      ) {
        document
          .querySelector(l.config.selector)
          .appendChild(l.preloaderContainer);
        var e = "<style>" + l.customPreloader.css + "</style>";
        l.preloaderContainer.innerHTML = e + l.customPreloader.html;
      } else {
        (l.preloaderContainer.className =
          "seating-plan-widget-preloader-container"),
          document
            .querySelector(l.config.selector)
            .appendChild(l.preloaderContainer);
        var n = document.createElement("style");
        (n.type = "text/css"),
          (n.innerText =
            ".seating-plan-widget-preloader-container{display: none; position:absolute;width:100%;height:100%;background-color:rgba(255,255,255,.5);user-select:none;top:0;left:0}.seating-plan-widget-preloader{width:300px;height:40px;text-align:center;font-size:10px;position:absolute;left:calc(50% - 150px);top:calc(50% - 30px)}.seating-plan-widget-preloader .rect{background-color:#333;height:100%;width:6px;display:inline-block;margin-right:3px;animation:ing-stretchdelay 1.2s infinite ease-in-out}.seating-plan-widget-preloader .rect2{animation-delay:-1.1s}.seating-plan-widget-preloader .rect3{animation-delay:-1s}.seating-plan-widget-preloader .rect4{animation-delay:-.9s}.seating-plan-widget-preloader .rect5{animation-delay:-.8s}@keyframes ing-stretchdelay{0%,100%,40%{transform:scaleY(.4)}20%{transform:scaleY(1)}}"),
          l.preloaderContainer.appendChild(n);
        var t = document.createElement("div");
        (t.className = "seating-plan-widget-preloader"),
          l.preloaderContainer.appendChild(t);
        var o = document.createElement("span");
        (o.className = "rect rect1 bg-color-1"), t.appendChild(o);
        var a = document.createElement("span");
        (a.className = "rect rect2 bg-color-1"), t.appendChild(a);
        var r = document.createElement("span");
        (r.className = "rect rect3 bg-color-1"), t.appendChild(r);
        var i = document.createElement("span");
        (i.className = "rect rect4 bg-color-1"), t.appendChild(i);
        var c = document.createElement("span");
        (c.className = "rect rect5 bg-color-1"), t.appendChild(c);
        var s = document.querySelectorAll(
          ".seating-plan-widget-preloader .rect"
        );
        s &&
          Array.isArray(s) &&
          s.forEach(function (e) {
            e.style.backgroundColor = l.config.preloaderColor;
          });
      }
    }),
    (l.hidePreloader = function () {
      l.preloaderContainer.style.display = "none";
    }),
    (l.showPreloader = function () {
      try {
        l.show(), (l.preloaderContainer.style.display = "block");
      } catch (e) {}
    }),
    (l.hide = function () {
      l.iframe.style.visibility = "hidden";
    }),
    (l.show = function () {
      l.iframe.style.visibility = "visible";
    }),
    (l.selectPerformance = function (e) {
      l.showPreloader(), l.addEventToQueue("SELECT_PERFORMANCE", e);
    }),
    (l.changeChartBackgroundColor = function (e) {
      l.addEventToQueue("CHANGE_CHART_BACKGROUND_COLOR", e);
    }),
    (l.hasCustomLegend = function () {
      l.addEventToQueue("HAS_CUSTOM_LEGEND");
    }),
    (l.setPreloader = function (e) {
      l.customPreloader = e;
    }),
    (l.zoomIn = function () {
      l.addEventToQueue("ZOOM_IN");
    }),
    (l.zoomOut = function () {
      l.addEventToQueue("ZOOM_OUT");
    }),
    (l.resetChart = function () {
      l.addEventToQueue("RESET_CHART");
    }),
    (l.hideControls = function () {
      l.addEventToQueue("HIDE_CONTROLS");
    }),
    (l.showControls = function () {
      l.addEventToQueue("SHOW_CONTROLS");
    }),
    (l.hideLegend = function () {
      l.addEventToQueue("HIDE_LEGEND");
    }),
    (l.showLegend = function () {
      l.addEventToQueue("SHOW_LEGEND");
    }),
    (l.reserve = function () {
      l.addEventToQueue("RESERVE");
    }),
    (l.release = function (e) {
      l.addEventToQueue("RELEASE", e);
    }),
    (l.changeColorScheme = function (e) {
      l.addEventToQueue("CHANGE_COLOR_SCHEME", e);
    }),
    (l.removeSeat = function (e) {
      l.addEventToQueue("REMOVE_SEAT", e);
    }),
    (l.emptyBasket = function () {
      l.addEventToQueue("EMPTY_BASKET");
    }),
    (l.disableScrollToZoom = function () {
      l.addEventToQueue("DISABLE_SCROLL_TO_ZOOM");
    }),
    (l.disableInitialToZoom = function () {
      l.addEventToQueue("DISABLE_INITIAL_ZOOM");
    }),
    (l.onChartInitialised = function () {
      (l.initialised = !0), l.sendEventsFromQueue();
    }),
    (l.selectSeats = function (e) {
      l.addEventToQueue("SELECT_SEATS", e);
    }),
    (l.setLegend = function (e) {
      l.addEventToQueue("SET_LEGEND", e);
    }),
    (l.selectSendMethod = function (e) {
      l.addEventToQueue("SELECT_SEND_METHOD", e);
    }),
    (l.selectConcession = function (e, n) {
      l.addEventToQueue("SELECT_CONCESSION", {
        seatUUID: e,
        concessionCode: n,
      });
    }),
    (l.addEventToQueue = function (e, n) {
      var t = { event: e, data: n };
      l.initialised ? l.sendEvent(t) : l.eventQueue.push(t);
    }),
    (l.sendEventsFromQueue = function () {
      var n = this;
      l.eventQueue.forEach(function (e) {
        n.sendEvent(e);
      });
    }),
    (l.sendEvent = function (e) {
      l.iframe &&
        l.iframe.contentWindow &&
        l.iframe.contentWindow.postMessage(JSON.stringify(e), "*");
    }),
    (l.healthCheck = function () {
      var t = !1,
        n = !1,
        o = this;
      if (
        (l.events.forEach(function (e) {
          var n = c(e);
          (o[n] && "function" == typeof o[n]) ||
            ((t = !0),
            o.config.silenceWarnings ||
              console.warn(
                "IngressoSeatingPlan: Method " +
                  n +
                  " has not been implemented."
              ));
        }),
        o.config.token ||
          ((t = !0),
          o.config.silenceWarnings ||
            console.warn(
              "IngressoSeatingPlan: configuration object is missing token. You won't be able to purchase."
            )),
        t &&
          (o.config.silenceWarnings ||
            console.warn(
              'IngressoSeatingPlan: You can initialise the widget with the flag "silenceWarnings" set to true to suppress these warnings.'
            )),
        o.config.eventID ||
          ((n = !0),
          console.error(
            "IngressoSeatingPlan: configuration object is missing eventID."
          )),
        o.config.selector)
      )
        try {
          document.querySelector(o.config.selector) ||
            ((n = !0),
            console.error(
              "IngressoSeatingPlan: the selector for the iframe container provided in the configuration object doesn't point to a real DOM element."
            ));
        } catch (e) {
          (n = !0),
            console.error(
              "IngressoSeatingPlan: the selector for the iframe container provided in the configuration object doesn't point to a real DOM element."
            );
        }
      else
        (n = !0),
          console.error(
            "IngressoSeatingPlan: configuration object is missing a selector for the iframe container."
          );
      return (
        n &&
          console.error(
            "IngressoSeatingPlan: You must fix the errors above in order to use the widget."
          ),
        (t || n) &&
          (o.config.silenceWarnings ||
            console.info(
              "You can read about this and more in the documentation at https://github.com/ingresso-group/feather-demo."
            )),
        !n
      );
    }),
    (l.addListener = function () {
      var i = this;
      window.addEventListener(
        "message",
        function (e) {
          e.message;
          var n = {},
            t = !0;
          try {
            n = JSON.parse(e.data);
          } catch (e) {
            t = !1;
          }
          if (t) {
            var o = n.event;
            n.data || (n.data = {});
            var a = n.data;
            if (((a.eventName = o), -1 !== i.events.indexOf(o))) {
              var r = c(o);
              i[r] && "function" == typeof i[r] && i[r](a),
                i.onEvent && "function" == typeof i.onEvent && i.onEvent(a);
            }
            ("NEW_AVAILABILITY_DATA" !== o && "GO_TO_CHECKOUT" !== o) ||
              i.hidePreloader(),
              ("ERROR" !== o && "HIDE_PRELOADER" !== o) ||
                (i.hide(), l.hidePreloader());
          }
        },
        !1
      );
    }),
    (l.createIFrame = function (e) {
      e || (e = 1);
      var n = (l.config.domain || l.defaultDomain) + "/book",
        t = "/" + l.config.eventID + "-event-name",
        o = "/?is_embedded=1";
      "eventReviews" == l.config.mode && (o += "&mode=reviews"),
        l.config.availabilityURL &&
          (o += "&availability_url=" + l.config.availabilityURL),
        l.config.token && (o += "&token=" + l.config.token),
        (o += "&ab_test__choose-num-tickets=not_shown"),
        (l.iframeSource = n + t + o);
      var a = document.querySelector(l.config.selector);
      (a.style.position = "relative"),
        document.querySelector(l.config.selector + " iframe") ||
          (l.iframe = document.createElement("iframe")),
        (l.iframeLoaded = !1),
        (l.iframe.onload = function () {
          l.iframeLoaded = !0;
        }),
        (l.iframe.style.border = "1px solid #ddd"),
        (l.iframe.style.outline = "0"),
        (l.iframe.style.height = "100%"),
        (l.iframe.style.width = "100%"),
        (l.iframe.style.margin = "0 !important"),
        (l.iframe.style.boxSizing = "border-box"),
        (l.iframe.style.margin = "auto"),
        l.iframe.setAttribute("src", l.iframeSource),
        l.iframe.setAttribute("class", "seating-plan");
      var r = a.querySelector("iframe");
      r && r.remove(), a.appendChild(l.iframe), l.showPreloader();
    }),
    l
  );
}
