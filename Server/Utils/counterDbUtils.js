const CounterDb = require('../DB/counterDB');

const saveCounter = (dataObj) => {
    return CounterDb.insertOne(dataObj)
        .then(counterObj => {
            return counterObj;
        })
        .catch(err => Promise.reject(err));
}

const updateCounterDb = (query = {}, update = {}) => {
    return CounterDb.updateData(query, update)
        .then(updateData => updateData)
        .catch(err => Promise.reject(err));
}

module.exports = {
    saveCounter,
    updateCounterDb
};