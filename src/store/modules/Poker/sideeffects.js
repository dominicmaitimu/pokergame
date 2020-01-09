/* eslint-disable no-unused-vars */

// Helpers
import store from 'store';
import * as G from 'helpers/Game';

// Data
import Cards from 'data/cards.json';
import cardValues from 'data/values.json';
import highCards from 'data/highCards.json';
import cardDuplicates from 'data/duplicates.json';

// General
const getRandomCard = (array, arrayNew) => {
    const newCard = {
        sign: array[Math.floor(Math.random() * array.length)].sign,
        value: array[Math.floor(Math.random() * array.length)].value
    };

    const cardExists = G.checkifExists(arrayNew, newCard);

    if (!cardExists) {
        return newCard;
    } else {
        return getRandomCard(array, arrayNew);
    }

};

const getRandomCardSelection = (array, arrayNew) => {
    const newCard = {
        sign: array[Math.floor(Math.random() * array.length)].sign,
        value: array[Math.floor(Math.random() * array.length)].value
    };

    const cardExists = G.checkifExists(arrayNew, newCard);

    if (!cardExists) {
        arrayNew.push(newCard);
    } else {
        getRandomCardSelection(array, arrayNew);
    }

    return arrayNew;
};

// Check
const succeedingHand = (array) => {
    const firstCard = cardValues.indexOf(array[0]);
    const selectedItems = cardValues.slice(firstCard, (firstCard + 5));
    return G.checkIfIdentical(G.sortArray(selectedItems), G.sortArray(array)) === 5;
};

const duplicateHand = (array) => {
    let code = null;
    array.map(value => value === 2 ? code += 102 : value === 3 ? code += 103 : value === 4 ? code += 104 : null);
    return cardDuplicates.find((val) => val.code === code).value;
};

const otherHand = (values, oneSign) => {
    if (G.checkIfIdentical(G.sortArray(values), G.sortArray(highCards)) === 10) {
        return oneSign ? 9 : 4;
    } else if (succeedingHand(G.sortArray(values))) {
        return oneSign ? 8 : 4;
    } else if (oneSign) {
        return 5;
    } else {
        return  0;
    }
};

const whichHand = (values, signs) => {
    const duplicateValues = G.countDuplicates(values);

    const uniqueSigns = [...new Set(signs)];
    const uniqueValues = [...new Set(duplicateValues)];

    const oneSign = uniqueSigns.length === 1;
    const hasDuplicates = uniqueValues.length > 1;

    if (hasDuplicates) {
        return duplicateHand(duplicateValues);
    } else {
        return otherHand(values, oneSign);
    }
};

export const checkHand = (array) => {
    let cardValues = [],
        cardSigns = [];

    array.map(value => {
        cardValues.push(value.value);
        cardSigns.push(value.sign);
    });

    return whichHand(cardValues, cardSigns);
};

export const getFirstCards = (array) => {
    let arrayNew = [];

    for (let i = 0; i < 5; i++) {
        getRandomCardSelection(array, arrayNew);
    }

    return arrayNew;
};

// Change selection
const getSigns = (array, amount) => {
    let signs = [];

    array.map(value => {
        signs.push(value.sign);
    });

    return amount ? [...new Set(signs)].length <= amount : [...new Set(signs)].length === 1;
};

const swapSelection = (array, selected) => {
    const difference = G.checkArrays(array, selected);
    const arrayNew = array.slice(0,5);

    store.dispatch('Poker/getAmountChangeCards', difference.length);

    difference.map(value => {
        const index = arrayNew.findIndex(x => x.value === value.value);
        arrayNew.splice(index, 1);
    });

    for (let i = 0; i < difference.length; i++) {
        getRandomCardSelection(array, arrayNew);
    }

    return arrayNew;
};

const hasSucceedingCards = (array) => {
    let arr1 = [],
        arr2 = [];

    for (let i = 0; i < G.arraySortValue(array, 'value').length; i++) {
        const number = parseFloat(G.arraySortValue(array, 'value')[i].value) + 1;

        if (G.arraySortValue(array, 'value').findIndex(x => x.value === G.addZero(number)) != -1) {
            arr1.push(G.arraySortValue(array, 'value')[i]);
            arr2.push(G.arraySortValue(array, 'value')[G.arraySortValue(array, 'value').findIndex(x => x.value === G.addZero(number))]);
        }
    }

    return G.concatArrays(arr1.concat(arr2));
};

const hasHighCards = (array) => {
    let arrayNew = [];

    array.map(value => highCards.indexOf(value.value) != -1 && arrayNew.push(value));

    return swapSelection(array, arrayNew);
};

export const changeCard = (array) => {
    let cardValues = [];

    array.map(value => cardValues.push(value.value));

    const duplicateValues = G.countDuplicates(cardValues);
    const uniqueValues = [...new Set(duplicateValues)];
    const hasDuplicates = uniqueValues.length > 1;
    
    if (!hasDuplicates) {
        if (hasSucceedingCards(array).length >= 3 && getSigns(hasSucceedingCards(array), 2)) {
            return swapSelection(array, hasSucceedingCards(array));
        } else if (getSigns(array, 2)) {
            return swapSelection(array, hasSucceedingCards(array));
        } else if (hasSucceedingCards(array).length >= 3) {
            return swapSelection(array, hasSucceedingCards(array));
        } else {
            return hasHighCards(array);
        }
    } else {
        return array;
    }
};

// First selection
export const getCards = () => {
    let arrAll = [];

    for (let i = 0; i < Cards.sign.length; i++) {
        for (let j = 0; j < Cards.types.length; j++) {
            arrAll.push({ sign: Cards.sign[i].value, value: Cards.types[j].value });
        }
    }
    
    return arrAll;
};

// Replace card(s)
export const replaceCards = (array, selection, changes) => {
    const arrayNew = selection.slice(0,5);

    if (changes) {

        changes.map(value => {
            const index = arrayNew.findIndex(x => JSON.stringify({ sign: x.sign, value: x.value }) === JSON.stringify({ sign: value.sign, value: value.value }));
            arrayNew[index] = getRandomCard(array, arrayNew);
        });
        
    }

    return arrayNew;
};

// Compare hands
const hasHigherPair = (user, dealer) => {
    let firstArray = [],
        secondArray = [];

    G.getDuplicates(user).map(value => firstArray.push(value.value));
    G.getDuplicates(dealer).map(value => secondArray.push(value.value));

    if (Math.max(...firstArray) === Math.max(...secondArray)) {
        store.dispatch('Poker/getAmountChangeCards', true);
        return false;
    } else {
        return Math.max(...firstArray) > Math.max(...secondArray);
    }
};

const hasTheHighestCards = (user, dealer, status) => {
    if ([0, 4, 5, 8].indexOf(status) +1) {
        return Math.max(...G.splitValues(user, 'value')) > Math.max(...G.splitValues(dealer, 'value'));
    } else if ([1, 2, 3, 6, 7].indexOf(status) +1) {
        return hasHigherPair(user, dealer);
    } else {
        store.dispatch('Poker/getAmountChangeCards', true);
        return false;
    }
};

export const compareHands = (user, userStatus, dealer, dealerStatus) => {
    if (userStatus > dealerStatus) {
        return true;
    } else if (userStatus < dealerStatus) {
        return false;
    } else {
        return hasTheHighestCards(user, dealer, G.combineSameValues(userStatus, dealerStatus));
    }
};