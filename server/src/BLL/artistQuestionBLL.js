const generalDB = require("../DAL/generalDB");



const nameTable = 'artistQuestion';
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
const insert = (artistQuestion, cb) => {
    let newartistQuestion = validation(artistQuestion);
    generalDB.insert(nameTable, newartistQuestion, (insertId) => {
        cb(insertId);
    });
}

const update = (artistQuestion, cb) => {
    let newartistQuestion = validation(artistQuestion);
    generalDB.update(nameTable, newartistQuestion, (result) => {
        cb(result);
    });
}

const validation = (artistQuestion) => {
    let newartistQuestion = {};
    if (artistQuestion.password_ && artistQuestion.password_.length <= 45)
    newartistQuestion.password_ = artistQuestion.password_;
    if (artistQuestion.firstName && artistQuestion.firstName.length <= 45)
        newartistQuestion.firstName = artistQuestion.firstName;
    if (artistQuestion.lastName && artistQuestion.lastName.length <= 45)
        newartistQuestion.lastName = artistQuestion.lastName;
    if (artistQuestion.statusReceivingAdvertisements)
        newartistQuestion.statusReceivingAdvertisements = artistQuestion.statusReceivingAdvertisements;
    if (artistQuestion.credits )
        newartistQuestion.credits = artistQuestion.credits;
  
    return newartistQuestion;
}

module.exports = {
    get, insert, update
}


