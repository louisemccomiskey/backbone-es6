'use strict';

// Loading dependencies.
import Backbone from 'backbone';

const eventBus = Object.assign({}, {
    eventKeys: {
        CHANGE_PAGE: 'app.changePage',
        PAGE_NAVIGATE: 'app.navigatePage',
        PAGE_ANIMATED_IN_COMPLETE: 'app.pageAnimatedInComplete',

        WINDOW_RESIZE: 'app.windowResize',
    }
}, Backbone.Events);

export default eventBus;
