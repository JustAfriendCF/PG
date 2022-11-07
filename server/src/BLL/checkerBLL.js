const generalDB = require("../DAL/generalDB");


const nameTable = 'checker';
const getById = (id, cb) => {
    generalDB.getByKey(nameTable, 'idSubscription', id, (rows => {
        cb(rows);
    }));
}

const unBlockChecker = (checkerId, cb) => {
    console.log('aaaaa', checkerId)
    const columnDetails = {
        id: checkerId,
        name: 'status_',
        value: 0
    }

    generalDB.updateColumnByNamen(nameTable, columnDetails, (result) => {
        cb(result);
    });
}

const get = (cb) => {
    generalDB.getTable(nameTable, (rows) => {
        cb(rows);
    })
}
const insert = (checker, cb) => {
    let newchecker = validation(checker);
    generalDB.insert(nameTable, newchecker, (insertId) => {
        cb(insertId);
    });
}

const update = (checker, cb) => {
    let newchecker = validation(checker);
    generalDB.update(nameTable, newchecker, (result) => {
        cb(result);
    });
}
const blockChecker = (checkerId, cb) => {
    console.log('aaaaa', checkerId)
    const columnDetails = {
        id: checkerId,
        name: 'status_',
        value: 1
    }

    generalDB.updateColumnByNamen(nameTable, columnDetails, (result) => {
        cb(result);
    });
}
const validation = (checker) => {
    let newchecker = {};
    if (checker.password_ && checker.password_.length <= 45)
        newchecker.password_ = checker.password_;
    if (checker.firstName && checker.firstName.length <= 45)
        newchecker.firstName = checker.firstName;
    if (checker.lastName && checker.lastName.length <= 45)
        newchecker.lastName = checker.lastName;
    if (checker.status_)
        newchecker.status_ = checker.status_;

    return newchecker;
}

module.exports = {
    get, insert, update,blockChecker,unBlockChecker
}


