/*
* Application router.
* @author Daniel Sketon <daniel.skelton@rehabstudio.com>
* @author Louise McComiskey <louise@rehabstudio.com>
*/

'use strict';

import Backbone from 'backbone';
import eventBus from 'eventBus';

export default new class Router extends Backbone.Router{
    
    constructor() {
        super({
            routes:  {
                '(/)'       : 'home',
                'about(/)'  : 'about' 
            }
        });
    }
    
	initialize(){
		this.routeHistory = [];
	}

	home() {
		this.changePage({id :'home'});
	}
	about() {
        this.changePage({id :'about'});
	}

	/*
		Every page change event both client and server side fire this method.
		Save state whilst browsing.
		Fires the eventBus CHANGE_PAGE passing the parameters. App.js listens for this event and start the loading view process.
		Also need to update the landscape overlay. Landscape mode needs to be renabled on the preview-video page so the video can be played in landscape mode on smaller screens.
		@param options - object. id- required id of targetted page. Optional locale and uuid if preview-video page.
	*/
	changePage(options) {
		console.info('ROUTER -- Switching to the', options.id, ' page.', options);
	
    	this.setTitle(options.id);

		eventBus.trigger(eventBus.eventKeys.CHANGE_PAGE, options, false);
	}

	setTitle(title){
		document.title = title;
	}
}
