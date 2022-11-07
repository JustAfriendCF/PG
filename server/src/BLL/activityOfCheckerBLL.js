const generalDB = require("../DAL/generalDB");



const nameTable = 'activityOfChecker';
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
const insert = (activityOfChecker, cb) => {
    let newactivityOfChecker = validation(activityOfChecker);
    generalDB.insert(nameTable, newactivityOfChecker, (insertId) => {
        cb(insertId);
    });
}

const update = (activityOfChecker, cb) => {
    let newactivityOfChecker = validation(activityOfChecker);
    generalDB.update(nameTable, newactivityOfChecker, (result) => {
        cb(result);
    });
}

const validation = (activityOfChecker) => {
    let newactivityOfChecker = {};

    return newactivityOfChecker;
}

module.exports = {
    get, insert, update
}


