const generalDB = require("../DAL/generalDB");



const nameTable = 'activity';
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
const insert = (activity, cb) => {
    let newactivity = validation(activity);
    generalDB.insert(nameTable, newactivity, (insertId) => {
        cb(insertId);
    });
}

const update = (activity, cb) => {
    let newactivity = validation(activity);
    generalDB.update(nameTable, newactivity, (result) => {
        cb(result);
    });
}

const validation = (activity) => {
    let newactivity = {};
    if(activity.typeOfActivity&activity.typeOfActivity.length>=45)
    newactivity.typeOfActivity=activity.typeOfActivity;
  
    return newactivity;
}

module.exports = {
    get, insert, update
}


