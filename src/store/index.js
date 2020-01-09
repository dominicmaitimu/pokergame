// Base
import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import Poker from './modules/Poker';

// Set Store
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Poker
    }
});