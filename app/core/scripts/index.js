/**
 * Application Start.
 *
 * @author Louise McComiskey <louise@rehabstudio.com>
 */
'use strict';

// --------------------------
// Loading dependencies
// --------------------------
import Backbone from 'backbone';
import NativeAjax from 'backbone.nativeajax';
import NativeView from 'backbone.nativeview';

Backbone.ajax = NativeAjax;
Backbone.View = NativeView;

// import App from 'App';
var App = require('./app');
// var App = require('app');

console.log(Backbone.View, 'BackboneView');
/**
 *  Kicks off the App as soon as onDOMContentLoaded is ready.
 */

function onDOMContentLoaded() {
    console.log('App', App);
   // new App();
   App.init();
}


/*
*   Only start application logic once the DOM is ready.
*   using async on the main.min.js script element therefore the DOMContentLoaded could have already loaded before we start listening for it.
*   If this is the case listen for document.readyState and if it is finished fire onDOMContentLoaded().
*/
if(document.readyState === 'complete' || document.readyState === 'interactive' || document.readyState === 'loaded' ) {
    onDOMContentLoaded();
} else {
    document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
}
