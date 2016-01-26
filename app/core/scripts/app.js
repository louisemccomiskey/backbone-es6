/**
 * Loading Main APP.
 *
 * @author Louise McComiskey <louise@rehabstudio.com>
 */
'use strict';

console.info('App Page Loading Dependancies 2');

// Loading Dependancies.
import _ from 'underscore';
import Backbone from 'backbone';
import config from 'config';
import eventBus from 'eventBus';
import router from 'router';
import FastDOM from 'fastdom';
import utils from 'utils';

//Import Components

//Import Views
import HomeView from '../../views/home/scripts/index';
// import AboutView from '../../views/about/scripts/index';


var App = {
    currentView : false,
    oldView : false,
    currentId: null,

    views: {
        'home': {
            view: HomeView
        },
        'about': {
            // view: AboutView
        }
    },

    init: function(){
        console.info('--> App.init()');

        this.mainContainer = document.querySelector('.js-gbl-container');

        // this.setUpGlobalComponents();
        this.setUpGlobalEventListeners();

        Backbone.history.start({pushState: true});
    },

    /*
    *   Create all the Global Components:
    *   Header etc.
    */
    setUpGlobalComponents: function(){

//        var globalHeader = new HeaderComponent({
//            el: document.querySelector('.js-gbl-header'),
//            parent: this
//        });  
    },

    setUpGlobalEventListeners: function() {
        var self = this;
        /*
        *   Fired from any click on wigdets, buttons or navigation that are to go to a new page.
        *   Fires off the router navigate and goes to the correct page using the href targetRoute.
        *   router.navigate wil then fire CHANGE_PAGE below which will start to load the loadView
        *   @param: targetRoute - string - the href of the clicked link e.g /work/
        */
        eventBus.on(eventBus.eventKeys.PAGE_NAVIGATE, function(targetRoute) {
            router.navigate(targetRoute, {trigger: true});
        });

        /*
        * Starts to load new view, should only ever be fired from the router.
        */
        eventBus.on(eventBus.eventKeys.CHANGE_PAGE, function(options) {
            self.loadView(options);
        });

        /*
            Global onResize event Handler, triggers the eventBus.eventKeys.WINDOW_RESIZE so all views can use.
        */ 
        window.addEventListener('resize', utils.throttle(function() {
           config.documentWidth = document.documentElement.clientWidth;
           config.documentHeight = document.documentElement.clientHeight;
           eventBus.trigger(eventBus.eventKeys.WINDOW_RESIZE, config.documentWidth, config.documentHeight);
        }, 1000 / 10, { trailing: true }));
    },


    /**
    * Fired when moving to a new view. Sets up the new view and removes the old one.
    * If there already is a view visible we need to animate that out and dispose of it before loading a new one.
    * If not then we just render the new one.
    * @param  options - object from router.js id - required, uuid/ locale - required from preview-video deeplink.
    */
    loadView: function(options) {
        console.log(options, 'options loadView');

        // Set the current view to be the old view before updating to the new current view.
        this.currentId = options.id;
        this.oldView = this.currentView;

        let View = this.views[this.currentId].view;
        this.currentView = new View();

        /*
        If there is an old view animate it out and dispose of it before rendering the new view.
        otherwise render the new view.
        */
        if (this.oldView) {
            this.oldView.animatePageOut().then(this.disposeofOldView.bind(this));
        } else {
            this.startRenderingView();
        }
    },

    /*
        If an old/previous view exists we need to animate it out and dispose of it correctly
        before starting to render any new views.
    */
    disposeofOldView: function() {
        this.oldView.dispose();

        setTimeout(() => {
            this.startRenderingView();
            this.oldView = null;
        }, 0);
    },

    startRenderingView: function() {
       
        // FastDOM.write(function() {
            var self = this;
            self.mainContainer.appendChild(self.currentView.render().el);
        // }, this);
    }
};

module.exports = App;
