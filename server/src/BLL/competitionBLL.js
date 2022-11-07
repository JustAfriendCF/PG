const generalDB = require("../DAL/generalDB");



const nameTable = 'competition';
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
const insert = (competition, cb) => {
    let newcompetition = validation(competition);
    generalDB.insert(nameTable, newcompetition, (insertId) => {
        cb(insertId);
    });
}

const update = (competition, cb) => {
    let newcompetition = validation(competition);
    generalDB.update(nameTable, newcompetition, (result) => {
        cb(result);
    });
}

const validation = (competition) => {
    let newcompetition = {};
    if (competition.date_)
        newcompetition.date_ = competition.date_;
    if (competition.description_ && competition.description_.length <= 200)
        newcompetition.description_ = competition.description_;

    return newcompetition;
}

module.exports = {
    get, insert, update
}


