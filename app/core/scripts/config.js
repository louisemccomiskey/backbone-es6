'use strict';

// Loading dependencies.
import utils from 'utils';
import dataStore from 'dataStore';

// Configuration is extended to include bootstrapped data.
const config = Object.assign({}, {

    baseUrl: `${window.location.origin}/static/dist/`,
    assetUrl: '/static/dist/',

    // Backbone router just fired and locale was retreived.
    // update the config statemap and only then init the Statemanager.
    stateMap: {
        STATE_LANDING: '',
        STATE_CHOOSE_FRIEND: 'choose-friend',
        STATE_CHOOSE_GREETING: 'choose-greeting',
        STATE_CHOOSE_NAME: 'choose-name',
        STATE_CHOOSE_PHOTOS:'choose-photos',
        STATE_PROCESS_VIDEO: 'processing-video',
        STATE_PREVIEW_VIDEO: () => `preview-video/${dataStore.uuid}/`,
        STATE_PUBLISH_CONFIRMATION:'publish-confirmation',
        STATE_ERROR: dataStore.localeUrl+'error'
    },

    titleMap: {
        'home' : 'home',
        'nextPage' : 'next Page'
    },

    documentWidth: document.documentElement.clientWidth,
    documentHeight: document.documentElement.clientHeight,

    is_IE11: !!navigator.userAgent.match(/Trident.*rv[ :]*11\./),
    is_IE10: (utils.getIEVersion() === 10) ? true : false,
    is_iosChrome: navigator.userAgent.match('CriOS')
});

export default config;