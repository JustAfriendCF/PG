const generalDB = require("../DAL/generalDB");



const nameTable = 'blackList';
const getById = (id, cb) => {
    generalDB.getByKey(nameTable, 'idSubscription', id, (rows => {
        cb(rows);
    }));
}

const get = (cb) => {
    generalDB.getTable(nameTable, (rows) => {
        cb(rows);
    })
}
const insert = (blackList, cb) => {
    let newblackList = validation(blackList);
    generalDB.insert(nameTable, newblackList, (insertId) => {
        cb(insertId);
    });
}

const update = (blackList, cb) => {
    let newblackList = validation(blackList);
    generalDB.update(nameTable, newblackList, (result) => {
        cb(result);
    });
}

const validation = (blackList) => {
    let newblackList = {};
    if (blackList.word && blackList.word.length <= 45)
    newblackList.word = blackList.word;
    return newblackList;
}

module.exports = {
    get, insert, update
}


