const cards = (state) => state.cards;
const isDraw = (state) => state.isDraw;
const didWin = (state) => state.didWin;
const winner = (state) => state.winner;
const gamePot = (state) => state.gamePot;
const dealIsSet = (state) => state.dealIsSet;
const userAmount = (state) => state.userAmount;
const userStatus = (state) => state.userStatus;
const dealerChange = (state) => state.dealerChange;
const dealerStatus = (state) => state.dealerStatus;
const chipSelection = (state) => state.chipSelection;
const userSelection = (state) => state.userSelection;
const dealerSelection = (state) => state.dealerSelection;
const changeSelection = (state) => state.changeSelection;
const amountDealerChange = (state) => state.amountDealerChange;
  
export default {
    cards,
    isDraw,
    didWin,
    winner,
    gamePot,
    dealIsSet,
    userAmount,
    userStatus,
    dealerChange,
    dealerStatus,
    chipSelection,
    userSelection,
    changeSelection,
    dealerSelection,
    amountDealerChange
};