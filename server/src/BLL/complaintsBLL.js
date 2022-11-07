const generalDB = require("../DAL/generalDB");



const nameTable = 'complaints';
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
const insert = (complaints, cb) => {
    let newcomplaints = validation(complaints);
    generalDB.insert(nameTable, newcomplaints, (insertId) => {
        cb(insertId);
    });
}

const update = (complaints, cb) => {
    let newcomplaints = validation(complaints);
    generalDB.update(nameTable, newcomplaints, (result) => {
        cb(result);
    });
}

const validation = (complaints) => {
    let newcomplaints = {};
    if (complaints.idImageOrComment )
        newcomplaints.idImageOrComment = complaints.idImageOrComment;
    if (complaints.typeOfComplaint && complaints.typeOfComplaint.length <= 45)
        newcomplaints.typeOfComplaint = complaints.typeOfComplaint;
    if (complaints.description_ && complaints.description_.length <= 200)
        newcomplaints.description_ = complaints.description_;
    if (complaints.idUser)
        newcomplaints.idUser = complaints.idUser;
    if (complaints.idChecker )
        newcomplaints.idChecker = complaints.idChecker;

    return newcomplaints;
}

module.exports = {
    get, insert, update
}


