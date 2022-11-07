const generalDB = require("../DAL/generalDB");



const nameTable = 'userQuestion';
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
const insert = (userQuestion, cb) => {
    let newuserQuestion = validation(userQuestion);
    generalDB.insert(nameTable, newuserQuestion, (insertId) => {
        cb(insertId);
    });
}

const update = (userQuestion, cb) => {
    let newuserQuestion = validation(userQuestion);
    generalDB.update(nameTable, newuserQuestion, (result) => {
        cb(result);
    });
}

const validation = (userQuestion) => {
    let newUserQuestion = {};
    if (userQuestion.question && userQuestion.question.length <= 300)
    newUserQuestion.question = userQuestion.question;
    if (userQuestion.answer && userQuestion.answer.length <= 300)
    newUserQuestion.answer = userQuestion.answer;
    if (userQuestion.status_ &&( userQuestion.status_=="private"|| userQuestion.status_=="public"||userQuestion.status_=="rejected"))
    newUserQuestion.status_ = userQuestion.status_;
    return newuserQuestion;
}

module.exports = {
    get, insert, update
}


