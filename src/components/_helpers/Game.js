/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import * as R from 'ramda';

export const sortArray = (values) => values.sort();
export const countDuplicates = R.pipe(R.countBy(R.identity), R.values);
export const arraySortValue = (array, key) => R.sortBy(R.prop(key), array);
export const checkIfIdentical = (a, b) => R.sum(R.zipWith(R.equals, a, b));
export const sortValues = (array) => array.sort().toString().replace(/,/g, '');
export const addZero = (num) => (num < 10) ? '0' + num.toString() : num.toString();
export const checkArrays = (arr1, arr2) => arr1.filter((item) => !arr2.includes(item));
export const checkifExists = (array, current) => array.map(value => JSON.stringify(value) === JSON.stringify(current)).includes(true);

export const concatArrays = (arrays) => {
    const array = arrays.concat();

    for (let i = 0; i < array.length; i++) {
        for (let j = (i + 1); j < array.length; j++) {
            array[i] === array[j] && array.splice(j--, 1);
        }
    }
    return array;
};

export const splitValues = (array, key) => {
    let arrayNew = [];

    array.map(value => {
        arrayNew.push(value[key]);
    });

    return arrayNew;
};

export const combineSameValues = (arr1, arr2) => {
    let combination = [];
    combination.push(arr1, arr2);
    return [...new Set(combination)][0];
};

export const getDuplicates = R.pipe(
    R.project(['value']), R.reduce(
        ({ results, foundOnce }, item) => R.contains(item, foundOnce) ?
            { results: R.append(item, results), foundOnce } : { results, foundOnce: R.append(item, foundOnce) },
        { results: [], foundOnce: [] }
    ), R.prop('results'), R.uniq
);