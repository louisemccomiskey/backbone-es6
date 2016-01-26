/**
 * Home Page.
 *
 * What does it do?
 *
 * @author Louise McComiskey <louise@rehabstudio.com>
 */

'use strict';
// --------------------------
// Loading dependencies
// --------------------------

import _ from 'underscore';
import Backbone from 'backbone';
import BaseView from 'baseView';
import template from './../templates/index.hbs';

export default class HomeView extends BaseView{
    
     constructor() {
        console.info('--> HomeView constructor()');
        super({
            tagName:  'section',
            className: 'view view-home',
            
            template: template,
            
            events: {
                
            },
            
            ui: {
                
            }
            
//          components: {
//                'localeSelector' : new LocaleSelector()
//          }
        });
    }

    /*
    */
    render() {
        console.log('this', this);
         console.info('--> HomeView render()', this.el);
//        var self = this;
//
//        this.el.innerHTML = this.template({});
//
//        // Setup the locale selector component.
////        let localeWrapper = this.el.querySelector('.js-locale-selector-ctn');
////        localeWrapper.appendChild(this.components.localeSelector.render().el);
//
//        this.bodyElement = document.querySelector('body');
//        this.bodyElement.classList.remove('hide-overflow');
//
//        
//        setTimeout(() => {
//            self.bindUIElements();
//            self.animatePageIn().then(self.pageAnimatingInCompleted.bind(self));
//        }, 0);
//
//        return this;
    }

    /*
    *  Page has fully loaded and animated in at this point.
    *  Update picturefill when a views template has loaded.
    *  Creating any child components etc here.
    */
    pageAnimatingInCompleted() {
        super.pageAnimatingInCompleted();
    }


//    async fetchData(){
//        // disable click events anywhere else on the page when this is in progress and page is animating.
//        // To stop errors ocurring if user change locale whilst this is in progress.
//        this.bodyElement.classList.add('disable-events');
//
//        await this.getUserMovie();
//        this.getTaggableFriends();
//        this.getUserPhotos();
//    }

    dispose() {
        console.info('--- HomePage.dispose');

        // Need to correctly dispose of all components here.
//        if(this.components) {
//            _.each(this.components, function(selector, key) {
//                selector.dispose();
//            }, this);
//        }
        super.dispose();
    }
}
