/* eslint-disable  no-undef */

// Regenerator
import '@babel/polyfill';

// Base
import Vue from 'vue';
import store from './store';
import { router } from './routes';

// import VueScrollmagic from 'vue-scrollmagic';
// Vue.use(VueScrollmagic);
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('assets/images/', true));

new Vue({
    el: '#app',
    store,
    router,
    template: '<App />',
    components: {
        App: () => import('./App')
    }
});