const generalDB = require("../DAL/generalDB");



const nameTable = 'BuyingAProduct';
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
const insert = (BuyingAProduct, cb) => {
    let newBuyingAProduct = validation(BuyingAProduct);
    generalDB.insert(nameTable, newBuyingAProduct, (insertId) => {
        cb(insertId);
    });
}

const update = (BuyingAProduct, cb) => {
    let newBuyingAProduct = validation(BuyingAProduct);
    generalDB.update(nameTable, newBuyingAProduct, (result) => {
        cb(result);
    });
}

const validation = (BuyingAProduct) => {
    let newBuyingAProduct = {};
    if (BuyingAProduct.idProduct)
    newBuyingAProduct.idProduct = BuyingAProduct.idProduct;
    if (BuyingAProduct.idSubscription )
        newBuyingAProduct.idSubscription = BuyingAProduct.idSubscription;
    if (BuyingAProduct.date_)
        newBuyingAProduct.date_ = BuyingAProduct.date_;
    return newBuyingAProduct;
}

module.exports = {
    get, insert, update
}


