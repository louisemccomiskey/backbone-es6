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

var backboneWrapper = {

Backbone.ajax = NativeAjax;
Backbone.View = NativeView;

return Backbone;

}

module.exports = backboneWrapper;