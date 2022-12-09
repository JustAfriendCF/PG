const order_BLL = require("../BLL/order_BLL");
const generalDB = require("../DAL/generalDB");

 const get = (cb) => {
    return new Promise((resolve, reject) => {
        generalDB.getTable('order_', (rows) => {
            if (cb) cb(rows);
            resolve(rows);
        })
    });
}
 const getProductInOrder = (cb) => {
    return new Promise((resolve, reject) => {
        generalDB.getTable('productinorder', (rows) => {
            if (cb) cb(rows);
            resolve(rows);
        })
    });
}
module.exports = {
    get, getProductInOrder
}

order_Controller = app => {

    let router = '/order_';



    app.get(router + '/get', (req, res) => {
        order_BLL.get((order_s) => {
            res.send(order_s);
        });
    })
    app.getWithProducts(router + '/getWithProducts', (req, res) => {
        order_BLL.get((order_s) => {
            res.send(order_s);
        });
    })

    app.post(router + '/post', (req, res) => {
        let order_ = req.body;
        order_BLL.insert(order_, (order_Id) => {
            res.send({ insertId: order_Id });
        });
    })





}
