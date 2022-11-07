const generalDB = require("../DAL/generalDB");



const nameTable = 'productToUser';
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
const insert = (productToUser, cb) => {
    let newproductToUser = validation(productToUser);
    generalDB.insert(nameTable, newproductToUser, (insertId) => {
        cb(insertId);
    });
}

const update = (productToUser, cb) => {
    let newproductToUser = validation(productToUser);
    generalDB.update(nameTable, newproductToUser, (result) => {
        cb(result);
    });
}

const validation = (productToUser) => {
    let newproductToUser = {};
    if (productToUser.firstName && productToUser.firstName.length <= 45)
        newproductToUser.firstName = productToUser.firstName;
    if (productToUser.lastName && productToUser.lastName.length <= 45)
        newproductToUser.lastName = productToUser.lastName;
    return newproductToUser;
}

module.exports = {
    get, insert, update
}


