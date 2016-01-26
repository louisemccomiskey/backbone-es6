'use strict';

// Loading dependencies.
import Backbone from 'backbone';
import ImagePreloader from 'imagePreloader';
import config from 'config';

/**
 *  Constructor for the Utility class.
 */
function Utils() {
    this.matchesSelector = this.getMatchesSelector();
}

/*
  Capitilises the first letter of a string.
*/
Utils.prototype.Capitalize = function(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

Utils.prototype.srcset = function(obj){
    return Object.keys(obj)
      .sort((a, b) => a - b)
      .map(key => obj[key] + ' ' + key +'w')
      .join(', ')
}

Utils.prototype.PreloadImages = function(domNodes, delay=0, useCurrentSrc=true) {

    return new Promise((resolve, reject) => {

        var count = 0;
        function updateNode(node){
            node.classList.add('is-loaded');
            node.classList.remove('js-preload-image');
            node.parentNode.classList.add('img-is-loaded');
            node = null;
            count++;

            if(count === domNodes.length){
                resolve();
            }
        }


        function PreloadAsPromise(img) {
          /*
            Resolve the loaded image if the browser has calculated its currentSrc
            If not, recursivly check every 'x' ms until condition is met
            resolve the img
          */
            return new Promise((complete, reject) => {
                function _get(img){
                    var src = (useCurrentSrc && (typeof img.currentSrc !== "undefined") ) ? img.currentSrc : img.src;

                    if(!src){
                        setTimeout(() => _get(img), 40)
                    } else{
                        new ImagePreloader(src, () => complete(img));
                    }
                }
                _get(img);
            })
        }

        function process(){

            if( (!config.is_IE11) && (!config.is_IE10) ){ // IE errors when the below event fires.
                window.dispatchEvent(new Event('resize')); // safari bug on loading images resize event needs to be fired.
            }
            domNodes.forEach(img => PreloadAsPromise(img).then(updateNode))
        }

        delay ? setTimeout(process, delay) : process();
    });
}


/**
 *  Returns a function, that, when invoked, will only be triggered at most once
 *  during a given window of time. Normally, the throttled function will run as
 *  much as it can, without ever going more than once per wait duration; but if
 *  you’d like to disable the execution on the leading edge, pass
 *  { leading: false }. To disable execution on the trailing edge, ditto.
 *
 *  @param object func - Method to execute.
 *  @param number wait - Desired wait time in millseconds.
 *  @return function
 */
Utils.prototype.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;

    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    return function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;

        if (remaining <= 0 || remaining > wait) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }

        return result;
    };
};

Utils.prototype.getTransformPrefix = function() {
    var testElement = document.createElement('div');

    var transformNames = ['transform','webkitTransform','MozTransform','msTransform','OTransform'];

    for (var key in transformNames) {
        if( testElement.style[transformNames[key]] !== undefined ) {
            return transformNames[key];
        }
    }
};

/* 
* http://paulirish.com/2011/requestanimationframe-for-smart-animating/
* http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
* requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
*/ 

// MIT license
Utils.prototype.rafPolyFill = function() {

    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                       || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());
};


/**
 * Returns a reference to the relevant prefixed or newer unprefixed
 * matchesSelector method.
 *
 * @returns {Function}
 */
Utils.prototype.getMatchesSelector = function() {
    // Caches a local reference to `Element.prototype` for faster access.
    var ElementPrototype = (typeof Element !== 'undefined' && Element.prototype) || {};

    // Determine the correct way of calling matches (older browsers use matchesSelector prefixed).
    var matchesSelector = ElementPrototype.matches ||
                          ElementPrototype.webkitMatchesSelector ||
                          ElementPrototype.mozMatchesSelector ||
                          ElementPrototype.msMatchesSelector ||
                          ElementPrototype.oMatchesSelector;

    return matchesSelector || null;
};


/**
 * Traverses the DOM upward from an element in an attempt to find
 * a parent element matching a chosen selector.
 *
 * @param   {Object}   startingElement
 * @param   {String}   targetSelector
 * @returns {Object}
 */
Utils.prototype.getParent = function(startingElement, targetSelector) {

    if (typeof(startingElement.tagName) !== 'string') {
        throw new Error('utils:getParent - Supply a valid DOM element.');
    }

    if (typeof(targetSelector) !== 'string') {
        throw new Error('utils:getParent - Supply a selector string.');
    }

    var currentElement = startingElement,
        targetElement = null;

    while (currentElement.parentNode) {
        if (this.matchesSelector.call(currentElement, targetSelector)) {
            targetElement = currentElement;
            break;
        }

        currentElement = currentElement.parentNode;
    }

    return targetElement;
};

/**
 *  Uses a regular expression to determine which IE version.
 *  This only works for version 10 and below.
 *  config.isIE11 check for IE11 separately.
 *  @return int - Either -1 or actual version.
 */
Utils.prototype.getIEVersion = function() {
    var versionExpression = /MSIE (\d+\.\d+);/;
    var versionNumber = -1;

    // RegExp.$1 returns the last matched expression portion.
    // In this case it will be the version number of IE.
    if (versionExpression.test(navigator.userAgent)) {
        versionNumber = parseInt(RegExp.$1, 10);
    }
    return versionNumber;
};

module.exports = new Utils();
