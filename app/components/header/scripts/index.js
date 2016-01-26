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
import {props} from 'decorators';
import eventBus from 'eventBus';

@props({
    template:   template,
    events:     {
      'click .js-nav-link'   : 'onToggleNavigation',
    },
    ui:{}
})

export default class HeaderView extends BaseView{
    constructor(o) {
        super(o);

        this.parent = o.parent;

        //Event Listeners.
        // this.listenTo(eventBus, eventBus.eventKeys.UPDATE_NAV, this.updateNavigation);

        this.render();
    }

    /*
        Renders template and passes all the button translations into it.
        There is more than one back buttons and next buttons, so we grab all of each type and store them in the as in arrays within this.buttonType,
        This means when when need to hide the back button for e,g, we just need to loop through this set and it will hide all instances.
    */
    render() {
        console.info('--> HeaderComponent render()');
        var self = this;

        this.el.innerHTML = this.template({});

        setTimeout(() => {
            this.bindUIElements();
            this.animatePageIn().then(this.pageAnimatingInCompleted.bind(this));
        }, 0);

        return this;
    }

    onToggleNavigation(event){
      event.preventDefault();

      var href = event.target.getAttribute('href');
      eventBus.trigger(eventBus.eventKeys.PAGE_NAVIGATE, href);
    }

    /*
    *  Page has fully loaded and animated in at this point.
    *  Creating any child components etc here.
    */
    pageAnimatingInCompleted() {
        super.pageAnimatingInCompleted();
    }

    dispose() {
        console.info('--> HeaderComponent.dispose');
        super.dispose();
    }
}
