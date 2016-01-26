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

@props({
    tagName:    'section',
    className:  'page page-about',
    template:   template,
    events:     {
      'click .js-FB__login'   : 'onLogin',
    },
    ui:{}
})
export default class AboutView extends BaseView{

    constructor(o) {
        super(o);
    }

    render() {
        console.info('--> AboutView render()');

        this.el.innerHTML = this.template({});
      
        setTimeout(() => {
           this.bindUIElements();
           this.animatePageIn().then(this.pageAnimatingInCompleted.bind(this));
        }, 0);

       return this;
    }

    /*
    *  Page has fully loaded and animated in at this point.
    *  Creating any child components etc here.
    */
    pageAnimatingInCompleted() {
        super.pageAnimatingInCompleted();
    }

    dispose() {
        console.info('--> AboutView.dispose');
        super.dispose();
    }
}
