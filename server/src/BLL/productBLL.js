const generalDB = require("../DAL/generalDB");
//import findAddProduct from '../functions/findAddProduct'
//import hotestProduct from '../functions/hotestProduct'



const nameTable = 'product';
const getById = (id, cb) => {
    generalDB.getByKey(nameTable, 'id', id, (rows => {
        cb(rows);
    }));
}

const getByIds = (ids, cb) => {
    generalDB.getByKeys(nameTable, 'id', ids, (rows => {
        cb(rows);
    }));
}
const get = (cb) => {
    return new Promise((resolve, reject) => {
        generalDB.getTable(nameTable, (rows) => {
            if (cb) cb(rows);
            resolve(rows);
        })
    });
    }

const insert = (product, cb) => {
        let newproduct = validation(product);
        generalDB.insert(nameTable, newproduct, (insertId) => {
            cb(insertId);
        });
    }

    const update = (product, cb) => {
        let newproduct = validation(product);
        generalDB.update(nameTable, newproduct, (result) => {
            cb(result);
        });
    }
    //there is probably problem here...
    const closestProduct = (idUser, cb) => {
        let newproduct = validation(product);
        generalDB.closestProduct(nameTable, newproduct, (result) => {
            cb(result);
            // findAddProduct(idUser);
        });
    }


    const validation = (product) => {
        let newproduct = {};
        if (product.name_ && product.name_.length <= 45)
            newproduct.name_ = product.name_;
        if (product.description_ && product.description_.length <= 200)
            newproduct.description_ = product.description_;
        if (product.category && product.category.length <= 45)
            newproduct.category = product.category;
        if (product.qryInStock)
            newproduct.qryInStock = product.qryInStock;
        if (product.status_)
            newproduct.status_ = product.status_;
        if (product.price && product.price >= 0)
            newproduct.price = product.price;

        return newproduct;
    }

    module.exports = {
        get, insert, update, getById, getByIds
    }


