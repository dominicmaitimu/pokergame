import * as S from './sideeffects';
import { initialState } from 'store/state';

const initial = initialState();

const SET_BET = (state, amount) => {
    state.gamePot = (state.gamePot + amount);
    state.userAmount = (state.userAmount - amount);
};

const SET_DEAL = (state, array) => {
    state.gamePot = 0;
    state.dealIsSet = array[0];
    state.userStatus = S.checkHand(array[1]);
    state.dealerStatus = S.checkHand(array[2]);
    state.didWin = S.compareHands(array[1], S.checkHand(array[1]), array[2], S.checkHand(array[2]));
};

const SET_DRAW = (state, status) => {
    state.isDraw = status;
};

const SET_NEW_ROUND = (state) => {
    state.isDraw = false;
    state.didWin = false;
    state.dealIsSet = false;
    state.userStatus = null;
    state.chipSelection = [];
    state.userSelection = [];
    state.dealerStatus = null;
    state.dealerChange = null;
    state.changeSelection = [];
    state.dealerSelection = [];
    state.amountDealerChange = null;
};

const FOLD_ROUND = (state, amount) => {
    const currentUserAmount = state.userAmount;
    const currentGamePot = Math.floor(amount / 2);

    Object.keys(initial).forEach(key => {
        if (key != 'cards') {
            state[key] = key === 'userAmount' ? (currentUserAmount + currentGamePot) : initial[key];
        }
    });
};

const UPDATE_BET = (state, amount) => {
    state.gamePot = (state.gamePot - amount);
    state.userAmount = (state.userAmount + amount);
};

const GET_CHIPS = (state, chips) => {
    let newSelection = state.chipSelection;
    newSelection.push(chips);
    state.chipSelection = newSelection;
};

const UPDATE_CHIPS = (state, id) => {
    state.chipSelection = state.chipSelection.filter(chip => chip.id != id);
};

const GET_USER_CARDS = (state, selection) => {
    state.userSelection = selection;
    state.userStatus = S.checkHand(selection);
};

const GET_DEALER_CARDS = (state, selection) => {
    state.dealerSelection = selection;
    state.dealerStatus = S.checkHand(selection);
    state.dealerChange = S.changeCard(selection);
};

const CHANGE_DEALER_CARDS = (state) => {
    state.dealerSelection = state.dealerChange;
    state.dealerChange = null;
};

const GET_AMOUNT_CHANGE_CARDS = (state, amount) => {
    state.amountDealerChange = amount;
};

const GET_SELECTED_CARDS = (state, cards) => {
    let newSelection = state.changeSelection;
    const index = newSelection.findIndex(x => JSON.stringify({ sign: x.sign, value: x.value }) === JSON.stringify(cards));

    if (index != -1) {
        newSelection.splice(index, 1);
    } else {
        newSelection.push(cards);
    }

    state.changeSelection = newSelection;
};

const EMPTY_SELECTED_CARDS = (state, selection) => {
    state.changeSelection = selection;
};

const REPLACE_SELECTED_CARDS = (state, selection) => {
    state.userSelection = selection;
};

export default {
    SET_BET,
    SET_DEAL,
    SET_DRAW,
    GET_CHIPS,
    FOLD_ROUND,
    UPDATE_BET,
    UPDATE_CHIPS,
    SET_NEW_ROUND,
    GET_USER_CARDS,
    GET_DEALER_CARDS,
    GET_SELECTED_CARDS,
    CHANGE_DEALER_CARDS,
    EMPTY_SELECTED_CARDS,
    REPLACE_SELECTED_CARDS,
    GET_AMOUNT_CHANGE_CARDS
};