const { result } = require("lodash");
const generalDB = require("../DAL/generalDB");



const nameTable = 'productInOrder';
const getById = (id, cb) => {
    generalDB.getByKey(nameTable, 'idSubscription', id, (rows => {
        cb(rows);
    }));
}

const getByIdOrder = (id, cb) => {
    generalDB.getByKeys(nameTable, 'idOrder', id, (rows => {
        cb(rows);
    }));
}

const get = (cb) => {
    generalDB.getTable(nameTable, (rows) => {
        cb(rows);
    })
}
const insert = (productInOrder, cb) => {
    let newproductInOrder = validation(productInOrder);
    generalDB.insert(nameTable, newproductInOrder, (insertId) => {
        cb(insertId);
    });
}

const update = (productInOrder, cb) => {
    let newproductInOrder = validation(productInOrder);
    generalDB.update(nameTable, newproductInOrder, (result) => {
        cb(result);
    });
}
const productAdd = (userId, cb) => {

    // get the last ordered product
    generalDB.lastProductOrder(userId, (result) => {
        cb(result)
    })
    //
    generalDB.getTable("product",)
}
const validation = (productInOrder) => {
    let newproductInOrder = {};
    if (productInOrder.idproductInOrder)
        newproductInOrder.idproductInOrder = productInOrder.idproductInOrder;
    if (productInOrder.idProduct)
        newproductInOrder.idProduct = productInOrder.idProduct;
    if (productInOrder.qry)
        newproductInOrder.qry = productInOrder.qry;
    if (productInOrder.date_)
        newproductInOrder.date_ = productInOrder.date_;
    if (productInOrder.status_ && (productInOrder.status_ == "purchase" || productInOrder.status_ == "cancel" || productInOrder.status_ == "order"))
        newproductInOrder.status_ = productInOrder.status_;
    return newproductInOrder;
}

module.exports = {
    get, insert, update, productAdd, getByIdOrder
}


