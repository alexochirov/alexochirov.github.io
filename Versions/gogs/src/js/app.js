;
$(document).foundation();

/**
 * Detect Element Resize Plugin for jQuery
 *
 * https://github.com/sdecima/javascript-detect-element-resize
 * Sebastian Decima
 *
 * version: 0.5.3
 **/

(function($) {
  var attachEvent = document.attachEvent,
    stylesCreated = false;

  var jQuery_resize = $.fn.resize;

  $.fn.resize = function(callback) {
    return this.each(function() {
      if (this == window)
        jQuery_resize.call(jQuery(this), callback);
      else
        addResizeListener(this, callback);
    });
  }

  $.fn.removeResize = function(callback) {
    return this.each(function() {
      removeResizeListener(this, callback);
    });
  }

  if (!attachEvent) {
    var requestFrame = (function() {
      var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
        function(fn) {
          return window.setTimeout(fn, 20);
        };
      return function(fn) {
        return raf(fn);
      };
    })();

    var cancelFrame = (function() {
      var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
        window.clearTimeout;
      return function(id) {
        return cancel(id);
      };
    })();

    function resetTriggers(element) {
      var triggers = element.__resizeTriggers__,
        expand = triggers.firstElementChild,
        contract = triggers.lastElementChild,
        expandChild = expand.firstElementChild;
      contract.scrollLeft = contract.scrollWidth;
      contract.scrollTop = contract.scrollHeight;
      expandChild.style.width = expand.offsetWidth + 1 + 'px';
      expandChild.style.height = expand.offsetHeight + 1 + 'px';
      expand.scrollLeft = expand.scrollWidth;
      expand.scrollTop = expand.scrollHeight;
    };

    function checkTriggers(element) {
      return element.offsetWidth != element.__resizeLast__.width ||
        element.offsetHeight != element.__resizeLast__.height;
    }

    function scrollListener(e) {
      var element = this;
      resetTriggers(this);
      if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
      this.__resizeRAF__ = requestFrame(function() {
        if (checkTriggers(element)) {
          element.__resizeLast__.width = element.offsetWidth;
          element.__resizeLast__.height = element.offsetHeight;
          element.__resizeListeners__.forEach(function(fn) {
            fn.call(element, e);
          });
        }
      });
    };

    /* Detect CSS Animations support to detect element display/re-attach */
    var animation = false,
      animationstring = 'animation',
      keyframeprefix = '',
      animationstartevent = 'animationstart',
      domPrefixes = 'Webkit Moz O ms'.split(' '),
      startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
      pfx = ''; {
      var elm = document.createElement('fakeelement');
      if (elm.style.animationName !== undefined) {
        animation = true;
      }

      if (animation === false) {
        for (var i = 0; i < domPrefixes.length; i++) {
          if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
            pfx = domPrefixes[i];
            animationstring = pfx + 'Animation';
            keyframeprefix = '-' + pfx.toLowerCase() + '-';
            animationstartevent = startEvents[i];
            animation = true;
            break;
          }
        }
      }
    }

    var animationName = 'resizeanim';
    var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
    var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
  }

  function createStyles() {
    if (!stylesCreated) {
      //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
      var css = (animationKeyframes ? animationKeyframes : '') +
        '.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' +
        '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

      style.type = 'text/css';
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }

      head.appendChild(style);
      stylesCreated = true;
    }
  }

  window.addResizeListener = function(element, fn) {
    if (attachEvent) element.attachEvent('onresize', fn);
    else {
      if (!element.__resizeTriggers__) {
        if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
        createStyles();
        element.__resizeLast__ = {};
        element.__resizeListeners__ = [];
        (element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
        element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' +
          '<div class="contract-trigger"></div>';
        element.appendChild(element.__resizeTriggers__);
        resetTriggers(element);
        element.addEventListener('scroll', scrollListener, true);

        /* Listen for a css animation to detect element display/re-attach */
        animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function(e) {
          if (e.animationName == animationName)
            resetTriggers(element);
        });
      }
      element.__resizeListeners__.push(fn);
    }
  };

  window.removeResizeListener = function(element, fn) {
    if (attachEvent) element.detachEvent('onresize', fn);
    else {
      element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
      if (!element.__resizeListeners__.length) {
        element.removeEventListener('scroll', scrollListener);
        element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
      }
    }
  }
}(jQuery));


/*! waitForImages jQuery Plugin 2017-02-20 */
! function(a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function(a) {
  var b = "waitForImages",
    c = function(a) {
      return a.srcset && a.sizes
    }(new Image);
  a.waitForImages = {
    hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"],
    hasImageAttributes: ["srcset"]
  }, a.expr[":"]["has-src"] = function(b) {
    return a(b).is('img[src][src!=""]')
  }, a.expr[":"].uncached = function(b) {
    return !!a(b).is(":has-src") && !b.complete
  }, a.fn.waitForImages = function() {
    var d, e, f, g = 0,
      h = 0,
      i = a.Deferred(),
      j = this,
      k = [],
      l = a.waitForImages.hasImageProperties || [],
      m = a.waitForImages.hasImageAttributes || [],
      n = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
    if (a.isPlainObject(arguments[0]) ? (f = arguments[0].waitForAll, e = arguments[0].each, d = arguments[0].finished) : 1 === arguments.length && "boolean" === a.type(arguments[0]) ? f = arguments[0] : (d = arguments[0], e = arguments[1], f = arguments[2]), d = d || a.noop, e = e || a.noop, f = !!f, !a.isFunction(d) || !a.isFunction(e)) throw new TypeError("An invalid callback was supplied.");
    return this.each(function() {
      var b = a(this);
      f ? b.find("*").addBack().each(function() {
        var b = a(this);
        b.is("img:has-src") && !b.is("[srcset]") && k.push({
          src: b.attr("src"),
          element: b[0]
        }), a.each(l, function(a, c) {
          var d, e = b.css(c);
          if (!e) return !0;
          for (; d = n.exec(e);) k.push({
            src: d[2],
            element: b[0]
          })
        }), a.each(m, function(a, c) {
          var d = b.attr(c);
          return !d || void k.push({
            src: b.attr("src"),
            srcset: b.attr("srcset"),
            element: b[0]
          })
        })
      }) : b.find("img:has-src").each(function() {
        k.push({
          src: this.src,
          element: this
        })
      })
    }), g = k.length, h = 0, 0 === g && (d.call(j), i.resolveWith(j)), a.each(k, function(f, k) {
      var l = new Image,
        m = "load." + b + " error." + b;
      a(l).one(m, function b(c) {
        var f = [h, g, "load" == c.type];
        if (h++, e.apply(k.element, f), i.notifyWith(k.element, f), a(this).off(m, b), h == g) return d.call(j[0]), i.resolveWith(j[0]), !1
      }), c && k.srcset && (l.srcset = k.srcset, l.sizes = k.sizes), l.src = k.src
    }), i.promise()
  }
});



/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-MessageChannel-adownload-ambientlight-animation-apng-appearance-applicationcache-arrow-atobbtoa-audio-audioloop-audiopreload-backdropfilter-backgroundblendmode-backgroundcliptext-backgroundsize-batteryapi-bdi-beacon-bgpositionshorthand-bgpositionxy-bgrepeatspace_bgrepeatround-bgsizecover-blobconstructor-bloburls-blobworkers-borderimage-borderradius-boxshadow-boxsizing-canvas-canvasblending-canvastext-canvaswinding-capture-checked-classlist-contains-contenteditable-contextmenu-cookies-cors-createelementattrs_createelement_attrs-cryptography-cssall-cssanimations-csscalc-csschunit-csscolumns-cssescape-cssexunit-cssfilters-cssgradients-cssgrid_cssgridlegacy-csshyphens_softhyphens_softhyphensfind-cssinvalid-cssmask-csspointerevents-csspositionsticky-csspseudoanimations-csspseudotransitions-cssreflections-cssremunit-cssresize-cssscrollbar-csstransforms-csstransforms3d-csstransformslevel2-csstransitions-cssvalid-cssvhunit-cssvmaxunit-cssvminunit-cssvwunit-cubicbezierrange-customelements-customevent-customprotocolhandler-dart-datachannel-datalistelem-dataset-datauri-dataview-dataworkers-details-devicemotion_deviceorientation-directory-display_runin-displaytable-documentfragment-ellipsis-emoji-es5-es5array-es5date-es5function-es5object-es5string-es5syntax-es5undefined-es6array-es6collections-es6math-es6number-es6object-es6string-eventlistener-eventsource-exiforientation-fetch-fileinput-filereader-filesystem-flash-flexbox-flexboxlegacy-flexboxtweener-flexwrap-fontface-forcetouch-formattribute-formvalidation-framed-fullscreen-gamepads-generatedcontent-generators-geolocation-getrandomvalues-getusermedia-hairline-hashchange-hidden-hiddenscroll-history-hovermq-hsla-htmlimports-ie8compat-imgcrossorigin-indexeddb-indexeddbblob-inlinesvg-input-inputformaction-inputformenctype-inputformmethod-inputformtarget-inputtypes-intl-jpeg2000-jpegxr-json-lastchild-ligatures-localizednumber-localstorage-lowbandwidth-lowbattery-matchmedia-mathml-mediaqueries-microdata-multiplebgs-mutationobserver-notification-nthchild-objectfit-olreversed-oninput-opacity-outputelem-overflowscrolling-pagevisibility-passiveeventlisteners-peerconnection-performance-picture-placeholder-pointerevents-pointerlock-pointermq-postmessage-preserve3d-progressbar_meter-promises-proximity-queryselector-quotamanagement-regions-requestanimationframe-requestautocomplete-rgba-ruby-sandbox-scriptasync-scriptdefer-scrollsnappoints-seamless-search-serviceworker-sessionstorage-shapes-sharedworkers-siblinggeneral-sizes-smil-speechrecognition-speechsynthesis-srcdoc-srcset-strictmode-stylescoped-subpixelfont-supports-svg-svgasimg-svgclippaths-svgfilters-svgforeignobject-target-template-templatestrings-textalignlast-textareamaxlength-textshadow-texttrackapi_track-time-todataurljpeg_todataurlpng_todataurlwebp-touchevents-transferables-typedarrays-unicode-unicoderange-unknownelements-urlparser-urlsearchparams-userdata-userselect-vibrate-video-videoautoplay-videocrossorigin-videoloop-videopreload-vml-webaudio-webgl-webglextensions-webintents-webp-webpalpha-webpanimation-webplossless_webp_lossless-websockets-websocketsbinary-websqldatabase-webworkers-willchange-wrapflow-xdomainrequest-xhr2-xhrresponsetype-xhrresponsetypearraybuffer-xhrresponsetypeblob-xhrresponsetypedocument-xhrresponsetypejson-xhrresponsetypetext-addtest-atrule-domprefixes-hasevent-mq-prefixed-prefixedcss-prefixedcssvalue-prefixes-setclasses-shiv-testallprops-testprop-teststyles !*/
! function(window, document, undefined) {
  function is(A, e) {
    return typeof A === e
  }

  function testRunner() {
    var A, e, t, r, n, o, i;
    for (var d in tests)
      if (tests.hasOwnProperty(d)) {
        if (A = [], e = tests[d], e.name && (A.push(e.name.toLowerCase()), e.options && e.options.aliases && e.options.aliases.length))
          for (t = 0; t < e.options.aliases.length; t++) A.push(e.options.aliases[t].toLowerCase());
        for (r = is(e.fn, "function") ? e.fn() : e.fn, n = 0; n < A.length; n++) o = A[n], i = o.split("."), 1 === i.length ? Modernizr[i[0]] = r : (!Modernizr[i[0]] || Modernizr[i[0]] instanceof Boolean || (Modernizr[i[0]] = new Boolean(Modernizr[i[0]])), Modernizr[i[0]][i[1]] = r), classes.push((r ? "" : "no-") + i.join("-"))
      }
  }

  function setClasses(A) {
    var e = docElement.className,
      t = Modernizr._config.classPrefix || "";
    if (isSVG && (e = e.baseVal), Modernizr._config.enableJSClass) {
      var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
      e = e.replace(r, "$1" + t + "js$2")
    }
    Modernizr._config.enableClasses && (e += " " + t + A.join(" " + t), isSVG ? docElement.className.baseVal = e : docElement.className = e)
  }

  function addTest(A, e) {
    if ("object" == typeof A)
      for (var t in A) hasOwnProp(A, t) && addTest(t, A[t]);
    else {
      A = A.toLowerCase();
      var r = A.split("."),
        n = Modernizr[r[0]];
      if (2 == r.length && (n = n[r[1]]), "undefined" != typeof n) return Modernizr;
      e = "function" == typeof e ? e() : e, 1 == r.length ? Modernizr[r[0]] = e : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = e), setClasses([(e && 0 != e ? "" : "no-") + r.join("-")]), Modernizr._trigger(A, e)
    }
    return Modernizr
  }

  function createElement() {
    return "function" != typeof document.createElement ? document.createElement(arguments[0]) : isSVG ? document.createElementNS.call(document, "http://www.w3.org/2000/svg", arguments[0]) : document.createElement.apply(document, arguments)
  }

  function cssToDOM(A) {
    return A.replace(/([a-z])-([a-z])/g, function(A, e, t) {
      return e + t.toUpperCase()
    }).replace(/^-/, "")
  }

  function domToCSS(A) {
    return A.replace(/([A-Z])/g, function(A, e) {
      return "-" + e.toLowerCase()
    }).replace(/^ms-/, "-ms-")
  }

  function getBody() {
    var A = document.body;
    return A || (A = createElement(isSVG ? "svg" : "body"), A.fake = !0), A
  }

  function injectElementWithStyles(A, e, t, r) {
    var n, o, i, d, a = "modernizr",
      s = createElement("div"),
      l = getBody();
    if (parseInt(t, 10))
      for (; t--;) i = createElement("div"), i.id = r ? r[t] : a + (t + 1), s.appendChild(i);
    return n = createElement("style"), n.type = "text/css", n.id = "s" + a, (l.fake ? l : s).appendChild(n), l.appendChild(s), n.styleSheet ? n.styleSheet.cssText = A : n.appendChild(document.createTextNode(A)), s.id = a, l.fake && (l.style.background = "", l.style.overflow = "hidden", d = docElement.style.overflow, docElement.style.overflow = "hidden", docElement.appendChild(l)), o = e(s, A), l.fake ? (l.parentNode.removeChild(l), docElement.style.overflow = d, docElement.offsetHeight) : s.parentNode.removeChild(s), !!o
  }

  function contains(A, e) {
    return !!~("" + A).indexOf(e)
  }

  function computedStyle(A, e, t) {
    var r;
    if ("getComputedStyle" in window) {
      r = getComputedStyle.call(window, A, e);
      var n = window.console;
      if (null !== r) t && (r = r.getPropertyValue(t));
      else if (n) {
        var o = n.error ? "error" : "log";
        n[o].call(n, "getComputedStyle returning null, its possible modernizr test results are inaccurate")
      }
    } else r = !e && A.currentStyle && A.currentStyle[t];
    return r
  }

  function roundedEquals(A, e) {
    return A - 1 === e || A === e || A + 1 === e
  }

  function nativeTestProps(A, e) {
    var t = A.length;
    if ("CSS" in window && "supports" in window.CSS) {
      for (; t--;)
        if (window.CSS.supports(domToCSS(A[t]), e)) return !0;
      return !1
    }
    if ("CSSSupportsRule" in window) {
      for (var r = []; t--;) r.push("(" + domToCSS(A[t]) + ":" + e + ")");
      return r = r.join(" or "), injectElementWithStyles("@supports (" + r + ") { #modernizr { position: absolute; } }", function(A) {
        return "absolute" == computedStyle(A, null, "position")
      })
    }
    return undefined
  }

  function testProps(A, e, t, r) {
    function n() {
      i && (delete mStyle.style, delete mStyle.modElem)
    }
    if (r = is(r, "undefined") ? !1 : r, !is(t, "undefined")) {
      var o = nativeTestProps(A, t);
      if (!is(o, "undefined")) return o
    }
    for (var i, d, a, s, l, c = ["modernizr", "tspan", "samp"]; !mStyle.style && c.length;) i = !0, mStyle.modElem = createElement(c.shift()), mStyle.style = mStyle.modElem.style;
    for (a = A.length, d = 0; a > d; d++)
      if (s = A[d], l = mStyle.style[s], contains(s, "-") && (s = cssToDOM(s)), mStyle.style[s] !== undefined) {
        if (r || is(t, "undefined")) return n(), "pfx" == e ? s : !0;
        try {
          mStyle.style[s] = t
        } catch (u) {}
        if (mStyle.style[s] != l) return n(), "pfx" == e ? s : !0
      }
    return n(), !1
  }

  function fnBind(A, e) {
    return function() {
      return A.apply(e, arguments)
    }
  }

  function testDOMProps(A, e, t) {
    var r;
    for (var n in A)
      if (A[n] in e) return t === !1 ? A[n] : (r = e[A[n]], is(r, "function") ? fnBind(r, t || e) : r);
    return !1
  }

  function testPropsAll(A, e, t, r, n) {
    var o = A.charAt(0).toUpperCase() + A.slice(1),
      i = (A + " " + cssomPrefixes.join(o + " ") + o).split(" ");
    return is(e, "string") || is(e, "undefined") ? testProps(i, e, r, n) : (i = (A + " " + domPrefixes.join(o + " ") + o).split(" "), testDOMProps(i, e, t))
  }

  function detectDeleteDatabase(A, e) {
    var t = A.deleteDatabase(e);
    t.onsuccess = function() {
      addTest("indexeddb.deletedatabase", !0)
    }, t.onerror = function() {
      addTest("indexeddb.deletedatabase", !1)
    }
  }

  function testAllProps(A, e, t) {
    return testPropsAll(A, undefined, undefined, e, t)
  }
  var classes = [],
    tests = [],
    ModernizrProto = {
      _version: "3.5.0",
      _config: {
        classPrefix: "",
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0
      },
      _q: [],
      on: function(A, e) {
        var t = this;
        setTimeout(function() {
          e(t[A])
        }, 0)
      },
      addTest: function(A, e, t) {
        tests.push({
          name: A,
          fn: e,
          options: t
        })
      },
      addAsyncTest: function(A) {
        tests.push({
          name: null,
          fn: A
        })
      }
    },
    Modernizr = function() {};
  Modernizr.prototype = ModernizrProto, Modernizr = new Modernizr, Modernizr.addTest("applicationcache", "applicationCache" in window), Modernizr.addTest("blobconstructor", function() {
    try {
      return !!new Blob
    } catch (A) {
      return !1
    }
  }, {
    aliases: ["blob-constructor"]
  }), Modernizr.addTest("cookies", function() {
    try {
      document.cookie = "cookietest=1";
      var A = -1 != document.cookie.indexOf("cookietest=");
      return document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT", A
    } catch (e) {
      return !1
    }
  }), Modernizr.addTest("cors", "XMLHttpRequest" in window && "withCredentials" in new XMLHttpRequest), Modernizr.addTest("customelements", "customElements" in window), Modernizr.addTest("customprotocolhandler", function() {
    if (!navigator.registerProtocolHandler) return !1;
    try {
      navigator.registerProtocolHandler("thisShouldFail")
    } catch (A) {
      return A instanceof TypeError
    }
    return !1
  }), Modernizr.addTest("customevent", "CustomEvent" in window && "function" == typeof window.CustomEvent), Modernizr.addTest("dataview", "undefined" != typeof DataView && "getFloat64" in DataView.prototype), Modernizr.addTest("eventlistener", "addEventListener" in window), Modernizr.addTest("geolocation", "geolocation" in navigator), Modernizr.addTest("history", function() {
    var A = navigator.userAgent;
    return -1 === A.indexOf("Android 2.") && -1 === A.indexOf("Android 4.0") || -1 === A.indexOf("Mobile Safari") || -1 !== A.indexOf("Chrome") || -1 !== A.indexOf("Windows Phone") || "file:" === location.protocol ? window.history && "pushState" in window.history : !1
  }), Modernizr.addTest("ie8compat", !window.addEventListener && !!document.documentMode && 7 === document.documentMode), Modernizr.addTest("json", "JSON" in window && "parse" in JSON && "stringify" in JSON), Modernizr.addTest("messagechannel", "MessageChannel" in window), Modernizr.addTest("notification", function() {
    if (!window.Notification || !window.Notification.requestPermission) return !1;
    if ("granted" === window.Notification.permission) return !0;
    try {
      new window.Notification("")
    } catch (A) {
      if ("TypeError" === A.name) return !1
    }
    return !0
  }), Modernizr.addTest("postmessage", "postMessage" in window), Modernizr.addTest("queryselector", "querySelector" in document && "querySelectorAll" in document), Modernizr.addTest("serviceworker", "serviceWorker" in navigator), Modernizr.addTest("svg", !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect), Modernizr.addTest("templatestrings", function() {
    var supports;
    try {
      eval("``"), supports = !0
    } catch (e) {}
    return !!supports
  }), Modernizr.addTest("typedarrays", "ArrayBuffer" in window);
  var supports = !1;
  try {
    supports = "WebSocket" in window && 2 === window.WebSocket.CLOSING
  } catch (e) {}
  Modernizr.addTest("websockets", supports), Modernizr.addTest("xdomainrequest", "XDomainRequest" in window), Modernizr.addTest("webaudio", function() {
    var A = "webkitAudioContext" in window,
      e = "AudioContext" in window;
    return Modernizr._config.usePrefixes ? A || e : e
  });
  var CSS = window.CSS;
  Modernizr.addTest("cssescape", CSS ? "function" == typeof CSS.escape : !1);
  var newSyntax = "CSS" in window && "supports" in window.CSS,
    oldSyntax = "supportsCSS" in window;
  Modernizr.addTest("supports", newSyntax || oldSyntax), Modernizr.addTest("target", function() {
    var A = window.document;
    if (!("querySelectorAll" in A)) return !1;
    try {
      return A.querySelectorAll(":target"), !0
    } catch (e) {
      return !1
    }
  }), Modernizr.addTest("microdata", "getItems" in document), Modernizr.addTest("mutationobserver", !!window.MutationObserver || !!window.WebKitMutationObserver), Modernizr.addTest("passiveeventlisteners", function() {
    var A = !1;
    try {
      var e = Object.defineProperty({}, "passive", {
        get: function() {
          A = !0
        }
      });
      window.addEventListener("test", null, e)
    } catch (t) {}
    return A
  }), Modernizr.addTest("picture", "HTMLPictureElement" in window), Modernizr.addTest("es5array", function() {
    return !!(Array.prototype && Array.prototype.every && Array.prototype.filter && Array.prototype.forEach && Array.prototype.indexOf && Array.prototype.lastIndexOf && Array.prototype.map && Array.prototype.some && Array.prototype.reduce && Array.prototype.reduceRight && Array.isArray)
  }), Modernizr.addTest("es5date", function() {
    var A = "2013-04-12T06:06:37.307Z",
      e = !1;
    try {
      e = !!Date.parse(A)
    } catch (t) {}
    return !!(Date.now && Date.prototype && Date.prototype.toISOString && Date.prototype.toJSON && e)
  }), Modernizr.addTest("es5function", function() {
    return !(!Function.prototype || !Function.prototype.bind)
  }), Modernizr.addTest("es5object", function() {
    return !!(Object.keys && Object.create && Object.getPrototypeOf && Object.getOwnPropertyNames && Object.isSealed && Object.isFrozen && Object.isExtensible && Object.getOwnPropertyDescriptor && Object.defineProperty && Object.defineProperties && Object.seal && Object.freeze && Object.preventExtensions)
  }), Modernizr.addTest("strictmode", function() {
    "use strict";
    return !this
  }()), Modernizr.addTest("es5string", function() {
    return !(!String.prototype || !String.prototype.trim)
  }), Modernizr.addTest("es5syntax", function() {
    var value, obj, stringAccess, getter, setter, reservedWords, zeroWidthChars;
    try {
      return stringAccess = eval('"foobar"[3] === "b"'), getter = eval("({ get x(){ return 1 } }).x === 1"), eval("({ set x(v){ value = v; } }).x = 1"), setter = 1 === value, eval("obj = ({ if: 1 })"), reservedWords = 1 === obj["if"], zeroWidthChars = eval("_‌‍ = true"), stringAccess && getter && setter && reservedWords && zeroWidthChars
    } catch (ignore) {
      return !1
    }
  }), Modernizr.addTest("es5undefined", function() {
    var A, e;
    try {
      e = window.undefined, window.undefined = 12345, A = "undefined" == typeof window.undefined, window.undefined = e
    } catch (t) {
      return !1
    }
    return A
  }), Modernizr.addTest("es5", function() {
    return !!(Modernizr.es5array && Modernizr.es5date && Modernizr.es5function && Modernizr.es5object && Modernizr.strictmode && Modernizr.es5string && Modernizr.json && Modernizr.es5syntax && Modernizr.es5undefined)
  }), Modernizr.addTest("es6array", !!(Array.prototype && Array.prototype.copyWithin && Array.prototype.fill && Array.prototype.find && Array.prototype.findIndex && Array.prototype.keys && Array.prototype.entries && Array.prototype.values && Array.from && Array.of)), Modernizr.addTest("arrow", function() {
    try {
      eval("()=>{}")
    } catch (e) {
      return !1
    }
    return !0
  }), Modernizr.addTest("es6collections", !!(window.Map && window.Set && window.WeakMap && window.WeakSet)), Modernizr.addTest("generators", function() {
    try {
      new Function("function* test() {}")()
    } catch (A) {
      return !1
    }
    return !0
  }), Modernizr.addTest("es6math", !!(Math && Math.clz32 && Math.cbrt && Math.imul && Math.sign && Math.log10 && Math.log2 && Math.log1p && Math.expm1 && Math.cosh && Math.sinh && Math.tanh && Math.acosh && Math.asinh && Math.atanh && Math.hypot && Math.trunc && Math.fround)), Modernizr.addTest("es6number", !!(Number.isFinite && Number.isInteger && Number.isSafeInteger && Number.isNaN && Number.parseInt && Number.parseFloat && Number.isInteger(Number.MAX_SAFE_INTEGER) && Number.isInteger(Number.MIN_SAFE_INTEGER) && Number.isFinite(Number.EPSILON))), Modernizr.addTest("es6object", !!(Object.assign && Object.is && Object.setPrototypeOf)), Modernizr.addTest("promises", function() {
    return "Promise" in window && "resolve" in window.Promise && "reject" in window.Promise && "all" in window.Promise && "race" in window.Promise && function() {
      var A;
      return new window.Promise(function(e) {
        A = e
      }), "function" == typeof A
    }()
  }), Modernizr.addTest("es6string", !!(String.fromCodePoint && String.raw && String.prototype.codePointAt && String.prototype.repeat && String.prototype.startsWith && String.prototype.endsWith && String.prototype.includes)), Modernizr.addTest("devicemotion", "DeviceMotionEvent" in window), Modernizr.addTest("deviceorientation", "DeviceOrientationEvent" in window), Modernizr.addTest("filereader", !!(window.File && window.FileList && window.FileReader)), Modernizr.addTest("beacon", "sendBeacon" in navigator), Modernizr.addTest("lowbandwidth", function() {
    var A = navigator.connection || {
      type: 0
    };
    return 3 == A.type || 4 == A.type || /^[23]g$/.test(A.type)
  }), Modernizr.addTest("eventsource", "EventSource" in window), Modernizr.addTest("fetch", "fetch" in window), Modernizr.addTest("xhrresponsetype", function() {
    if ("undefined" == typeof XMLHttpRequest) return !1;
    var A = new XMLHttpRequest;
    return A.open("get", "/", !0), "response" in A
  }()), Modernizr.addTest("xhr2", "XMLHttpRequest" in window && "withCredentials" in new XMLHttpRequest), Modernizr.addTest("speechsynthesis", "SpeechSynthesisUtterance" in window), Modernizr.addTest("localstorage", function() {
    var A = "modernizr";
    try {
      return localStorage.setItem(A, A), localStorage.removeItem(A), !0
    } catch (e) {
      return !1
    }
  }), Modernizr.addTest("sessionstorage", function() {
    var A = "modernizr";
    try {
      return sessionStorage.setItem(A, A), sessionStorage.removeItem(A), !0
    } catch (e) {
      return !1
    }
  }), Modernizr.addTest("websqldatabase", "openDatabase" in window), Modernizr.addTest("svgfilters", function() {
    var A = !1;
    try {
      A = "SVGFEColorMatrixElement" in window && 2 == SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE
    } catch (e) {}
    return A
  }), Modernizr.addTest("urlparser", function() {
    var A;
    try {
      return A = new URL("http://modernizr.com/"), "http://modernizr.com/" === A.href
    } catch (e) {
      return !1
    }
  }), Modernizr.addTest("urlsearchparams", "URLSearchParams" in window), Modernizr.addTest("websocketsbinary", function() {
    var A, e = "https:" == location.protocol ? "wss" : "ws";
    if ("WebSocket" in window) {
      if (A = "binaryType" in WebSocket.prototype) return A;
      try {
        return !!new WebSocket(e + "://.").binaryType
      } catch (t) {}
    }
    return !1
  }), Modernizr.addTest("atobbtoa", "atob" in window && "btoa" in window, {
    aliases: ["atob-btoa"]
  }), Modernizr.addTest("framed", window.location != top.location), Modernizr.addTest("sharedworkers", "SharedWorker" in window), Modernizr.addTest("webworkers", "Worker" in window);
  var prefixes = ModernizrProto._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
  ModernizrProto._prefixes = prefixes, Modernizr.addTest("contains", is(String.prototype.contains, "function"));
  var docElement = document.documentElement;
  Modernizr.addTest("contextmenu", "contextMenu" in docElement && "HTMLMenuItemElement" in window), Modernizr.addTest("cssall", "all" in docElement.style), Modernizr.addTest("willchange", "willChange" in docElement.style), Modernizr.addTest("classlist", "classList" in docElement), Modernizr.addTest("documentfragment", function() {
    return "createDocumentFragment" in document && "appendChild" in docElement
  });
  var isSVG = "svg" === docElement.nodeName.toLowerCase(),
    html5;
  isSVG || ! function(A, e) {
    function t(A, e) {
      var t = A.createElement("p"),
        r = A.getElementsByTagName("head")[0] || A.documentElement;
      return t.innerHTML = "x<style>" + e + "</style>", r.insertBefore(t.lastChild, r.firstChild)
    }

    function r() {
      var A = h.elements;
      return "string" == typeof A ? A.split(" ") : A
    }

    function n(A, e) {
      var t = h.elements;
      "string" != typeof t && (t = t.join(" ")), "string" != typeof A && (A = A.join(" ")), h.elements = t + " " + A, s(e)
    }

    function o(A) {
      var e = E[A[f]];
      return e || (e = {}, g++, A[f] = g, E[g] = e), e
    }

    function i(A, t, r) {
      if (t || (t = e), c) return t.createElement(A);
      r || (r = o(t));
      var n;
      return n = r.cache[A] ? r.cache[A].cloneNode() : m.test(A) ? (r.cache[A] = r.createElem(A)).cloneNode() : r.createElem(A), !n.canHaveChildren || w.test(A) || n.tagUrn ? n : r.frag.appendChild(n)
    }

    function d(A, t) {
      if (A || (A = e), c) return A.createDocumentFragment();
      t = t || o(A);
      for (var n = t.frag.cloneNode(), i = 0, d = r(), a = d.length; a > i; i++) n.createElement(d[i]);
      return n
    }

    function a(A, e) {
      e.cache || (e.cache = {}, e.createElem = A.createElement, e.createFrag = A.createDocumentFragment, e.frag = e.createFrag()), A.createElement = function(t) {
        return h.shivMethods ? i(t, A, e) : e.createElem(t)
      }, A.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/[\w\-:]+/g, function(A) {
        return e.createElem(A), e.frag.createElement(A), 'c("' + A + '")'
      }) + ");return n}")(h, e.frag)
    }

    function s(A) {
      A || (A = e);
      var r = o(A);
      return !h.shivCSS || l || r.hasCSS || (r.hasCSS = !!t(A, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), c || a(A, r), A
    }
    var l, c, u = "3.7.3",
      p = A.html5 || {},
      w = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
      m = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
      f = "_html5shiv",
      g = 0,
      E = {};
    ! function() {
      try {
        var A = e.createElement("a");
        A.innerHTML = "<xyz></xyz>", l = "hidden" in A, c = 1 == A.childNodes.length || function() {
          e.createElement("a");
          var A = e.createDocumentFragment();
          return "undefined" == typeof A.cloneNode || "undefined" == typeof A.createDocumentFragment || "undefined" == typeof A.createElement
        }()
      } catch (t) {
        l = !0, c = !0
      }
    }();
    var h = {
      elements: p.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
      version: u,
      shivCSS: p.shivCSS !== !1,
      supportsUnknownElements: c,
      shivMethods: p.shivMethods !== !1,
      type: "default",
      shivDocument: s,
      createElement: i,
      createDocumentFragment: d,
      addElements: n
    };
    A.html5 = h, s(e), "object" == typeof module && module.exports && (module.exports = h)
  }("undefined" != typeof window ? window : this, document);
  var omPrefixes = "Moz O ms Webkit",
    domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(" ") : [];
  ModernizrProto._domPrefixes = domPrefixes;
  var hasOwnProp;
  ! function() {
    var A = {}.hasOwnProperty;
    hasOwnProp = is(A, "undefined") || is(A.call, "undefined") ? function(A, e) {
      return e in A && is(A.constructor.prototype[e], "undefined")
    } : function(e, t) {
      return A.call(e, t)
    }
  }(), ModernizrProto._l = {}, ModernizrProto.on = function(A, e) {
    this._l[A] || (this._l[A] = []), this._l[A].push(e), Modernizr.hasOwnProperty(A) && setTimeout(function() {
      Modernizr._trigger(A, Modernizr[A])
    }, 0)
  }, ModernizrProto._trigger = function(A, e) {
    if (this._l[A]) {
      var t = this._l[A];
      setTimeout(function() {
        var A, r;
        for (A = 0; A < t.length; A++)(r = t[A])(e)
      }, 0), delete this._l[A]
    }
  }, Modernizr._q.push(function() {
    ModernizrProto.addTest = addTest
  }), Modernizr.addAsyncTest(function() {
    var A = new Image;
    A.onerror = function() {
      addTest("exiforientation", !1, {
        aliases: ["exif-orientation"]
      })
    }, A.onload = function() {
      addTest("exiforientation", 2 !== A.width, {
        aliases: ["exif-orientation"]
      })
    }, A.src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAASUkqAAgAAAABABIBAwABAAAABgASAAAAAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+/iiiigD/2Q=="
  }), Modernizr.addAsyncTest(function() {
    function A() {
      clearTimeout(e), window.removeEventListener("deviceproximity", A), addTest("proximity", !0)
    }
    var e, t = 300;
    "ondeviceproximity" in window && "onuserproximity" in window ? (window.addEventListener("deviceproximity", A), e = setTimeout(function() {
      window.removeEventListener("deviceproximity", A), addTest("proximity", !1)
    }, t)) : addTest("proximity", !1)
  }), Modernizr.addAsyncTest(function() {
    var A = new Image;
    A.onload = A.onerror = function() {
      addTest("jpeg2000", 1 == A.width)
    }, A.src = "data:image/jp2;base64,/0//UQAyAAAAAAABAAAAAgAAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAEBwEBBwEBBwEBBwEB/1IADAAAAAEAAAQEAAH/XAAEQED/ZAAlAAFDcmVhdGVkIGJ5IE9wZW5KUEVHIHZlcnNpb24gMi4wLjD/kAAKAAAAAABYAAH/UwAJAQAABAQAAf9dAAUBQED/UwAJAgAABAQAAf9dAAUCQED/UwAJAwAABAQAAf9dAAUDQED/k8+kEAGvz6QQAa/PpBABr994EAk//9k="
  }), Modernizr.addAsyncTest(function() {
    var A = new Image;
    A.onload = A.onerror = function() {
      addTest("jpegxr", 1 == A.width, {
        aliases: ["jpeg-xr"]
      })
    }, A.src = "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA=="
  }), Modernizr.addAsyncTest(function() {
    var A = new Image;
    A.onerror = function() {
      addTest("webpalpha", !1, {
        aliases: ["webp-alpha"]
      })
    }, A.onload = function() {
      addTest("webpalpha", 1 == A.width, {
        aliases: ["webp-alpha"]
      })
    }, A.src = "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="
  }), Modernizr.addAsyncTest(function() {
    var A = new Image;
    A.onerror = function() {
      addTest("webpanimation", !1, {
        aliases: ["webp-animation"]
      })
    }, A.onload = function() {
      addTest("webpanimation", 1 == A.width, {
        aliases: ["webp-animation"]
      })
    }, A.src = "data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
  }), Modernizr.addAsyncTest(function() {
    var A = new Image;
    A.onerror = function() {
      addTest("webplossless", !1, {
        aliases: ["webp-lossless"]
      })
    }, A.onload = function() {
      addTest("webplossless", 1 == A.width, {
        aliases: ["webp-lossless"]
      })
    }, A.src = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
  }), Modernizr.addAsyncTest(function() {
    function A(A, e, t) {
      function r(e) {
        var r = e && "load" === e.type ? 1 == n.width : !1,
          o = "webp" === A;
        addTest(A, o && r ? new Boolean(r) : r), t && t(e)
      }
      var n = new Image;
      n.onerror = r, n.onload = r, n.src = e
    }
    var e = [{
        uri: "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",
        name: "webp"
      }, {
        uri: "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",
        name: "webp.alpha"
      }, {
        uri: "data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
        name: "webp.animation"
      }, {
        uri: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",
        name: "webp.lossless"
      }],
      t = e.shift();
    A(t.name, t.uri, function(t) {
      if (t && "load" === t.type)
        for (var r = 0; r < e.length; r++) A(e[r].name, e[r].uri)
    })
  }), Modernizr.addTest("svgasimg", document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")), Modernizr.addAsyncTest(function() {
    function A() {
      var A = new Image;
      A.onerror = function() {
        addTest("datauri", !0), Modernizr.datauri = new Boolean(!0), Modernizr.datauri.over32kb = !1
      }, A.onload = function() {
        addTest("datauri", !0), Modernizr.datauri = new Boolean(!0), Modernizr.datauri.over32kb = 1 == A.width && 1 == A.height
      };
      for (var e = "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="; e.length < 33e3;) e = "\r\n" + e;
      A.src = "data:image/gif;base64," + e
    } - 1 !== navigator.userAgent.indexOf("MSIE 7.") && setTimeout(function() {
      addTest("datauri", !1)
    }, 10);
    var e = new Image;
    e.onerror = function() {
      addTest("datauri", !1)
    }, e.onload = function() {
      1 == e.width && 1 == e.height ? A() : addTest("datauri", !1)
    }, e.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
  }), Modernizr.addAsyncTest(function() {
    function A() {
      addTest("blobworkers", !1), e()
    }

    function e() {
      d && r.revokeObjectURL(d), i && i.terminate(), a && clearTimeout(a)
    }
    try {
      var t = window.BlobBuilder,
        r = window.URL;
      Modernizr._config.usePrefix && (t = t || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder || window.OBlobBuilder, r = r || window.MozURL || window.webkitURL || window.MSURL || window.OURL);
      var n, o, i, d, a, s = "Modernizr",
        l = "this.onmessage=function(e){postMessage(e.data)}";
      try {
        n = new Blob([l], {
          type: "text/javascript"
        })
      } catch (c) {}
      n || (o = new t, o.append(l), n = o.getBlob()), d = r.createObjectURL(n), i = new Worker(d), i.onmessage = function(A) {
        addTest("blobworkers", s === A.data), e()
      }, i.onerror = A, a = setTimeout(A, 200), i.postMessage(s)
    } catch (c) {
      A()
    }
  }), Modernizr.addAsyncTest(function() {
    try {
      var A = "Modernizr",
        e = new Worker("data:text/javascript;base64,dGhpcy5vbm1lc3NhZ2U9ZnVuY3Rpb24oZSl7cG9zdE1lc3NhZ2UoZS5kYXRhKX0=");
      e.onmessage = function(t) {
        e.terminate(), addTest("dataworkers", A === t.data), e = null
      }, e.onerror = function() {
        addTest("dataworkers", !1), e = null
      }, setTimeout(function() {
        addTest("dataworkers", !1)
      }, 200), e.postMessage(A)
    } catch (t) {
      setTimeout(function() {
        addTest("dataworkers", !1)
      }, 0)
    }
  });
  var cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(" ") : [];
  ModernizrProto._cssomPrefixes = cssomPrefixes;
  var atRule = function(A) {
    var e, t = prefixes.length,
      r = window.CSSRule;
    if ("undefined" == typeof r) return undefined;
    if (!A) return !1;
    if (A = A.replace(/^@/, ""), e = A.replace(/-/g, "_").toUpperCase() + "_RULE", e in r) return "@" + A;
    for (var n = 0; t > n; n++) {
      var o = prefixes[n],
        i = o.toUpperCase() + "_" + e;
      if (i in r) return "@-" + o.toLowerCase() + "-" + A
    }
    return !1
  };
  ModernizrProto.atRule = atRule;
  var hasEvent = function() {
    function A(A, t) {
      var r;
      return A ? (t && "string" != typeof t || (t = createElement(t || "div")), A = "on" + A, r = A in t, !r && e && (t.setAttribute || (t = createElement("div")), t.setAttribute(A, ""), r = "function" == typeof t[A], t[A] !== undefined && (t[A] = undefined), t.removeAttribute(A)), r) : !1
    }
    var e = !("onblur" in document.documentElement);
    return A
  }();
  ModernizrProto.hasEvent = hasEvent, Modernizr.addTest("ambientlight", hasEvent("devicelight", window)), Modernizr.addTest("hashchange", function() {
    return hasEvent("hashchange", window) === !1 ? !1 : document.documentMode === undefined || document.documentMode > 7
  }), Modernizr.addTest("inputsearchevent", hasEvent("search")), Modernizr.addTest("pointerevents", function() {
    var A = !1,
      e = domPrefixes.length;
    for (A = Modernizr.hasEvent("pointerdown"); e-- && !A;) hasEvent(domPrefixes[e] + "pointerdown") && (A = !0);
    return A
  });
  var prefixedCSSValue = function(A, e) {
    var t = !1,
      r = createElement("div"),
      n = r.style;
    if (A in n) {
      var o = domPrefixes.length;
      for (n[A] = e, t = n[A]; o-- && !t;) n[A] = "-" + domPrefixes[o] + "-" + e, t = n[A]
    }
    return "" === t && (t = !1), t
  };
  ModernizrProto.prefixedCSSValue = prefixedCSSValue, Modernizr.addTest("audio", function() {
    var A = createElement("audio"),
      e = !1;
    try {
      e = !!A.canPlayType, e && (e = new Boolean(e), e.ogg = A.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), e.mp3 = A.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ""), e.opus = A.canPlayType('audio/ogg; codecs="opus"') || A.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, ""), e.wav = A.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), e.m4a = (A.canPlayType("audio/x-m4a;") || A.canPlayType("audio/aac;")).replace(/^no$/, ""))
    } catch (t) {}
    return e
  }), Modernizr.addTest("canvas", function() {
    var A = createElement("canvas");
    return !(!A.getContext || !A.getContext("2d"))
  }), Modernizr.addTest("canvastext", function() {
    return Modernizr.canvas === !1 ? !1 : "function" == typeof createElement("canvas").getContext("2d").fillText
  }), Modernizr.addTest("contenteditable", function() {
    if ("contentEditable" in docElement) {
      var A = createElement("div");
      return A.contentEditable = !0, "true" === A.contentEditable
    }
  }), Modernizr.addTest("emoji", function() {
    if (!Modernizr.canvastext) return !1;
    var A = window.devicePixelRatio || 1,
      e = 12 * A,
      t = createElement("canvas"),
      r = t.getContext("2d");
    return r.fillStyle = "#f00", r.textBaseline = "top", r.font = "32px Arial", r.fillText("🐨", 0, 0), 0 !== r.getImageData(e, e, 1, 1).data[0]
  }), addTest("htmlimports", "import" in createElement("link")), Modernizr.addTest("olreversed", "reversed" in createElement("ol")), Modernizr.addTest("userdata", !!createElement("div").addBehavior), Modernizr.addTest("video", function() {
    var A = createElement("video"),
      e = !1;
    try {
      e = !!A.canPlayType, e && (e = new Boolean(e), e.ogg = A.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), e.h264 = A.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), e.webm = A.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), e.vp9 = A.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), e.hls = A.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""))
    } catch (t) {}
    return e
  }), Modernizr.addTest("vml", function() {
    var A, e = createElement("div"),
      t = !1;
    return isSVG || (e.innerHTML = '<v:shape id="vml_flag1" adj="1" />', A = e.firstChild, "style" in A && (A.style.behavior = "url(#default#VML)"), t = A ? "object" == typeof A.adj : !0), t
  }), Modernizr.addTest("webanimations", "animate" in createElement("div")), Modernizr.addTest("webgl", function() {
    var A = createElement("canvas"),
      e = "probablySupportsContext" in A ? "probablySupportsContext" : "supportsContext";
    return e in A ? A[e]("webgl") || A[e]("experimental-webgl") : "WebGLRenderingContext" in window
  }), Modernizr.addTest("adownload", !window.externalHost && "download" in createElement("a")), Modernizr.addTest("audioloop", "loop" in createElement("audio")), Modernizr.addAsyncTest(function() {
    function A(t) {
      clearTimeout(e);
      var n = t !== undefined && "loadeddata" === t.type ? !0 : !1;
      r.removeEventListener("loadeddata", A, !1), addTest("audiopreload", n), r.parentNode.removeChild(r)
    }
    var e, t = 300,
      r = createElement("audio"),
      n = r.style;
    if (!(Modernizr.audio && "preload" in r)) return void addTest("audiopreload", !1);
    n.position = "absolute", n.height = 0, n.width = 0;
    try {
      if (Modernizr.audio.mp3) r.src = "data:audio/mpeg;base64,//MUxAAB6AXgAAAAAPP+c6nf//yi/6f3//MUxAMAAAIAAAjEcH//0fTX6C9Lf//0//MUxA4BeAIAAAAAAKX2/6zv//+IlR4f//MUxBMCMAH8AAAAABYWalVMQU1FMy45//MUxBUB0AH0AAAAADkuM1VVVVVVVVVV//MUxBgBUATowAAAAFVVVVVVVVVVVVVV";
      else if (Modernizr.audio.m4a) r.src = "data:audio/x-m4a;base64,AAAAGGZ0eXBNNEEgAAACAGlzb21pc28yAAAACGZyZWUAAAAfbWRhdN4EAABsaWJmYWFjIDEuMjgAAAFoAQBHAAACiG1vb3YAAABsbXZoZAAAAAB8JbCAfCWwgAAAA+gAAAAYAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAG0dHJhawAAAFx0a2hkAAAAD3wlsIB8JbCAAAAAAQAAAAAAAAAYAAAAAAAAAAAAAAAAAQAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAABUG1kaWEAAAAgbWRoZAAAAAB8JbCAfCWwgAAArEQAAAQAVcQAAAAAAC1oZGxyAAAAAAAAAABzb3VuAAAAAAAAAAAAAAAAU291bmRIYW5kbGVyAAAAAPttaW5mAAAAEHNtaGQAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAL9zdGJsAAAAW3N0c2QAAAAAAAAAAQAAAEttcDRhAAAAAAAAAAEAAAAAAAAAAAACABAAAAAArEQAAAAAACdlc2RzAAAAAAMZAAEABBFAFQAAAAABftAAAAAABQISCAYBAgAAABhzdHRzAAAAAAAAAAEAAAABAAAEAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAAXAAAAAQAAABRzdGNvAAAAAAAAAAEAAAAoAAAAYHVkdGEAAABYbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAraWxzdAAAACOpdG9vAAAAG2RhdGEAAAABAAAAAExhdmY1Mi42NC4y";
      else if (Modernizr.audio.ogg) r.src = "data:audio/ogg;base64,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lFJKKaWUUkoppZRSSimllFJKKaWUUkqppJRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoplVJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSCgCQinAAkHowoQwUGrISAEgFAACMUUopxpyDEDHmGGPQSSgpYsw5xhyUklLlHIQQUmktt8o5CCGk1FJtmXNSWosx5hgz56SkFFvNOYdSUoux5ppr7qS0VmuuNedaWqs115xzzbm0FmuuOdecc8sx15xzzjnnGHPOOeecc84FAOA0OACAHtiwOsJJ0VhgoSErAYBUAAACGaUYc8456BBSjDnnHIQQIoUYc845CCFUjDnnHHQQQqgYc8w5CCGEkDnnHIQQQgghcw466CCEEEIHHYQQQgihlM5BCCGEEEooIYQQQgghhBA6CCGEEEIIIYQQQgghhFJKCCGEEEIJoZRQAABggQMAQIANqyOcFI0FFhqyEgAAAgCAHJagUs6EQY5Bjw1BylEzDUJMOdGZYk5qMxVTkDkQnXQSGWpB2V4yCwAAgCAAIMAEEBggKPhCCIgxAABBiMwQCYVVsMCgDBoc5gHAA0SERACQmKBIu7iALgNc0MVdB0IIQhCCWBxAAQk4OOGGJ97whBucoFNU6iAAAAAAAAwA4AEA4KAAIiKaq7C4wMjQ2ODo8AgAAAAAABYA+AAAOD6AiIjmKiwuMDI0Njg6PAIAAAAAAAAAAICAgAAAAAAAQAAAAICAT2dnUwAE7AwAAAAAAAD/QwAAAgAAADuydfsFAQEBAQEACg4ODg==";
      else {
        if (!Modernizr.audio.wav) return void addTest("audiopreload", !1);
        r.src = "data:audio/wav;base64,UklGRvwZAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YdgZAAAAAAEA/v8CAP//AAABAP////8DAPz/BAD9/wEAAAAAAAAAAAABAP7/AgD//wAAAQD//wAAAQD//wAAAQD+/wIA//8AAAAAAAD//wIA/v8BAAAA//8BAAAA//8BAP//AQAAAP//AQD//wEAAAD//wEA//8BAP//AQD//wEA//8BAP//AQD+/wMA/f8DAP3/AgD+/wIA/////wMA/f8CAP7/AgD+/wMA/f8CAP7/AgD//wAAAAAAAAAAAQD+/wIA/v8CAP7/AwD9/wIA/v8BAAEA/v8CAP7/AQAAAAAAAAD//wEAAAD//wIA/f8DAP7/AQD//wEAAAD//wEA//8CAP7/AQD//wIA/v8CAP7/AQAAAAAAAAD//wEAAAAAAAAA//8BAP//AgD9/wQA+/8FAPz/AgAAAP//AgD+/wEAAAD//wIA/v8CAP3/BAD8/wQA/P8DAP7/AwD8/wQA/P8DAP7/AQAAAAAA//8BAP//AgD+/wEAAAD//wIA/v8BAP//AQD//wEAAAD//wEA//8BAAAAAAAAAP//AgD+/wEAAAAAAAAAAAD//wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AgD+/wIA/v8BAP//AQABAP7/AQD//wIA/v8CAP3/AwD/////AgD9/wMA/v8BAP//AQAAAP//AQD//wEA//8BAP//AAABAP//AAABAP//AQD//wAAAAACAP3/AwD9/wIA//8BAP//AQD//wEA//8BAP//AgD9/wMA/v8AAAIA/f8CAAAA/v8EAPv/BAD9/wIAAAD+/wQA+v8HAPr/BAD+/wEAAAD//wIA/f8EAPz/BAD7/wUA/P8EAPz/AwD+/wEAAAD//wEAAAAAAP//AgD8/wUA+/8FAPz/AwD9/wIA//8AAAEA/v8CAP//AQD//wAAAAABAP//AgD9/wMA/f8EAPz/AwD+/wAAAwD7/wUA/P8DAP7/AQAAAP//AgD+/wEAAQD+/wIA/v8BAAEA/v8CAP7/AQAAAP//AgD9/wMA/f8DAP7/AgD+/wEAAAAAAAEA//8AAAEA/v8DAP3/AgD//wEA//8BAP7/AwD9/wMA/v8BAP//AQAAAP//AgD9/wMA/v8BAP//AQAAAP//AgD+/wEAAQD+/wIA/////wIA//8AAAEA/f8DAP//AAABAP////8DAP3/AwD+/wEA//8BAP//AQAAAAAA//8BAP//AQD//wEA//8BAP//AAAAAAEA//8BAP7/AgD//wEA//8AAAAAAAAAAAAAAAD//wIA/v8BAAAA//8BAAEA/v8BAAAA//8DAPz/AwD+/wIA/v8CAP3/AwD+/wEAAAD//wEA//8BAAAA//8BAAAA/v8EAPv/BAD+/wAAAAABAP7/AgD//wAAAAABAP7/AgD//wAAAAAAAAAAAAABAP3/BAD8/wQA/f8BAAAAAAABAP7/AgD+/wIA/v8CAP7/AgD+/wIA/v8BAAAAAAD//wIA/f8DAP7/AAABAP//AAACAPz/BAD9/wIA//8AAP//AwD9/wMA/P8EAP3/AwD9/wIA//8BAP//AQD+/wMA/f8DAP7/AAABAP//AQAAAP//AQD//wIA/f8DAP7/AQAAAP//AQAAAAAA//8CAP7/AQABAP7/AgD+/wEAAQD+/wIA/v8CAP////8CAP7/AgD//wAAAAABAP7/AwD9/wIAAAD+/wMA/f8CAP//AQD+/wMA/f8CAP//AAACAPz/BQD6/wUA/v///wIA/v8CAP3/BAD7/wYA+v8FAPz/AwD/////AgD+/wEAAAD//wEAAAD//wIA/f8DAP7/AQAAAP//AgD//wAA//8BAAAAAAAAAP//AQD//wEA//8AAAIA/f8DAP3/AgAAAP//AQD//wEA//8AAAEA//8BAP////8CAP//AAABAP3/BAD9/wIA/v8BAAEA//8BAP7/AgD//wEA//8AAAEA//8BAP//AAAAAAEA//8BAP7/AgD//wEA//8AAAAAAQD+/wIA/v8BAAAAAAD//wIA/v8BAAAAAAAAAAAAAQD+/wMA/f8CAP//AQD//wIA/f8DAP7/AQD//wEA//8CAP7/AAABAP7/AwD9/wMA/v8AAAEA//8BAAAAAAD//wIA/v8BAAAA//8CAP7/AgD+/wEA//8CAP7/AgD//wAAAAAAAAAAAQD//wEA/v8DAPz/BQD8/wIA//8AAAEAAAD//wEA//8BAP//AQAAAAAA//8BAP//AgD+/wEAAAAAAP//AQD+/wMA/////wEA/v8CAP//AQD//wEA//8AAAEA//8BAAAA/v8EAPz/AwD+/wEAAAAAAAAA//8CAP7/AQD//wEA//8BAP//AAABAP7/AwD9/wIA//8BAP//AQD//wEA//8AAAEA/v8EAPv/BAD9/wIA//8BAP7/AwD9/wIA//8AAAEA//8BAP//AQD//wAAAQD//wEAAAD+/wMA/v8AAAIA/f8DAP7/AQD//wAAAQD+/wMA/f8CAP//AAABAP7/AgD+/wMA/f8CAP7/AQABAP7/AgD+/wIA/v8CAP7/AwD8/wMA//8AAAEA//8AAAAAAAABAP//AQD//wAAAQD//wIA/f8DAP3/AwD+/wAAAgD9/wIA//8AAAEAAAD+/wMA/P8FAPv/BAD9/wIA//8AAP//AgD+/wIA/v8BAAAAAAD//wEAAAAAAP//AQD//wEA//8BAP//AAABAP7/AwD9/wIA//8BAP//AAABAP//AQD//wAAAQD//wEA//8BAP//AAABAAAA//8BAP7/AwD9/wMA/f8DAP3/AgD//wEA//8BAP7/AgD//wAAAgD8/wQA/f8CAP//AQD+/wMA/f8CAP7/AgD//wAAAAAAAAAAAAABAP7/AwD9/wIA/v8DAP3/AwD9/wIA/v8DAPz/BQD7/wQA/f8CAP7/AwD9/wMA/f8CAP//AQAAAP7/AwD+/wEA//8AAAEAAAAAAP//AAABAP//AQAAAP7/AwD9/wMA/f8CAP//AQD//wEA//8AAAIA/f8CAAAA//8BAAAA//8BAAAA/v8EAPv/BAD9/wIA//8AAAEA/v8CAP//AAABAP//AAABAP//AAABAP7/AwD8/wQA/f8CAAAA/v8DAP3/AwD9/wMA/v8BAAAA//8BAAAA//8CAP7/AQAAAAAAAAAAAAAA//8CAP7/AgD+/wIA/v8CAP7/AgD//wAAAQD//wAAAQD//wAAAQD//wAAAQD+/wIA//8AAAAAAQD+/wMA/f8CAP//AQD//wEA//8AAAEA/v8DAP3/AgD//wAAAAABAP7/AwD9/wIA//8AAAEA/v8DAP3/AgD//wAAAAABAP7/AwD8/wMA/v8CAP//AAD//wIA/v8CAP7/AQABAP7/AQAAAP//AgD/////AQD//wEAAAD//wEA/v8EAPv/BAD9/wMA/v8BAAAA//8BAAEA/P8GAPr/BQD8/wMA/v8BAAAA//8CAP7/AQABAP3/BAD7/wYA+/8EAPz/AwD//wEA//8BAP7/BAD8/wMA/v8AAAIA/v8BAAAA//8BAAAA//8BAAAA//8CAP3/AwD+/wAAAgD8/wUA/P8DAP7/AAABAAAAAAD//wEAAAD//wIA/f8DAP7/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAEA/f8EAPz/AwD/////AgD+/wIA/f8DAP7/AgD+/wEA//8CAP7/AQD//wEAAAAAAP//AQAAAP//AgD9/wMA/v8BAAAA//8BAP//AQAAAP//AAACAP3/BAD7/wQA/v8BAAAA//8BAP//AQAAAP//AQAAAP7/BAD7/wUA+/8EAP3/AgD//wAAAQD+/wIA//8AAAEA/v8CAP//AQD+/wEAAAAAAAAAAAD//wEA//8CAP3/AwD9/wIA//8AAAAAAAAAAAAA//8BAP//AgD+/wEA//8CAP7/AQAAAP//AgD/////AgD/////AgD+/wIA//8AAP//AQABAP7/AgD9/wMA/v8CAP////8BAAAAAAAAAAAA//8CAP////8DAPz/AwD+/wEAAAAAAP//AQD//wEAAAD//wEAAAD+/wQA+/8FAPz/AgAAAP//AgD9/wMA/v8BAAAAAAD//wEAAAD//wIA/v8BAAAAAAD//wIA/v8BAAAA//8BAAAA//8CAP7/AQD//wEA//8BAAAA//8BAP//AAABAP//AQAAAP7/AgD//wEA//8AAAAAAQD+/wMA/P8EAP7///8DAPz/BQD8/wEAAQD+/wMA/v8AAAEA//8BAP//AQD//wEA/v8CAP//AQD//wAAAAABAAAA//8BAP//AQAAAAAA//8BAP//AgD+/wAAAQD//wIA/f8CAP//AQAAAP7/AwD9/wMA/v8BAP//AAABAP//AgD9/wIA//8BAAAA//8BAAAA//8CAP3/AwD+/wEAAAD+/wQA/P8DAP7/AAACAP7/AQAAAP//AQAAAP//AQAAAP//AgD9/wIAAAD//wIA/f8DAP7/AQD//wEA//8CAP7/AQD//wAAAQD//wEA//8AAAAAAQD//wEAAAD9/wUA+/8FAPz/AgD//wAAAQD//wAAAQD+/wMA/f8BAAEA/v8CAP7/AgD+/wIA/v8BAAAAAAAAAAAAAAD//wIA/v8CAP////8CAP7/AgD+/wIA/v8CAP7/AQAAAP//AQAAAP//AQD//wAAAQD//wAAAQD+/wMA/f8CAAAA/v8DAP3/AgAAAP//AQAAAP7/AwD9/wMA/v8BAP//AQD//wEAAAD+/wMA/f8CAAAA/v8CAP//AAAAAAEA//8AAAEA/v8DAP3/AwD9/wIA//8BAP//AgD8/wQA/v8BAAAA/v8CAP//AQD//wAAAAAAAAEA/f8EAPz/BAD9/wIA//8AAAAAAAABAP//AAAAAAAAAAABAP3/BAD9/wIA/v8BAAEA//8AAAAA//8CAP7/AgD9/wQA+/8FAPv/BQD8/wMA/f8DAP3/AwD+/wAAAgD9/wMA/f8CAAAA/v8EAPv/BQD7/wUA/P8DAP///v8DAP3/BAD8/wMA/f8DAP7/AQD//wEAAAD//wEA/v8CAAAA/v8CAP7/AgD//wAAAAAAAAAAAQD+/wIA//8AAAEA/v8DAPz/BAD9/wIA//8AAP//AgD//wEA/v8BAAAAAQD//wAAAAAAAAEA//8AAAEA//8BAP//AAABAP//AQD+/wIA/v8DAPz/BAD8/wQA/f8BAAAAAQD+/wMA/P8DAP//AAAAAAAAAAD//wMA+/8FAP3/AQABAP3/BAD8/wMA/v8BAAAA//8CAP3/AwD+/wEAAQD9/wMA/f8EAPz/BAD7/wQA/v8BAAEA/f8DAP7/AQAAAP//AgD+/wEAAAD//wIA/v8CAP7/AgD+/wEAAQD//wEA/v8CAP7/BAD7/wQA/f8CAAAA//8AAAAAAAABAP//AQD+/wEAAQD+/wMA/f8BAAEA/v8DAPz/AwD/////AwD8/wQA/P8DAP7/AgD//wAA//8BAAAAAAAAAP//AgD+/wEAAAD//wIA/v8BAAAA//8CAP3/AgD//wAAAQD+/wIA/v8BAAAA//8CAP7/AgD+/wEA//8CAP3/BAD7/wQA/v8BAAAA//8AAAEAAAD//wIA/f8DAP7/AgD+/wIA/v8CAP7/AgD+/wEAAAAAAP//AgD9/wMA/v8BAP//AgD9/wMA/v8AAAEA//8BAP//AQD//wEA//8AAAEA/v8EAPz/AgD//wAAAQAAAP//AAABAP//AQD//wEAAAD//wEA//8BAAEA/f8DAP7/AQABAP3/AwD+/wIA/////wEAAAAAAAAAAAD//wIA/v8CAP////8CAP7/AgD//wAA//8CAP3/BAD9/wAAAgD9/wMA/v8BAP//AQAAAP//AQAAAP//AgD9/wMA/f8EAPz/AwD+/wEAAAAAAAAAAAD//wIA/f8EAP3/AAABAAAA//8CAP7/AQAAAP//AQAAAAAA//8BAP//AQAAAP//AQAAAP//AQAAAP//AgD9/wMA/v8BAP//AQAAAP//AQD//wIA/v8CAP3/BAD9/wEAAAD//wEAAQD9/wMA/f8CAAAA/v8DAP3/AgD//wAAAQD+/wIA/v8CAP7/AQAAAP//AgD+/wEAAAAAAP//AwD7/wUA/f8BAAEA/v8BAAEA/v8DAP3/AgD//wEA//8BAP//AQD//wEA//8CAP3/BAD7/wQA/////wIA/v8AAAIA/v8CAP3/BAD7/wUA/P8DAP3/AwD9/wMA/v8AAAIA/v8CAP7/AgD+/wIA//8AAAEA/v8CAP7/AgD//wAAAAD//wEAAAAAAAAA//8BAP7/BAD7/wUA/P8CAAAA//8BAP//AQAAAP//AgD9/wMA/v8BAAAA//8BAAAA//8CAP3/AwD+/wEA//8CAP3/AwD+/wAAAwD8/wIAAAD//wIA/////wIA/v8CAP7/AgD+/wEAAAAAAAAAAAAAAP//AgD+/wIA//8AAAAA//8CAP7/AgD+/wEA//8CAP3/AwD9/wMA/v8BAP7/AwD9/wMA/f8CAP//AQD+/wIA//8BAP//AQD+/wMA/v8BAAAA//8BAAAA//8CAP7/AQAAAP//AgD+/wIA/v8CAP//AAAAAAEA//8BAP//AAABAAAA//8BAP//AQD//wEA//8BAP//AQAAAP//AQD//wEAAAD//wIA/f8CAAAA//8BAAAA//8BAP//AAABAP//AQD//wAAAAAAAAEA/v8CAP//AQD//wAAAAABAP7/AwD9/wIAAAD+/wIA//8BAP//AgD9/wMA/f8DAP7/AgD+/wEAAAAAAAEA/v8CAP7/AgD//wAAAAAAAAAAAAAAAP//AgD/////AgD9/wQA/f8BAAAAAAAAAAEA/f8DAP////8DAP3/AQABAP7/AgD//wAAAQD+/wMA/f8CAP7/AQABAP7/AwD7/wYA+v8FAP3/AQABAP7/AgD+/wMA/f8CAP7/AwD+/wEA//8BAP//AQAAAP7/BQD5/wcA+v8FAPz/AwD+/wIA/v8BAAAA//8DAPv/BQD8/wMA/////wEAAAAAAAAAAAD//wIA/f8DAP7/AQAAAP//AQAAAP//AgD+/wIA/v8BAAEA/f8EAPz/AwD+/wEA//8CAP7/AQD//wEA//8CAP7/AQAAAP//AgD+/wEAAAAAAAAAAAAAAAAAAAD//wIA/f8EAPz/AwD+/wEA//8CAP7/AgD+/wEAAQD+/wEAAQD+/wIA/////wIA//8AAAAAAAAAAAAAAAD//wEAAAAAAP//AgD9/wMA/v8BAP//AQAAAP//AQD//wEA//8BAP//AQD//wEA//8BAP//AQAAAP7/AwD9/wMA/v8BAP7/AwD9/wMA/v8BAP//AAABAP//AQD//wAAAAABAP//AAAAAAAAAQD//wEA/v8CAAAA/v8EAPv/BAD9/wIAAAD+/wMA/P8DAP//AAAAAP//AQD//wIA/f8DAP3/AwD9/wMA/v8BAAAA//8BAAAA//8CAP3/AwD9/wQA+/8FAPv/BQD8/wMA/v8BAAAA//8BAP//AgD+/wEAAAD//wIA/v8BAAEA/f8DAP3/AgAAAP//AQD//wAAAQD//wEA//8BAP//AQD//wEA/v8DAP3/AgAAAP7/AwD9/wIAAAD//wEAAAD//wIA/f8DAP7/AgD9/wQA+/8FAPz/AgAAAP//AgD9/wIA//8BAP//AQD//wEA//8BAP//AQD//wIA/f8DAP3/AgD//wAAAQD+/wIA/v8BAAEA/v8CAP7/AgD+/wMA/P8DAP//AAABAP7/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEA/v8CAP3/BAD8/wMA/v8BAAAAAAD//wEAAAAAAAAAAAD//wEAAAAAAAAA//8BAP//AgD+/wEA//8CAP3/AwD9/wMA/f8EAPv/BAD+/wAAAQD//wEA//8BAP//AAABAP//AQD//wEAAAD//wEA//8BAP//AgD9/wMA/v8AAAIA/f8DAP7/AAACAP3/AwD+/wEA//8BAP//AQAAAP//AQAAAP7/AwD9/wMA/v8AAAEA//8BAP//AAAAAAEA//8AAAEA/v8CAP//AAAAAAEA/v8DAPz/BAD9/wEAAQD+/wEAAQD9/wQA/P8DAP7/AQAAAAAAAAAAAAAAAAAAAAAAAQD+/wIA/////wIA/v8BAAAA//8BAP//AQD//wEA//8BAAAA/v8EAPz/AwD///7/BAD8/wMA/////wIA/v8CAP////8CAP7/AgD+/wIA/v8CAP////8CAP7/AwD9/wIA/v8CAP//AAABAP7/AwD9/wEAAQD+/wMA/f8CAP//AAAAAAEA/v8DAPz/BAD9/wIA/v8CAP7/AgD//wAAAAD//wIA/v8CAP7/AQAAAAAA//8CAP7/AgD+/wIA/v8CAP7/AwD8/wUA+v8GAPv/AwD//wAAAAAAAAAA//8DAPv/BQD9/wAAAgD9/wMA/v8BAP//AQAAAP//AgD9/wMA/v8BAAAA//8BAAAAAAAAAP//AQAAAAAAAAD//wEA//8CAP3/AwD+/wAAAgD+/wEAAAD//wIA/v8CAP7/AgD/////AwD8/wUA/P8CAP//AQD//wIA/f8DAP3/AwD+/wAAAQD+/wMA/f8DAP3/AgD//wAAAQD//wEA//8BAP7/AwD+/wEA//8AAAEA//8CAPz/BAD9/wIA//8AAAEA/v8DAPz/BAD9/wIA//8AAAEA/v8CAP7/AgD//wEA/f8EAPz/BAD+////AgD//wAAAQD//wAAAQD//wEA//8BAP7/AwD+/wEA"
      }
    } catch (o) {
      return void addTest("audiopreload", !1)
    }
    r.setAttribute("preload", "auto"), r.style.cssText = "display:none", docElement.appendChild(r), setTimeout(function() {
      r.addEventListener("loadeddata", A, !1), e = setTimeout(A, t)
    }, 0)
  }), Modernizr.addTest("canvasblending", function() {
    if (Modernizr.canvas === !1) return !1;
    var A = createElement("canvas").getContext("2d");
    try {
      A.globalCompositeOperation = "screen"
    } catch (e) {}
    return "screen" === A.globalCompositeOperation
  });
  var canvas = createElement("canvas");
  Modernizr.addTest("todataurljpeg", function() {
    return !!Modernizr.canvas && 0 === canvas.toDataURL("image/jpeg").indexOf("data:image/jpeg")
  }), Modernizr.addTest("todataurlpng", function() {
    return !!Modernizr.canvas && 0 === canvas.toDataURL("image/png").indexOf("data:image/png")
  }), Modernizr.addTest("todataurlwebp", function() {
    var A = !1;
    try {
      A = !!Modernizr.canvas && 0 === canvas.toDataURL("image/webp").indexOf("data:image/webp")
    } catch (e) {}
    return A
  }), Modernizr.addTest("canvaswinding", function() {
    if (Modernizr.canvas === !1) return !1;
    var A = createElement("canvas").getContext("2d");
    return A.rect(0, 0, 10, 10), A.rect(2, 2, 6, 6), A.isPointInPath(5, 5, "evenodd") === !1
  }), Modernizr.addTest("bgpositionshorthand", function() {
    var A = createElement("a"),
      e = A.style,
      t = "right 10px bottom 10px";
    return e.cssText = "background-position: " + t + ";", e.backgroundPosition === t
  }), Modernizr.addTest("csscalc", function() {
    var A = "width:",
      e = "calc(10px);",
      t = createElement("a");
    return t.style.cssText = A + prefixes.join(e + A), !!t.style.length
  }), Modernizr.addTest("cubicbezierrange", function() {
    var A = createElement("a");
    return A.style.cssText = prefixes.join("transition-timing-function:cubic-bezier(1,0,0,1.1); "), !!A.style.length
  }), Modernizr.addTest("cssgradients", function() {
    for (var A, e = "background-image:", t = "gradient(linear,left top,right bottom,from(#9f9),to(white));", r = "", n = 0, o = prefixes.length - 1; o > n; n++) A = 0 === n ? "to " : "", r += e + prefixes[n] + "linear-gradient(" + A + "left top, #9f9, white);";
    Modernizr._config.usePrefixes && (r += e + "-webkit-" + t);
    var i = createElement("a"),
      d = i.style;
    return d.cssText = r, ("" + d.backgroundImage).indexOf("gradient") > -1
  }), Modernizr.addTest("multiplebgs", function() {
    var A = createElement("a").style;
    return A.cssText = "background:url(https://),url(https://),red url(https://)", /(url\s*\(.*?){3}/.test(A.background)
  }), Modernizr.addTest("opacity", function() {
    var A = createElement("a").style;
    return A.cssText = prefixes.join("opacity:.55;"), /^0.55$/.test(A.opacity)
  }), Modernizr.addTest("csspointerevents", function() {
    var A = createElement("a").style;
    return A.cssText = "pointer-events:auto", "auto" === A.pointerEvents
  }), Modernizr.addTest("csspositionsticky", function() {
    var A = "position:",
      e = "sticky",
      t = createElement("a"),
      r = t.style;
    return r.cssText = A + prefixes.join(e + ";" + A).slice(0, -A.length), -1 !== r.position.indexOf(e)
  }), Modernizr.addTest("cssremunit", function() {
    var A = createElement("a").style;
    try {
      A.fontSize = "3rem"
    } catch (e) {}
    return /rem/.test(A.fontSize)
  }), Modernizr.addTest("rgba", function() {
    var A = createElement("a").style;
    return A.cssText = "background-color:rgba(150,255,150,.5)", ("" + A.backgroundColor).indexOf("rgba") > -1
  }), Modernizr.addTest("preserve3d", function() {
    var A, e, t = window.CSS,
      r = !1;
    return t && t.supports && t.supports("(transform-style: preserve-3d)") ? !0 : (A = createElement("a"), e = createElement("a"), A.style.cssText = "display: block; transform-style: preserve-3d; transform-origin: right; transform: rotateY(40deg);", e.style.cssText = "display: block; width: 9px; height: 1px; background: #000; transform-origin: right; transform: rotateY(40deg);", A.appendChild(e), docElement.appendChild(A), r = e.getBoundingClientRect(), docElement.removeChild(A), r = r.width && r.width < 4)
  }), Modernizr.addTest("createelementattrs", function() {
    try {
      return "test" == createElement('<input name="test" />').getAttribute("name")
    } catch (A) {
      return !1
    }
  }, {
    aliases: ["createelement-attrs"]
  }), Modernizr.addTest("dataset", function() {
    var A = createElement("div");
    return A.setAttribute("data-a-b", "c"), !(!A.dataset || "c" !== A.dataset.aB)
  }), Modernizr.addTest("hidden", "hidden" in createElement("a")), Modernizr.addTest("outputelem", "value" in createElement("output")), Modernizr.addTest("progressbar", createElement("progress").max !== undefined), Modernizr.addTest("meter", createElement("meter").max !== undefined), Modernizr.addTest("ruby", function() {
    function A(A, e) {
      var t;
      return window.getComputedStyle ? t = document.defaultView.getComputedStyle(A, null).getPropertyValue(e) : A.currentStyle && (t = A.currentStyle[e]), t
    }

    function e() {
      docElement.removeChild(t), t = null, r = null, n = null
    }
    var t = createElement("ruby"),
      r = createElement("rt"),
      n = createElement("rp"),
      o = "display",
      i = "fontSize";
    return t.appendChild(n), t.appendChild(r), docElement.appendChild(t), "none" == A(n, o) || "ruby" == A(t, o) && "ruby-text" == A(r, o) || "6pt" == A(n, i) && "6pt" == A(r, i) ? (e(), !0) : (e(), !1)
  }), Modernizr.addTest("template", "content" in createElement("template")), Modernizr.addTest("time", "valueAsDate" in createElement("time")), Modernizr.addTest("texttrackapi", "function" == typeof createElement("video").addTextTrack), Modernizr.addTest("track", "kind" in createElement("track")), Modernizr.addTest("unknownelements", function() {
    var A = createElement("a");
    return A.innerHTML = "<xyz></xyz>", 1 === A.childNodes.length
  }), Modernizr.addTest("capture", "capture" in createElement("input")), Modernizr.addTest("fileinput", function() {
    if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) return !1;
    var A = createElement("input");
    return A.type = "file", !A.disabled
  }), Modernizr.addTest("fileinputdirectory", function() {
    var A = createElement("input"),
      e = "directory";
    if (A.type = "file", e in A) return !0;
    for (var t = 0, r = domPrefixes.length; r > t; t++)
      if (domPrefixes[t] + e in A) return !0;
    return !1
  }), Modernizr.addTest("formattribute", function() {
    var A, e = createElement("form"),
      t = createElement("input"),
      r = createElement("div"),
      n = "formtest" + (new Date).getTime(),
      o = !1;
    e.id = n;
    try {
      t.setAttribute("form", n)
    } catch (i) {
      document.createAttribute && (A = document.createAttribute("form"), A.nodeValue = n, t.setAttributeNode(A))
    }
    return r.appendChild(e), r.appendChild(t), docElement.appendChild(r), o = e.elements && 1 === e.elements.length && t.form == e, r.parentNode.removeChild(r), o
  }), Modernizr.addTest("placeholder", "placeholder" in createElement("input") && "placeholder" in createElement("textarea")), Modernizr.addTest("sandbox", "sandbox" in createElement("iframe")), Modernizr.addTest("seamless", "seamless" in createElement("iframe")), Modernizr.addTest("srcdoc", "srcdoc" in createElement("iframe")), Modernizr.addAsyncTest(function() {
    if (!Modernizr.canvas) return !1;
    var A = new Image,
      e = createElement("canvas"),
      t = e.getContext("2d");
    A.onload = function() {
      addTest("apng", function() {
        return "undefined" == typeof e.getContext ? !1 : (t.drawImage(A, 0, 0), 0 === t.getImageData(0, 0, 1, 1).data[3])
      })
    }, A.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg=="
  }), Modernizr.addTest("imgcrossorigin", "crossOrigin" in createElement("img")), Modernizr.addAsyncTest(function() {
    var A, e, t, r = createElement("img"),
      n = "sizes" in r;
    !n && "srcset" in r ? (e = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==", A = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", t = function() {
      addTest("sizes", 2 == r.width)
    }, r.onload = t, r.onerror = t, r.setAttribute("sizes", "9px"), r.srcset = A + " 1w," + e + " 8w", r.src = A) : addTest("sizes", n)
  }), Modernizr.addTest("srcset", "srcset" in createElement("img")), Modernizr.addTest("inputformaction", !!("formAction" in createElement("input")), {
    aliases: ["input-formaction"]
  }), Modernizr.addTest("inputformenctype", !!("formEnctype" in createElement("input")), {
    aliases: ["input-formenctype"]
  }), Modernizr.addTest("inputformmethod", !!("formMethod" in createElement("input"))), Modernizr.addTest("inputformtarget", !!("formtarget" in createElement("input")), {
    aliases: ["input-formtarget"]
  }), Modernizr.addTest("scriptasync", "async" in createElement("script")), Modernizr.addTest("scriptdefer", "defer" in createElement("script")), Modernizr.addTest("stylescoped", "scoped" in createElement("style")), Modernizr.addTest("inlinesvg", function() {
    var A = createElement("div");
    return A.innerHTML = "<svg/>", "http://www.w3.org/2000/svg" == ("undefined" != typeof SVGRect && A.firstChild && A.firstChild.namespaceURI)
  }), Modernizr.addTest("textareamaxlength", !!("maxLength" in createElement("textarea"))), Modernizr.addAsyncTest(function() {
    function A(i) {
      n++, clearTimeout(e);
      var d = i && "playing" === i.type || 0 !== o.currentTime;
      return !d && r > n ? void(e = setTimeout(A, t)) : (o.removeEventListener("playing", A, !1), addTest("videoautoplay", d), void(o.parentNode && o.parentNode.removeChild(o)))
    }
    var e, t = 200,
      r = 5,
      n = 0,
      o = createElement("video"),
      i = o.style;
    if (!(Modernizr.video && "autoplay" in o)) return void addTest("videoautoplay", !1);
    i.position = "absolute", i.height = 0, i.width = 0;
    try {
      if (Modernizr.video.ogg) o.src = "data:video/ogg;base64,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";
      else {
        if (!Modernizr.video.h264) return void addTest("videoautoplay", !1);
        o.src = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAgAAAAIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAGQAAAAAAAEAAAAAAZBtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACgAAAAEAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAE7bWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAA+3N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAgACAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAr/4QAYZ2QACqzZX4iIhAAAAwAEAAADAFA8SJZYAQAGaOvjyyLAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAsUAAAABAAAAFHN0Y28AAAAAAAAAAQAAADAAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU2LjQwLjEwMQ=="
      }
    } catch (d) {
      return void addTest("videoautoplay", !1)
    }
    o.setAttribute("autoplay", ""), o.style.cssText = "display:none", docElement.appendChild(o), setTimeout(function() {
      o.addEventListener("playing", A, !1), e = setTimeout(A, t)
    }, 0)
  }), Modernizr.addTest("videocrossorigin", "crossOrigin" in createElement("video")), Modernizr.addTest("videoloop", "loop" in createElement("video")), Modernizr.addTest("videopreload", "preload" in createElement("video")), Modernizr.addAsyncTest(function() {
    if (Modernizr.webglextensions = !1, Modernizr.webgl) {
      var A, e, t;
      try {
        A = createElement("canvas"), e = A.getContext("webgl") || A.getContext("experimental-webgl"), t = e.getSupportedExtensions()
      } catch (r) {
        return
      }
      e !== undefined && (Modernizr.webglextensions = new Boolean(!0));
      for (var n = -1, o = t.length; ++n < o;) Modernizr.webglextensions[t[n]] = !0;
      A = undefined
    }
  }), Modernizr.addAsyncTest(function() {
    var A, e, t = function(A) {
        docElement.contains(A) || docElement.appendChild(A)
      },
      r = function(A) {
        A.fake && A.parentNode && A.parentNode.removeChild(A)
      },
      n = function(A, e) {
        var t = !!A;
        if (t && (t = new Boolean(t), t.blocked = "blocked" === A), addTest("flash", function() {
            return t
          }), e && s.contains(e)) {
          for (; e.parentNode !== s;) e = e.parentNode;
          s.removeChild(e)
        }
      };
    try {
      e = "ActiveXObject" in window && "Pan" in new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")
    } catch (o) {}
    if (A = !("plugins" in navigator && "Shockwave Flash" in navigator.plugins || e), A || isSVG) n(!1);
    else {
      var i, d, a = createElement("embed"),
        s = getBody();
      if (a.type = "application/x-shockwave-flash", s.appendChild(a), !("Pan" in a || e)) return t(s), n("blocked", a), void r(s);
      i = function() {
        return t(s), docElement.contains(s) ? (docElement.contains(a) ? (d = a.style.cssText, "" !== d ? n("blocked", a) : n(!0, a)) : n("blocked"), void r(s)) : (s = document.body || s, a = createElement("embed"), a.type = "application/x-shockwave-flash", s.appendChild(a), setTimeout(i, 1e3))
      }, setTimeout(i, 10)
    }
  });
  var mq = function() {
    var A = window.matchMedia || window.msMatchMedia;
    return A ? function(e) {
      var t = A(e);
      return t && t.matches || !1
    } : function(A) {
      var e = !1;
      return injectElementWithStyles("@media " + A + " { #modernizr { position: absolute; } }", function(A) {
        e = "absolute" == (window.getComputedStyle ? window.getComputedStyle(A, null) : A.currentStyle).position
      }), e
    }
  }();
  ModernizrProto.mq = mq, Modernizr.addTest("mediaqueries", mq("only all")), Modernizr.addTest("hovermq", mq("(hover)")), Modernizr.addTest("pointermq", mq("(pointer:coarse),(pointer:fine),(pointer:none)"));
  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;
  Modernizr.addTest("hiddenscroll", function() {
    return testStyles("#modernizr {width:100px;height:100px;overflow:scroll}", function(A) {
      return A.offsetWidth === A.clientWidth
    })
  }), Modernizr.addTest("mathml", function() {
    var A;
    return testStyles("#modernizr{position:absolute;display:inline-block}", function(e) {
      e.innerHTML += "<math><mfrac><mi>xx</mi><mi>yy</mi></mfrac></math>", A = e.offsetHeight > e.offsetWidth
    }), A
  }), Modernizr.addTest("touchevents", function() {
    var A;
    if ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) A = !0;
    else {
      var e = ["@media (", prefixes.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
      testStyles(e, function(e) {
        A = 9 === e.offsetTop
      })
    }
    return A
  }), Modernizr.addTest("unicoderange", function() {
    return Modernizr.testStyles('@font-face{font-family:"unicodeRange";src:local("Arial");unicode-range:U+0020,U+002E}#modernizr span{font-size:20px;display:inline-block;font-family:"unicodeRange",monospace}#modernizr .mono{font-family:monospace}', function(A) {
      for (var e = [".", ".", "m", "m"], t = 0; t < e.length; t++) {
        var r = createElement("span");
        r.innerHTML = e[t], r.className = t % 2 ? "mono" : "", A.appendChild(r), e[t] = r.clientWidth
      }
      return e[0] !== e[1] && e[2] === e[3]
    })
  }), Modernizr.addTest("unicode", function() {
    var A, e = createElement("span"),
      t = createElement("span");
    return testStyles("#modernizr{font-family:Arial,sans;font-size:300em;}", function(r) {
      e.innerHTML = isSVG ? "妇" : "&#5987;", t.innerHTML = isSVG ? "☆" : "&#9734;", r.appendChild(e), r.appendChild(t), A = "offsetWidth" in e && e.offsetWidth !== t.offsetWidth
    }), A
  }), Modernizr.addTest("checked", function() {
    return testStyles("#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}", function(A) {
      var e = createElement("input");
      return e.setAttribute("type", "checkbox"), e.setAttribute("checked", "checked"), A.appendChild(e), 20 === e.offsetLeft
    })
  }), testStyles("#modernizr{display: table; direction: ltr}#modernizr div{display: table-cell; padding: 10px}", function(A) {
    var e, t = A.childNodes;
    e = t[0].offsetLeft < t[1].offsetLeft, Modernizr.addTest("displaytable", e, {
      aliases: ["display-table"]
    })
  }, 2);
  var blacklist = function() {
    var A = navigator.userAgent,
      e = A.match(/w(eb)?osbrowser/gi),
      t = A.match(/windows phone/gi) && A.match(/iemobile\/([0-9])+/gi) && parseFloat(RegExp.$1) >= 9;
    return e || t
  }();
  blacklist ? Modernizr.addTest("fontface", !1) : testStyles('@font-face {font-family:"font";src:url("https://")}', function(A, e) {
    var t = document.getElementById("smodernizr"),
      r = t.sheet || t.styleSheet,
      n = r ? r.cssRules && r.cssRules[0] ? r.cssRules[0].cssText : r.cssText || "" : "",
      o = /src/i.test(n) && 0 === n.indexOf(e.split(" ")[0]);
    Modernizr.addTest("fontface", o)
  }), testStyles('#modernizr{font:0/0 a}#modernizr:after{content:":)";visibility:hidden;font:7px/1 a}', function(A) {
    Modernizr.addTest("generatedcontent", A.offsetHeight >= 6)
  }), Modernizr.addTest("hairline", function() {
    return testStyles("#modernizr {border:.5px solid transparent}", function(A) {
      return 1 === A.offsetHeight
    })
  }), Modernizr.addTest("cssinvalid", function() {
    return testStyles("#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:invalid{width:50px}", function(A) {
      var e = createElement("input");
      return e.required = !0, A.appendChild(e), e.clientWidth > 10
    })
  }), testStyles("#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}", function(A) {
    Modernizr.addTest("lastchild", A.lastChild.offsetWidth > A.firstChild.offsetWidth)
  }, 2), testStyles("#modernizr div {width:1px} #modernizr div:nth-child(2n) {width:2px;}", function(A) {
    for (var e = A.getElementsByTagName("div"), t = !0, r = 0; 5 > r; r++) t = t && e[r].offsetWidth === r % 2 + 1;
    Modernizr.addTest("nthchild", t)
  }, 5), testStyles("#modernizr{overflow: scroll; width: 40px; height: 40px; }#" + prefixes.join("scrollbar{width:10px} #modernizr::").split("#").slice(1).join("#") + "scrollbar{width:10px}", function(A) {
    Modernizr.addTest("cssscrollbar", "scrollWidth" in A && 30 == A.scrollWidth)
  }), Modernizr.addTest("siblinggeneral", function() {
    return testStyles("#modernizr div {width:100px} #modernizr div ~ div {width:200px;display:block}", function(A) {
      return 200 == A.lastChild.offsetWidth
    }, 2)
  }), testStyles("#modernizr{position: absolute; top: -10em; visibility:hidden; font: normal 10px arial;}#subpixel{float: left; font-size: 33.3333%;}", function(A) {
    var e = A.firstChild;
    e.innerHTML = "This is a text written in Arial", Modernizr.addTest("subpixelfont", window.getComputedStyle ? "44px" !== window.getComputedStyle(e, null).getPropertyValue("width") : !1)
  }, 1, ["subpixel"]), Modernizr.addTest("cssvalid", function() {
    return testStyles("#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:valid{width:50px}", function(A) {
      var e = createElement("input");
      return A.appendChild(e), e.clientWidth > 10
    })
  }), Modernizr.addTest("details", function() {
    var A, e = createElement("details");
    return "open" in e ? (testStyles("#modernizr details{display:block}", function(t) {
      t.appendChild(e), e.innerHTML = "<summary>a</summary>b", A = e.offsetHeight, e.open = !0, A = A != e.offsetHeight
    }), A) : !1
  }), Modernizr.addTest("oninput", function() {
    var A, e = createElement("input");
    if (e.setAttribute("oninput", "return"), hasEvent("oninput", docElement) || "function" == typeof e.oninput) return !0;
    try {
      var t = document.createEvent("KeyboardEvent");
      A = !1;
      var r = function(e) {
        A = !0, e.preventDefault(), e.stopPropagation()
      };
      t.initKeyEvent("keypress", !0, !0, window, !1, !1, !1, !1, 0, "e".charCodeAt(0)), docElement.appendChild(e), e.addEventListener("input", r, !1), e.focus(), e.dispatchEvent(t), e.removeEventListener("input", r, !1), docElement.removeChild(e)
    } catch (n) {
      A = !1
    }
    return A
  }), Modernizr.addTest("formvalidation", function() {
    var A = createElement("form");
    if (!("checkValidity" in A && "addEventListener" in A)) return !1;
    if ("reportValidity" in A) return !0;
    var e, t = !1;
    return Modernizr.formvalidationapi = !0, A.addEventListener("submit", function(A) {
      (!window.opera || window.operamini) && A.preventDefault(), A.stopPropagation()
    }, !1), A.innerHTML = '<input name="modTest" required="required" /><button></button>', testStyles("#modernizr form{position:absolute;top:-99999em}", function(r) {
      r.appendChild(A), e = A.getElementsByTagName("input")[0], e.addEventListener("invalid", function(A) {
        t = !0, A.preventDefault(), A.stopPropagation()
      }, !1), Modernizr.formvalidationmessage = !!e.validationMessage, A.getElementsByTagName("button")[0].click()
    }), t
  });
  var inputElem = createElement("input"),
    inputattrs = "autocomplete autofocus list placeholder max min multiple pattern required step".split(" "),
    attrs = {};
  Modernizr.input = function(A) {
    for (var e = 0, t = A.length; t > e; e++) attrs[A[e]] = !!(A[e] in inputElem);
    return attrs.list && (attrs.list = !(!createElement("datalist") || !window.HTMLDataListElement)), attrs
  }(inputattrs), Modernizr.addTest("datalistelem", Modernizr.input.list);
  var inputtypes = "search tel url email datetime date month week time datetime-local number range color".split(" "),
    inputs = {};
  Modernizr.inputtypes = function(A) {
    for (var e, t, r, n = A.length, o = "1)", i = 0; n > i; i++) inputElem.setAttribute("type", e = A[i]), r = "text" !== inputElem.type && "style" in inputElem, r && (inputElem.value = o, inputElem.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(e) && inputElem.style.WebkitAppearance !== undefined ? (docElement.appendChild(inputElem), t = document.defaultView, r = t.getComputedStyle && "textfield" !== t.getComputedStyle(inputElem, null).WebkitAppearance && 0 !== inputElem.offsetHeight, docElement.removeChild(inputElem)) : /^(search|tel)$/.test(e) || (r = /^(url|email)$/.test(e) ? inputElem.checkValidity && inputElem.checkValidity() === !1 : inputElem.value != o)), inputs[A[i]] = !!r;
    return inputs
  }(inputtypes), Modernizr.addTest("localizednumber", function() {
    if (!Modernizr.inputtypes.number) return !1;
    if (!Modernizr.formvalidation) return !1;
    var A, e = createElement("div"),
      t = getBody(),
      r = function() {
        return docElement.insertBefore(t, docElement.firstElementChild || docElement.firstChild)
      }();
    e.innerHTML = '<input type="number" value="1.0" step="0.1"/>';
    var n = e.childNodes[0];
    r.appendChild(e), n.focus();
    try {
      document.execCommand("SelectAll", !1), document.execCommand("InsertText", !1, "1,1")
    } catch (o) {}
    return A = "number" === n.type && 1.1 === n.valueAsNumber && n.checkValidity(), r.removeChild(e), t.fake && r.parentNode.removeChild(r), A
  });
  var modElem = {
    elem: createElement("modernizr")
  };
  Modernizr._q.push(function() {
    delete modElem.elem
  }), Modernizr.addTest("csschunit", function() {
    var A, e = modElem.elem.style;
    try {
      e.fontSize = "3ch", A = -1 !== e.fontSize.indexOf("ch")
    } catch (t) {
      A = !1
    }
    return A
  }), Modernizr.addTest("cssexunit", function() {
    var A, e = modElem.elem.style;
    try {
      e.fontSize = "3ex", A = -1 !== e.fontSize.indexOf("ex")
    } catch (t) {
      A = !1
    }
    return A
  }), Modernizr.addTest("hsla", function() {
    var A = createElement("a").style;
    return A.cssText = "background-color:hsla(120,40%,100%,.5)", contains(A.backgroundColor, "rgba") || contains(A.backgroundColor, "hsla")
  }), testStyles("#modernizr { height: 50vh; }", function(A) {
    var e = parseInt(window.innerHeight / 2, 10),
      t = parseInt(computedStyle(A, null, "height"), 10);
    Modernizr.addTest("cssvhunit", t == e)
  }), testStyles("#modernizr { width: 50vw; }", function(A) {
    var e = parseInt(window.innerWidth / 2, 10),
      t = parseInt(computedStyle(A, null, "width"), 10);
    Modernizr.addTest("cssvwunit", t == e)
  }), Modernizr.addTest("bdi", function() {
    var A = createElement("div"),
      e = createElement("bdi");
    e.innerHTML = "&#1573;", A.appendChild(e), docElement.appendChild(A);
    var t = "rtl" === computedStyle(e, null, "direction");
    return docElement.removeChild(A), t
  }), testStyles("#modernizr1{width: 50vmax}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}", function(A) {
    var e = A.childNodes[2],
      t = A.childNodes[1],
      r = A.childNodes[0],
      n = parseInt((t.offsetWidth - t.clientWidth) / 2, 10),
      o = r.clientWidth / 100,
      i = r.clientHeight / 100,
      d = parseInt(50 * Math.max(o, i), 10),
      a = parseInt(computedStyle(e, null, "width"), 10);
    Modernizr.addTest("cssvmaxunit", roundedEquals(d, a) || roundedEquals(d, a - n))
  }, 3), testStyles("#modernizr1{width: 50vm;width:50vmin}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}", function(A) {
    var e = A.childNodes[2],
      t = A.childNodes[1],
      r = A.childNodes[0],
      n = parseInt((t.offsetWidth - t.clientWidth) / 2, 10),
      o = r.clientWidth / 100,
      i = r.clientHeight / 100,
      d = parseInt(50 * Math.min(o, i), 10),
      a = parseInt(computedStyle(e, null, "width"), 10);
    Modernizr.addTest("cssvminunit", roundedEquals(d, a) || roundedEquals(d, a - n))
  }, 3);
  var testXhrType = function(A) {
    if ("undefined" == typeof XMLHttpRequest) return !1;
    var e = new XMLHttpRequest;
    e.open("get", "/", !0);
    try {
      e.responseType = A
    } catch (t) {
      return !1
    }
    return "response" in e && e.responseType == A
  };
  Modernizr.addTest("xhrresponsetypearraybuffer", testXhrType("arraybuffer")), Modernizr.addTest("xhrresponsetypeblob", testXhrType("blob")), Modernizr.addTest("xhrresponsetypedocument", testXhrType("document")), Modernizr.addTest("xhrresponsetypejson", testXhrType("json")), Modernizr.addTest("xhrresponsetypetext", testXhrType("text"));
  var toStringFn = {}.toString;
  Modernizr.addTest("svgclippaths", function() {
    return !!document.createElementNS && /SVGClipPath/.test(toStringFn.call(document.createElementNS("http://www.w3.org/2000/svg", "clipPath")))
  }), Modernizr.addTest("svgforeignobject", function() {
    return !!document.createElementNS && /SVGForeignObject/.test(toStringFn.call(document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")))
  }), Modernizr.addTest("smil", function() {
    return !!document.createElementNS && /SVGAnimate/.test(toStringFn.call(document.createElementNS("http://www.w3.org/2000/svg", "animate")))
  });
  var mStyle = {
    style: modElem.elem.style
  };
  Modernizr._q.unshift(function() {
    delete mStyle.style
  });
  var testProp = ModernizrProto.testProp = function(A, e, t) {
    return testProps([A], undefined, e, t)
  };
  Modernizr.addTest("textshadow", testProp("textShadow", "1px 1px")), ModernizrProto.testAllProps = testPropsAll;
  var prefixed = ModernizrProto.prefixed = function(A, e, t) {
      return 0 === A.indexOf("@") ? atRule(A) : (-1 != A.indexOf("-") && (A = cssToDOM(A)), e ? testPropsAll(A, e, t) : testPropsAll(A, "pfx"))
    },
    prefixedCSS = ModernizrProto.prefixedCSS = function(A) {
      var e = prefixed(A);
      return e && domToCSS(e)
    };
  Modernizr.addTest("batteryapi", !!prefixed("battery", navigator), {
    aliases: ["battery-api"]
  });
  var crypto = prefixed("crypto", window);
  Modernizr.addTest("crypto", !!prefixed("subtle", crypto)), Modernizr.addTest("dart", !!prefixed("startDart", navigator)), Modernizr.addTest("forcetouch", function() {
    return hasEvent(prefixed("mouseforcewillbegin", window, !1), window) ? MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN && MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN : !1
  }), Modernizr.addTest("fullscreen", !(!prefixed("exitFullscreen", document, !1) && !prefixed("cancelFullScreen", document, !1))), Modernizr.addTest("gamepads", !!prefixed("getGamepads", navigator)), Modernizr.addAsyncTest(function() {
    var A;
    try {
      A = prefixed("indexedDB", window)
    } catch (e) {}
    if (A) {
      var t = "modernizr-" + Math.random(),
        r = A.open(t);
      r.onerror = function() {
        r.error && "InvalidStateError" === r.error.name ? addTest("indexeddb", !1) : (addTest("indexeddb", !0), detectDeleteDatabase(A, t))
      }, r.onsuccess = function() {
        addTest("indexeddb", !0), detectDeleteDatabase(A, t)
      }
    } else addTest("indexeddb", !1)
  }), Modernizr.addAsyncTest(function() {
    var A, e, t, r, n = "detect-blob-support",
      o = !1;
    try {
      A = prefixed("indexedDB", window)
    } catch (i) {}
    if (!Modernizr.indexeddb || !Modernizr.indexeddb.deletedatabase) return !1;
    try {
      A.deleteDatabase(n).onsuccess = function() {
        e = A.open(n, 1), e.onupgradeneeded = function() {
          e.result.createObjectStore("store")
        }, e.onsuccess = function() {
          t = e.result;
          try {
            r = t.transaction("store", "readwrite").objectStore("store").put(new Blob, "key"), r.onsuccess = function() {
              o = !0
            }, r.onerror = function() {
              o = !1
            }
          } catch (i) {
            o = !1
          } finally {
            addTest("indexeddbblob", o), t.close(), A.deleteDatabase(n)
          }
        }
      }
    } catch (i) {
      addTest("indexeddbblob", !1)
    }
  }), Modernizr.addTest("intl", !!prefixed("Intl", window)), Modernizr.addTest("pagevisibility", !!prefixed("hidden", document, !1)), Modernizr.addTest("performance", !!prefixed("performance", window)), Modernizr.addTest("pointerlock", !!prefixed("exitPointerLock", document)), Modernizr.addTest("quotamanagement", function() {
    var A = prefixed("temporaryStorage", navigator),
      e = prefixed("persistentStorage", navigator);
    return !(!A || !e)
  }), Modernizr.addTest("requestanimationframe", !!prefixed("requestAnimationFrame", window), {
    aliases: ["raf"]
  }), Modernizr.addTest("vibrate", !!prefixed("vibrate", navigator)), Modernizr.addTest("webintents", !!prefixed("startActivity", navigator)), Modernizr.addTest("lowbattery", function() {
    var A = .2,
      e = prefixed("battery", navigator);
    return !!(e && !e.charging && e.level <= A)
  });
  var crypto = prefixed("crypto", window),
    supportsGetRandomValues;
  if (crypto && "getRandomValues" in crypto && "Uint32Array" in window) {
    var array = new Uint32Array(10),
      values = crypto.getRandomValues(array);
    supportsGetRandomValues = values && is(values[0], "number")
  }
  Modernizr.addTest("getrandomvalues", !!supportsGetRandomValues), Modernizr.addTest("backgroundblendmode", prefixed("backgroundBlendMode", "text")), Modernizr.addTest("objectfit", !!prefixed("objectFit"), {
    aliases: ["object-fit"]
  }), Modernizr.addTest("regions", function() {
    if (isSVG) return !1;
    var A = prefixed("flowFrom"),
      e = prefixed("flowInto"),
      t = !1;
    if (!A || !e) return t;
    var r = createElement("iframe"),
      n = createElement("div"),
      o = createElement("div"),
      i = createElement("div"),
      d = "modernizr_flow_for_regions_check";
    o.innerText = "M", n.style.cssText = "top: 150px; left: 150px; padding: 0px;", i.style.cssText = "width: 50px; height: 50px; padding: 42px;", i.style[A] = d, n.appendChild(o), n.appendChild(i), docElement.appendChild(n);
    var a, s, l = o.getBoundingClientRect();
    return o.style[e] = d, a = o.getBoundingClientRect(), s = parseInt(a.left - l.left, 10), docElement.removeChild(n), 42 == s ? t = !0 : (docElement.appendChild(r), l = r.getBoundingClientRect(), r.style[e] = d, a = r.getBoundingClientRect(), l.height > 0 && l.height !== a.height && 0 === a.height && (t = !0)), o = i = n = r = undefined, t
  }), Modernizr.addTest("wrapflow", function() {
    var A = prefixed("wrapFlow");
    if (!A || isSVG) return !1;
    var e = A.replace(/([A-Z])/g, function(A, e) {
        return "-" + e.toLowerCase()
      }).replace(/^ms-/, "-ms-"),
      t = createElement("div"),
      r = createElement("div"),
      n = createElement("span");
    r.style.cssText = "position: absolute; left: 50px; width: 100px; height: 20px;" + e + ":end;", n.innerText = "X", t.appendChild(r), t.appendChild(n), docElement.appendChild(t);
    var o = n.offsetLeft;
    return docElement.removeChild(t), r = n = t = undefined, 150 == o
  }), Modernizr.addTest("filesystem", !!prefixed("requestFileSystem", window)), Modernizr.addTest("requestautocomplete", !!prefixed("requestAutocomplete", createElement("form"))), Modernizr.addTest("speechrecognition", !!prefixed("SpeechRecognition", window));
  var url = prefixed("URL", window, !1);
  url = url && window[url], Modernizr.addTest("bloburls", url && "revokeObjectURL" in url && "createObjectURL" in url), Modernizr.addAsyncTest(function() {
      function A() {
        addTest("transferables", !1), e()
      }

      function e() {
        d && URL.revokeObjectURL(d), a && a.terminate(), n && clearTimeout(n)
      }
      var t = !!(Modernizr.blobconstructor && Modernizr.bloburls && Modernizr.webworkers && Modernizr.typedarrays);
      if (!t) return addTest("transferables", !1);
      try {
        var r, n, o = 'var hello = "world"',
          i = new Blob([o], {
            type: "text/javascript"
          }),
          d = URL.createObjectURL(i),
          a = new Worker(d);
        a.onerror = A, n = setTimeout(A, 200), r = new ArrayBuffer(1), a.postMessage(r, [r]), addTest("transferables", 0 === r.byteLength), e()
      } catch (s) {
        A()
      }
    }), Modernizr.addTest("getusermedia", !!prefixed("getUserMedia", navigator)), Modernizr.addTest("peerconnection", !!prefixed("RTCPeerConnection", window)), Modernizr.addTest("datachannel", function() {
      if (!Modernizr.peerconnection) return !1;
      for (var A = 0, e = domPrefixes.length; e > A; A++) {
        var t = window[domPrefixes[A] + "RTCPeerConnection"];
        if (t) {
          var r = new t(null);
          return "createDataChannel" in r
        }
      }
      return !1
    }), Modernizr.addTest("matchmedia", !!prefixed("matchMedia", window)), ModernizrProto.testAllProps = testAllProps, Modernizr.addTest("ligatures", testAllProps("fontFeatureSettings", '"liga" 1')), Modernizr.addTest("cssanimations", testAllProps("animationName", "a", !0)), Modernizr.addTest("csspseudoanimations", function() {
      var A = !1;
      if (!Modernizr.cssanimations || !window.getComputedStyle) return A;
      var e = ["@", Modernizr._prefixes.join("keyframes csspseudoanimations { from { font-size: 10px; } }@").replace(/\@$/, ""), '#modernizr:before { content:" "; font-size:5px;', Modernizr._prefixes.join("animation:csspseudoanimations 1ms infinite;"), "}"].join("");
      return Modernizr.testStyles(e, function(e) {
        A = "10px" === window.getComputedStyle(e, ":before").getPropertyValue("font-size")
      }), A
    }), Modernizr.addTest("appearance", testAllProps("appearance")), Modernizr.addTest("backdropfilter", testAllProps("backdropFilter")), Modernizr.addTest("backgroundcliptext", function() {
      return testAllProps("backgroundClip", "text")
    }), Modernizr.addTest("bgpositionxy", function() {
      return testAllProps("backgroundPositionX", "3px", !0) && testAllProps("backgroundPositionY", "5px", !0)
    }), Modernizr.addTest("bgrepeatround", testAllProps("backgroundRepeat", "round")), Modernizr.addTest("bgrepeatspace", testAllProps("backgroundRepeat", "space")), Modernizr.addTest("backgroundsize", testAllProps("backgroundSize", "100%", !0)), Modernizr.addTest("bgsizecover", testAllProps("backgroundSize", "cover")), Modernizr.addTest("borderimage", testAllProps("borderImage", "url() 1", !0)), Modernizr.addTest("borderradius", testAllProps("borderRadius", "0px", !0)), Modernizr.addTest("boxshadow", testAllProps("boxShadow", "1px 1px", !0)), Modernizr.addTest("boxsizing", testAllProps("boxSizing", "border-box", !0) && (document.documentMode === undefined || document.documentMode > 7)),
    function() {
      Modernizr.addTest("csscolumns", function() {
        var A = !1,
          e = testAllProps("columnCount");
        try {
          A = !!e, A && (A = new Boolean(A))
        } catch (t) {}
        return A
      });
      for (var A, e, t = ["Width", "Span", "Fill", "Gap", "Rule", "RuleColor", "RuleStyle", "RuleWidth", "BreakBefore", "BreakAfter", "BreakInside"], r = 0; r < t.length; r++) A = t[r].toLowerCase(), e = testAllProps("column" + t[r]), ("breakbefore" === A || "breakafter" === A || "breakinside" == A) && (e = e || testAllProps(t[r])), Modernizr.addTest("csscolumns." + A, e)
    }(), Modernizr.addTest("cssgridlegacy", testAllProps("grid-columns", "10px", !0)), Modernizr.addTest("cssgrid", testAllProps("grid-template-rows", "none", !0)), Modernizr.addTest("displayrunin", testAllProps("display", "run-in"), {
      aliases: ["display-runin"]
    }), Modernizr.addTest("ellipsis", testAllProps("textOverflow", "ellipsis")), Modernizr.addTest("cssfilters", function() {
      if (Modernizr.supports) return testAllProps("filter", "blur(2px)");
      var A = createElement("a");
      return A.style.cssText = prefixes.join("filter:blur(2px); "), !!A.style.length && (document.documentMode === undefined || document.documentMode > 9)
    }), Modernizr.addTest("flexbox", testAllProps("flexBasis", "1px", !0)), Modernizr.addTest("flexboxlegacy", testAllProps("boxDirection", "reverse", !0)), Modernizr.addTest("flexboxtweener", testAllProps("flexAlign", "end", !0)), Modernizr.addTest("flexwrap", testAllProps("flexWrap", "wrap", !0)), Modernizr.addAsyncTest(function() {
      function A() {
        function t() {
          try {
            var A = createElement("div"),
              e = createElement("span"),
              t = A.style,
              r = 0,
              n = 0,
              o = !1,
              i = document.body.firstElementChild || document.body.firstChild;
            return A.appendChild(e), e.innerHTML = "Bacon ipsum dolor sit amet jerky velit in culpa hamburger et. Laborum dolor proident, enim dolore duis commodo et strip steak. Salami anim et, veniam consectetur dolore qui tenderloin jowl velit sirloin. Et ad culpa, fatback cillum jowl ball tip ham hock nulla short ribs pariatur aute. Pig pancetta ham bresaola, ut boudin nostrud commodo flank esse cow tongue culpa. Pork belly bresaola enim pig, ea consectetur nisi. Fugiat officia turkey, ea cow jowl pariatur ullamco proident do laborum velit sausage. Magna biltong sint tri-tip commodo sed bacon, esse proident aliquip. Ullamco ham sint fugiat, velit in enim sed mollit nulla cow ut adipisicing nostrud consectetur. Proident dolore beef ribs, laborum nostrud meatball ea laboris rump cupidatat labore culpa. Shankle minim beef, velit sint cupidatat fugiat tenderloin pig et ball tip. Ut cow fatback salami, bacon ball tip et in shank strip steak bresaola. In ut pork belly sed mollit tri-tip magna culpa veniam, short ribs qui in andouille ham consequat. Dolore bacon t-bone, velit short ribs enim strip steak nulla. Voluptate labore ut, biltong swine irure jerky. Cupidatat excepteur aliquip salami dolore. Ball tip strip steak in pork dolor. Ad in esse biltong. Dolore tenderloin exercitation ad pork loin t-bone, dolore in chicken ball tip qui pig. Ut culpa tongue, sint ribeye dolore ex shank voluptate hamburger. Jowl et tempor, boudin pork chop labore ham hock drumstick consectetur tri-tip elit swine meatball chicken ground round. Proident shankle mollit dolore. Shoulder ut duis t-bone quis reprehenderit. Meatloaf dolore minim strip steak, laboris ea aute bacon beef ribs elit shank in veniam drumstick qui. Ex laboris meatball cow tongue pork belly. Ea ball tip reprehenderit pig, sed fatback boudin dolore flank aliquip laboris eu quis. Beef ribs duis beef, cow corned beef adipisicing commodo nisi deserunt exercitation. Cillum dolor t-bone spare ribs, ham hock est sirloin. Brisket irure meatloaf in, boudin pork belly sirloin ball tip. Sirloin sint irure nisi nostrud aliqua. Nostrud nulla aute, enim officia culpa ham hock. Aliqua reprehenderit dolore sunt nostrud sausage, ea boudin pork loin ut t-bone ham tempor. Tri-tip et pancetta drumstick laborum. Ham hock magna do nostrud in proident. Ex ground round fatback, venison non ribeye in.", document.body.insertBefore(A, i), t.cssText = "position:absolute;top:0;left:0;width:5em;text-align:justify;text-justification:newspaper;", r = e.offsetHeight, n = e.offsetWidth, t.cssText = "position:absolute;top:0;left:0;width:5em;text-align:justify;text-justification:newspaper;" + prefixes.join("hyphens:auto; "), o = e.offsetHeight != r || e.offsetWidth != n, document.body.removeChild(A), A.removeChild(e), o
          } catch (d) {
            return !1
          }
        }

        function r(A, e) {
          try {
            var t = createElement("div"),
              r = createElement("span"),
              n = t.style,
              o = 0,
              i = !1,
              d = !1,
              a = !1,
              s = document.body.firstElementChild || document.body.firstChild;
            return n.cssText = "position:absolute;top:0;left:0;overflow:visible;width:1.25em;", t.appendChild(r), document.body.insertBefore(t, s), r.innerHTML = "mm", o = r.offsetHeight, r.innerHTML = "m" + A + "m", d = r.offsetHeight > o, e ? (r.innerHTML = "m<br />m", o = r.offsetWidth, r.innerHTML = "m" + A + "m", a = r.offsetWidth > o) : a = !0, d === !0 && a === !0 && (i = !0), document.body.removeChild(t), t.removeChild(r), i
          } catch (l) {
            return !1
          }
        }

        function n(A) {
          try {
            var e, t = createElement("input"),
              r = createElement("div"),
              n = "lebowski",
              o = !1,
              i = document.body.firstElementChild || document.body.firstChild;
            r.innerHTML = n + A + n, document.body.insertBefore(r, i), document.body.insertBefore(t, r), t.setSelectionRange ? (t.focus(), t.setSelectionRange(0, 0)) : t.createTextRange && (e = t.createTextRange(), e.collapse(!0), e.moveEnd("character", 0), e.moveStart("character", 0), e.select());
            try {
              window.find ? o = window.find(n + n) : (e = window.self.document.body.createTextRange(), o = e.findText(n + n))
            } catch (d) {
              o = !1
            }
            return document.body.removeChild(r), document.body.removeChild(t), o
          } catch (d) {
            return !1
          }
        }
        return document.body || document.getElementsByTagName("body")[0] ? (addTest("csshyphens", function() {
          if (!testAllProps("hyphens", "auto", !0)) return !1;
          try {
            return t()
          } catch (A) {
            return !1
          }
        }), addTest("softhyphens", function() {
          try {
            return r("&#173;", !0) && r("&#8203;", !1)
          } catch (A) {
            return !1
          }
        }), void addTest("softhyphensfind", function() {
          try {
            return n("&#173;") && n("&#8203;")
          } catch (A) {
            return !1
          }
        })) : void setTimeout(A, e)
      }
      var e = 300;
      setTimeout(A, e)
    }), Modernizr.addTest("cssmask", testAllProps("maskRepeat", "repeat-x", !0)), Modernizr.addTest("overflowscrolling", testAllProps("overflowScrolling", "touch", !0)), Modernizr.addTest("cssreflections", testAllProps("boxReflect", "above", !0)), Modernizr.addTest("cssresize", testAllProps("resize", "both", !0)), Modernizr.addTest("scrollsnappoints", testAllProps("scrollSnapType")), Modernizr.addTest("shapes", testAllProps("shapeOutside", "content-box", !0)), Modernizr.addTest("textalignlast", testAllProps("textAlignLast")), Modernizr.addTest("csstransforms", function() {
      return -1 === navigator.userAgent.indexOf("Android 2.") && testAllProps("transform", "scale(1)", !0)
    }), Modernizr.addTest("csstransforms3d", function() {
      var A = !!testAllProps("perspective", "1px", !0),
        e = Modernizr._config.usePrefixes;
      if (A && (!e || "webkitPerspective" in docElement.style)) {
        var t, r = "#modernizr{width:0;height:0}";
        Modernizr.supports ? t = "@supports (perspective: 1px)" : (t = "@media (transform-3d)", e && (t += ",(-webkit-transform-3d)")), t += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}", testStyles(r + t, function(e) {
          A = 7 === e.offsetWidth && 18 === e.offsetHeight
        })
      }
      return A
    }), Modernizr.addTest("csstransformslevel2", function() {
      return testAllProps("translate", "45px", !0)
    }), Modernizr.addTest("csstransitions", testAllProps("transition", "all", !0)), Modernizr.addTest("csspseudotransitions", function() {
      var A = !1;
      if (!Modernizr.csstransitions || !window.getComputedStyle) return A;
      var e = '#modernizr:before { content:" "; font-size:5px;' + Modernizr._prefixes.join("transition:0s 100s;") + "}#modernizr.trigger:before { font-size:10px; }";
      return Modernizr.testStyles(e, function(e) {
        window.getComputedStyle(e, ":before").getPropertyValue("font-size"), e.className += "trigger", A = "5px" === window.getComputedStyle(e, ":before").getPropertyValue("font-size")
      }), A
    }), Modernizr.addTest("userselect", testAllProps("userSelect", "none", !0)), testRunner(), setClasses(classes), delete ModernizrProto.addTest, delete ModernizrProto.addAsyncTest;
  for (var i = 0; i < Modernizr._q.length; i++) Modernizr._q[i]();
  window.Modernizr = Modernizr
}(window, document);

/*! carousel-3d - v0.2.2 - 2015-05-06
 * Copyright (c) 2015 PAIO co.,Ltd.; Licensed MIT */
(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n ? n : e)
      }, l, l.exports, e, t, n, r)
    }
    return n[o].exports
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s
})({
  1: [function(require, module, exports) {
    /*
     *
     *
     *
     * Copyright (c) 2015 PAIO
     * Licensed under the MIT license.
     */

    (function() {
      'use strict';

      var $ = window.jQuery;
      var ChildrenWrapper = require('./ChildrenWrapper');
      var Child = require('./Child');

      /**
       * constructor
       * @param panel
       * @constructor
       */
      var Carousel3d = function(carousel) {
        this.el = carousel;
        this._makeOption();

        //create chlidrenWrapper, children
        var $children = $(carousel).children();
        var childrenWrapperObj = new ChildrenWrapper(this);
        var currentIndex = 0;
        this.appendChildrenWrapper(childrenWrapperObj);
        $children.each(function(index, childContent) {
          if ($(childContent).attr('selected')) {
            currentIndex = index;
          }
          this.appendChild(childContent);
        }.bind(this));

        //create prev/next buttons
        this._prevButton = $('<div data-prev-button></div>')[0];
        $(this.el).append(this._prevButton);
        $(this._prevButton).click(this.prev.bind(this));
        this._nextButton = $('<div data-next-button></div>')[0];
        $(this.el).append(this._nextButton);
        $(this._nextButton).click(this.next.bind(this));

        this.rotate(currentIndex);
      };


      /**
       * Carousel-3D panel element
       * @type {element}
       */
      Carousel3d.prototype.el = null;


      /**
       *
       * @type {{animationDuration: number}}
       */
      Carousel3d.prototype.option = {
        animationDuration: 1000
      };


      /**
       * populate option
       * @private
       */
      Carousel3d.prototype._makeOption = function() {
        (function() {
          var $wrapper = $('<div data-children-wrapper></div>').hide().appendTo(this.el);
          var duration = $('<div data-child></div>').hide().appendTo($wrapper).css('transition-duration');
          $wrapper.remove();
          if (duration) {
            if (duration.indexOf('ms') > 0) {
              this.option.animationDuration = parseInt(duration);
            } else if (duration.indexOf('s') > 0) {
              this.option.animationDuration = parseInt(duration) * 1000;
            }
          }
        }.bind(this))();

      };


      /**
       * remove chlid
       * @param index|selector(string)|element|jQuery instance of element
       */
      Carousel3d.prototype.removeChild = function(index) {
        this._childrenWrapperObj.removeChild(index);
      };

      /**
       * append chlid
       * @param content
       */
      Carousel3d.prototype.appendChild = function(content) {
        this._childrenWrapperObj.appendChild(new Child(this._childrenWrapperObj, content));
      };


      /**
       * append ChildrenWrapper object
       * @param childrenWrapperObj
       */
      Carousel3d.prototype.appendChildrenWrapper = function(childrenWrapperObj) {
        this._childrenWrapperObj = childrenWrapperObj;
        $(this.el).append(childrenWrapperObj.el);
      };


      /**
       * rotate carousel
       * @param index
       */
      Carousel3d.prototype.rotate = function(index) {
        var numChildren = this._childrenWrapperObj.numChildren();
        var iFloor = Math.floor(this._childrenWrapperObj.currentIndex() - numChildren / 2);
        var iCeil = Math.ceil(this._childrenWrapperObj.currentIndex() + numChildren / 2);
        while (index < iFloor) {
          index += numChildren;
        }
        while (iCeil < index) {
          index -= numChildren;
        }

        this._childrenWrapperObj.rotate(index);
        window.setTimeout(function() {
          var i = index;
          while (i < 0) {
            i += this._childrenWrapperObj.numChildren();
          }
          $(this.el).trigger('select', i % this._childrenWrapperObj.numChildren());
        }.bind(this), this.option.animationDuration);
      };

      /**
       * make carousel spin prev
       */
      Carousel3d.prototype.prev = function() {
        this.rotate(this._childrenWrapperObj.currentIndex() - 1);
      };

      /**
       * make carousel spin next
       */
      Carousel3d.prototype.next = function() {
        this.rotate(this._childrenWrapperObj.currentIndex() + 1);
      };



      /**
       * Exposed to jquery.
       * @returns {*}
       */
      $.fn.Carousel3d = function() {
        var self = this,
          opt = arguments[0],
          args = Array.prototype.slice.call(arguments, 1),
          l = self.length,
          i = 0,
          ret;
        for (i; i < l; i += 1) {
          if (typeof opt === 'object' || typeof opt === 'undefined') {
            self[i].Carousel3d = new Carousel3d(self[i], opt);
          } else {
            ret = self[i].Carousel3d[opt].apply(self[i].Carousel3d, args);
          }
          if (ret !== undefined) {
            return ret;
          }
        }
        return self;
      };


      /**
       * initialize on load
       */
      $(function() {
        $('[data-carousel-3d]').Carousel3d();
      });

    })();

  }, {
    "./Child": 2,
    "./ChildrenWrapper": 3
  }],
  2: [function(require, module, exports) {
    /*
     *
     *
     *
     * Copyright (c) 2015 PAIO
     * Licensed under the MIT license.
     */
    (function() {
      "use strict";

      var $ = window.jQuery;
      var Modernizr = window.Modernizr;

      var Child = function(childrenWrapperObj, content) {
        this._childrenWrapperObj = childrenWrapperObj;
        this._content = content;

        //manipulate dome
        this.el = $('<div data-child />')[0];
        this._frame = $('<div data-child-frame />')[0];
        this._contentWrapper = $('<div data-content-wrapper />')[0];
        $(this.el).append(this._frame);
        $(this._frame).append(this._contentWrapper);
        $(this._contentWrapper).append(content);

        this._hideUntilLoad();
      };


      Child.prototype._childrenWrapperObj = null;

      Child.prototype._content = null;

      Child.prototype.el = null;

      Child.prototype._contentWrapper = null;

      Child.prototype._hideUntilLoad = function() {
        $(this._content).css('visibility', 'hidden');
        $(this._contentWrapper).waitForImages(function() {
          setTimeout(function() {
            this._resize();
            $(this._content).resize(this._resize.bind(this));
            $(this.el).resize(this._resize.bind(this));
            $(this._content).css('visibility', 'visible');
          }.bind(this), 1);
        }.bind(this));
      };

      Child.prototype._resize = function() {
        $(this._contentWrapper).width($(this._content).outerWidth());
        $(this._contentWrapper).height($(this._content).outerHeight());

        var horizontalFrameDiff = $(this._frame).outerWidth() - $(this._frame).innerWidth();
        var vertialFrameDiff = $(this._frame).outerHeight() - $(this._frame).innerHeight();
        var horizontalScale = ($(this.el).innerWidth() - horizontalFrameDiff) / $(this._content).outerWidth();
        var verticalScale = ($(this.el).innerHeight() - vertialFrameDiff) / $(this._content).outerHeight();
        var scale = Math.min(horizontalScale, verticalScale);
        var horizontalOffset = Math.floor(($(this.el).innerWidth() - horizontalFrameDiff - ($(this._content).outerWidth() * scale)) / 2);
        var verticalOffset = Math.floor(($(this.el).innerHeight() - vertialFrameDiff - ($(this._content).outerHeight() * scale)) / 2);

        $(this._frame).width($(this._content).outerWidth() * scale);
        $(this._frame).height($(this._content).outerHeight() * scale);
        $(this.el).css('padding-left', horizontalOffset + 'px');
        $(this.el).css('padding-top', verticalOffset + 'px');
        if (Modernizr.csstransforms) {
          $(this._contentWrapper).css('transform', 'scale(' + scale + ')');
          $(this._contentWrapper).css('-ms-transform', 'scale(' + scale + ')');
          $(this._contentWrapper).css('-moz-transform', 'scale(' + scale + ')');
          $(this._contentWrapper).css('-webkit-transform', 'scale(' + scale + ')');
        } else {
          $(this._contentWrapper).css('filter', 'progid:DXImageTransform.Microsoft.Matrix(M11=' + scale + ', M12=0, M21=0, M22=' + scale + ', SizingMethod="auto expand")');
          $(this._contentWrapper).css('-ms-filter', 'progid:DXImageTransform.Microsoft.Matrix(M11=' + scale + ', M12=0, M21=0, M22=' + scale + ', SizingMethod="auto expand")');
        }
      };




      module.exports = Child;
    })();

  }, {}],
  3: [function(require, module, exports) {
    /*
     *
     *
     *
     * Copyright (c) 2015 PAIO
     * Licensed under the MIT license.
     */
    (function() {
      "use strict";

      var $ = window.jQuery;

      var ChildrenWrapper = function(carousel3dObj) {
        this._childObjArray = [];
        this._carousel3dObj = carousel3dObj;
        this.el = $('<div data-children-wrapper></div>')[0];
        $(carousel3dObj.el).resize(this._resize.bind(this));
      };

      /**
       * ChildrenWrapper element
       * @type {element}
       */
      ChildrenWrapper.prototype.el = null;

      ChildrenWrapper.prototype._carousel3dObj = null;

      ChildrenWrapper.prototype._childObjArray = [];

      ChildrenWrapper.prototype._currentIndex = 0;

      ChildrenWrapper.prototype._tz = 0;

      ChildrenWrapper.prototype._spacing = 0.05;


      ChildrenWrapper.prototype.currentIndex = function(index) {
        if (typeof index !== 'undefined' && typeof index !== 'object' && !isNaN(index)) {
          this._currentIndex = index;
        }
        return this._currentIndex;
      };


      ChildrenWrapper.prototype._resize = function() {
        this._tz = ($(this.el).outerWidth() / 2) / Math.tan(Math.PI / this._childObjArray.length);
        this.rotate(this._currentIndex);
      };

      /**
       * append Child object
       * @param childObj
       */
      ChildrenWrapper.prototype.appendChild = function(childObj) {
        this._childObjArray.push(childObj);
        $(this.el).append(childObj.el);

        this._resize();
      };


      /**
       * remove Child object
       * @param index|selector(string)|element|jQuery instance of element
       */
      ChildrenWrapper.prototype.removeChild = function(index) {
        function isInt(value) {
          return !isNaN(value) &&
            parseInt(Number(value)) == value &&
            !isNaN(parseInt(value, 10));
        }

        if (isInt(index)) {
          if (index in this._childObjArray) {
            var child = this._childObjArray[index];
            $(child.el).remove();
            this._childObjArray.splice(index, 1);
            this._resize();
            return true;
          } else {
            return false;
          }
        } else {
          var ele = null;
          if (typeof index == "string") {
            ele = $(index).get();
          }
          if (typeof index == "object") {
            if (index instanceof jQuery) ele = index.get();
            else ele = index;
          }
          if (ele != null) {
            $(this._childObjArray).each(function(i, e) {
              if (e._content == ele) {
                var child = this._childObjArray[i];
                $(child.el).remove();
                this._childObjArray.splice(i, 1);
                this._resize();
                return true;
              }
            });
          } else return false;
        }
      };


      /**
       * return number of children
       * @returns {Number}
       */
      ChildrenWrapper.prototype.numChildren = function() {
        return this._childObjArray.length;
      };


      /**
       *
       * @param index
       */
      ChildrenWrapper.prototype.rotate = function(index) {
        this.currentIndex(index);
        var dDegree = 360 / this._childObjArray.length;
        var childIndex = 0;
        var childDegree = 0;
        if (Modernizr.csstransforms3d) {
          for (childIndex = 0; childIndex < this._childObjArray.length; childIndex += 1) {
            childDegree = dDegree * (childIndex - index);
            var transformText = '';
            transformText += ' translateZ(' + -this._tz * (1 + this._spacing) + 'px)';
            transformText += ' rotateY(' + childDegree + 'deg)';
            transformText += ' translateZ(' + this._tz * (1 + this._spacing) + 'px)';

            $(this._childObjArray[childIndex].el).css('transform', transformText);
            $(this._childObjArray[childIndex].el).css('-ms-transform', transformText);
            $(this._childObjArray[childIndex].el).css('-moz-transform', transformText);
            $(this._childObjArray[childIndex].el).css('-webkit-transform', transformText);

            $(this._childObjArray[childIndex].el).css('opacity', Math.cos(Math.PI / 180 * childDegree));
            $(this._childObjArray[childIndex].el).css('z-index', Math.floor((Math.cos(Math.PI / 180 * childDegree) + 1) * 100));


            var i = index < 0 ? (index < (this._childObjArray.length) * (-1) ? this._childObjArray.length - (index * (-1) % this._childObjArray.length) : this._childObjArray.length + index) : index;
            childIndex == (i > this._childObjArray.length - 1 ? i % this._childObjArray.length : i) ?
              $(this._childObjArray[childIndex].el).attr("data-child-active", true) :
              $(this._childObjArray[childIndex].el).removeAttr("data-child-active");

          }
        } else {
          var width = $(this.el).width();
          var height = $(this.el).height();

          var stepFunc = function(now, tween) {

            if (tween.prop === '_degree') {
              var sin = Math.sin(Math.PI / 180 * now);
              var cos = Math.cos(Math.PI / 180 * now);
              var halfDegreeRange = dDegree / 2;
              var perspectiveScale = Math.abs(Math.sin(Math.PI / 180 * (now + halfDegreeRange)) - Math.sin(Math.PI / 180 * (now - halfDegreeRange))) / (Math.sin(Math.PI / 180 * halfDegreeRange) * 2) * cos;
              var heightScale = (cos + 1) / 2;
              var widthScale = (perspectiveScale + 1) / 2;
              var dx = (sin * width / 2 + (width * widthScale / 2 * sin)) / 2;

              $(tween.elem).css('z-index', Math.floor((cos + 1) * 100));
              if (Modernizr.csstransforms) {
                $(tween.elem).css('left', dx + 'px');
                $(tween.elem).css('opacity', cos);
                $(tween.elem).css('transform', 'scale(' + widthScale + ', ' + heightScale + ')');
                $(tween.elem).css('-ms-transform', 'scale(' + widthScale + ', ' + heightScale + ')');
                $(tween.elem).css('-moz-transform', 'scale(' + widthScale + ', ' + heightScale + ')');
                $(tween.elem).css('-webkit-transform', 'scale(' + widthScale + ', ' + heightScale + ')');
              } else {
                $(tween.elem).css('top', Math.floor((height - height * heightScale) / 2) + 'px');
                $(tween.elem).css('left', ((width - width * widthScale) / 2 + dx) + 'px');
                $(tween.elem).css('filter', 'progid:DXImageTransform.Microsoft.Matrix(M11=' + widthScale + ', M12=0, M21=0, M22=' + heightScale + '), progid:DXImageTransform.Microsoft.Alpha(Opacity=' + cos * 100 + ')');
                $(tween.elem).css('-ms-filter', 'progid:DXImageTransform.Microsoft.Matrix(M11=' + widthScale + ', M12=0, M21=0, M22=' + heightScale + '), progid:DXImageTransform.Microsoft.Alpha(Opacity=' + cos * 100 + ')');
              }
            }
          };

          for (childIndex = 0; childIndex < this._childObjArray.length; childIndex += 1) {
            childDegree = dDegree * (childIndex - index);

            $(this._childObjArray[childIndex].el).animate({
              '_degree': childDegree
            }, {
              duration: this._carousel3dObj.option.animationDuration,
              step: stepFunc.bind(this)
            }, function() {
              var i = index < 0 ? (index < (this._childObjArray.length) * (-1) ? this._childObjArray.length - (index * (-1) % this._childObjArray.length) : this._childObjArray.length + index) : index;
              childIndex == (i > this._childObjArray.length - 1 ? i % this._childObjArray.length : i) ?
                $(this._childObjArray[childIndex].el).attr("data-child-active", true) :
                $(this._childObjArray[childIndex].el).removeAttr("data-child-active");
            });
          }
        }

      };

      module.exports = ChildrenWrapper;
    })();

  }, {}]
}, {}, [1]);

(function() {
  "use strict";
  var originalResize = $.fn.resize;
  //TODO IE call resize infinite. patch jquery.resize then replace
  $.fn.resize = function(callback) {
    var width = $(this).width();
    var height = $(this).height();
    originalResize.call(this, function() {
      if ($(this).width() !== width || $(this).height() !== height) {
        width = $(this).width();
        height = $(this).height();
        callback(this);
      }
    }.bind(this));
  };
})();

;
//begin of my scripts of 3d carousel
function addClassesCarousel() {
  $('[data-carousel-3d]').on('select', function(evt, index) {

    $('.js-prev-slide').removeClass('js-prev-slide');
    $('.js-next-slide').removeClass('js-next-slide');


    if ($("[data-child-active]").prev().length) {
      $("[data-child-active]").prev().addClass('js-prev-slide');
    } else {
      $('[data-child]').last().addClass('js-prev-slide');
    }
    if ($("[data-child-active]").next().length) {
      $("[data-child-active]").next().addClass('js-next-slide');
    } else {
      $('[data-child]').first().addClass('js-next-slide');
    }




  });

}
$(window).on('load', function() {
  addClassesCarousel();




});

//end of my scripts of 3d carousel
