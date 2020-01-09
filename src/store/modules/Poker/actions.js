/* eslint-disable no-unused-vars */

import * as S from './sideeffects';

const setBet = (context, amount) => {
    context.commit('SET_BET', amount);
};

const setDeal = (context, array) => {
    context.commit('SET_DEAL', array);
};

const setDraw = (context, status) => {
    context.commit('SET_DRAW', status);
};

const setNewRound = (context) => {
    context.commit('SET_NEW_ROUND');
};

const foldRound = (context, amount) => {
    context.commit('FOLD_ROUND', amount);
};

const updateBet = (context, amount) => {
    context.commit('UPDATE_BET', parseInt(amount));
};

const getChips = (context, selected) => {
    context.commit('GET_CHIPS', selected);    
};

const updateChips = (context, id) => {
    context.commit('UPDATE_CHIPS', id);   
};

const getUserCards = (context, cards) => {
    context.commit('GET_USER_CARDS', S.getFirstCards(cards));
};

const getDealerCards = (context, cards) => {
    context.commit('GET_DEALER_CARDS', S.getFirstCards(cards));
};

const changeDealerCards = (context) => {
    context.commit('CHANGE_DEALER_CARDS');
};

const getAmountChangeCards = (context, amount) => {
    context.commit('GET_AMOUNT_CHANGE_CARDS', amount);
};

const getSelectedCards = (context, selected) => {
    context.commit('GET_SELECTED_CARDS', selected);
};

const emptySelectedCards = (context) => {
    context.commit('EMPTY_SELECTED_CARDS', []);
};

const replaceSelectedCards = (context, array) => {
    context.commit('REPLACE_SELECTED_CARDS', S.replaceCards(array[0], array[1], array[2]));
};
  
export default {
    setBet,
    setDeal,
    setDraw,
    getChips,
    foldRound,
    updateBet,
    setNewRound,
    updateChips,
    getUserCards,
    getDealerCards,
    getSelectedCards,
    changeDealerCards,
    emptySelectedCards,
    getAmountChangeCards,
    replaceSelectedCards
};