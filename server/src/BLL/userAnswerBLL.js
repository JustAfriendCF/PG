const generalDB = require("../DAL/generalDB");



const nameTable = 'userAnswer';
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
const insert = (userAnswer, cb) => {
    let newuserAnswer = validation(userAnswer);
    generalDB.insert(nameTable, newuserAnswer, (insertId) => {
        cb(insertId);
    });
}

const update = (userAnswer, cb) => {
    let newuserAnswer = validation(userAnswer);
    generalDB.update(nameTable, newuserAnswer, (result) => {
        cb(result);
    });
}

const validation = (userAnswer) => {
    let newuserAnswer = {};
    if (userAnswer.idArtistQuestion)
    newuserAnswer.idArtistQuestion = userAnswer.idArtistQuestion;
    if (userAnswer.answer && userAnswer.answer.length <= 300)
    newuserAnswer.answer = userAnswer.answer;
    return newuserAnswer;
}

module.exports = {
    get, insert, update
}


