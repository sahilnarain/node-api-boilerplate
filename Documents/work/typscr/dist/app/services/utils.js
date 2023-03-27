'use strict';
const sanitizeSqlResult = (result) => {
    return JSON.parse(JSON.stringify(result));
};
const addDays = (date, numberOfDays) => {
    return new Date(date.setDate(date.getDate() + numberOfDays));
};
const createHierarchy = (input) => {
    let length = input.length;
    let result = [];
    for (let i = input.length - 1; i >= 0; i--) {
        if (input[i].parent_id) {
            let _index = input.indexOf(input.filter((inp) => inp.id === input[i].parent_id)[0]);
            if (!input[_index].hasOwnProperty('children')) {
                input[_index].children = [];
            }
            input[_index].children.push(input[i]);
            input.splice(i, 1);
        }
    }
    return input;
};
const sortByDesc = (key) => {
    return (array1, array2) => (array1[key] < array2[key] ? 1 : array2[key] < array1[key] ? -1 : 0);
};
module.exports = {
    sanitizeSqlResult: sanitizeSqlResult,
    addDays: addDays,
    createHierarchy: createHierarchy,
    sortByDesc: sortByDesc
};
