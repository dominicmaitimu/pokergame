// Base
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { initialState } from 'store/state';

const state = initialState();

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
};