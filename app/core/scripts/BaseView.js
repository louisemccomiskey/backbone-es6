/**
 * BASEVIEW used by views and some components.
 * 
 * Contains global methods that can be shared for e.g
 * animatePageIn() and animatePageOut(),
 * bindUIElements(), unbindUiElements() - borrowed from Marionette.
 * Super dispose() which calls backbones this.remove();
 *
 * @author Louise McComiskey <louise@rehabstudio.com>
 */

'use strict';

// Loading dependencies.
import _ from 'underscore';
import Backbone from 'backbone';
import eventBus from 'eventBus';
import config from 'config';
import utils from 'utils';
import dataStore from 'dataStore';

/*
*  Base View of all Page views, each method can be accessed via the prototype chain or can be overridden.
*/
export default class BaseView extends Backbone.View {

    constructor(o) {
        super(o);
        this.bodyElement = document.querySelector('body');
    }

    /* Example Base Render - overridden in all views */
    render() {
        this.el.innerHTML = this.template();

        setTimeout(() => {
            this.bindUIElements();
        }, 0);
    }

    /* Grabs all the image elements per view that need to be pre loaded. */
    get batch() {
        return [...this.el.querySelectorAll('.js-preload-image')];
    }

    /*
    *   Fired when each view Transition In has completed
    *   PAGE_ANIMATED_IN_COMPLETE triggers the SelectScreenBg to update it's height.
    */
    pageAnimatingInCompleted() {
        eventBus.trigger(eventBus.eventKeys.PAGE_ANIMATED_IN_COMPLETE);
    }

    /*
    *   Main Page Transition OUT.
    *   Called from each views render();
    */
    animatePageIn() {
        //Scroll to the top of the page
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        var PromiseA = new Promise(function(resolve, reject) {
            resolve();
        });

        var PromiseB = new Promise(function(resolve, reject) {
            resolve();
        });

        return Promise.all([PromiseA, PromiseB]);
    }

    /*
    *   Main Page Transition OUT.
    *   Called from App.loadView();
    *   Returns a deferred when complete in order to dispose of views.
    */
    animatePageOut() {
        var PromiseA = new Promise(function(resolve, reject) {
            resolve();
        });

        var PromiseB = new Promise(function(resolve, reject) {
            resolve();
        });

        return Promise.all([PromiseA, PromiseB]);
    }

    /**
     *  Takes an object of selector strings and names, converting them
     *  into actual DOM node references. Stores the original string map
     *  object for unbinding or if a view was to re-render.
     *
     *  Example usage within view object:
     *  ui: {
     *      playButton: '.js-play--btn'
     *  }
     */
    bindUIElements() {
      if (!this.ui) { return; }

      if (!this._uiBindings) {
        this._uiBindings = this.ui;
      }

      var bindings = _.result(this, '_uiBindings');

      this.ui = {};

      _.each(bindings, function(selector, key) {
        this.ui[key] = this.el.querySelector(selector);
      }, this);
    }

    /**
     *  Deletes any references to selectors from the `ui` object before
     *  restoring it back to the original string selectors.
     */
    unbindUIElements() {
      if (!this.ui || !this._uiBindings) { return; }

        // delete all of the existing ui bindings
        _.each(this.ui, function($el, name) {
          delete this.ui[name];
        }, this);

        // reset the ui element to the original bindings configuration
        this.ui = this._uiBindings;
        delete this._uiBindings;
    }

    /**
     *  Wrapper method that should be overriden in views requiring more
     *  specific teardown logic (such as having to unbind listeners,
     *  nullify objects or nullify cached selectors.
     */
    dispose() {
        console.log('---dispose of BASEVIEW');
        this.unbindUIElements();
        this.remove();
    }
}
