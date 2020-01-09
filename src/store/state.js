import * as S from 'store/modules/Poker/sideeffects';

export const initialState = () => ({
    gamePot: 0,
    isDraw: false,
    didWin: false,
    userAmount: 100,
    dealIsSet: false,
    userStatus: null,
    chipSelection: [],
    userSelection: [],
    dealerStatus: null,
    dealerChange: null,
    changeSelection: [],
    cards: S.getCards(),
    dealerSelection: [],
    amountDealerChange: null
});