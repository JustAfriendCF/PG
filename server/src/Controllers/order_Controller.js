const order_BLL = require("../BLL/order_BLL");
const userController = require("./userController")
const generalDB = require('./../DAL/generalDB');
order_Controller = app => {

    let router = '/order_';


    app.get(router + '/get', (req, res) => {
        order_BLL.get((order_s) => {
            res.send(order_s);
        });
    })

    // app.get(router + '/getOrdersForUser', (req, res) => {
    //     let user = userController.app('/user/getUserById');
    //     order_BLL.get((o)=>{o.idUser = user.id; });

    // })

    app.post(router + '/post', (req, res) => {
        let order_s = req.body;
        order_BLL.insert(order_s, (order_sId) => {
            res.send({ insertId: order_sId });
        });
    })

    // {
    //     "name": "f,.", "email": "gfg@cxvc", "address": "ff",
    //         "cartItems": [
    //             {
    //                 "product":
    //                 {
    //                     "id": 1, "name_": "Batizado", "description_": "girl shirt", "category": "clothes", "qryInStock": 20, "status_": 0, "price": 25, "QuantityOfPurchasesFromAProduct": 5, "image": "shirt1.jpg", "color": ["white"], "availableSizes": ["12", "14", "16", "18"]
    //                 }, "count": 1
    //             }]
    //             , "total": null
    // }

    app.post(router + '/addOrder', (req, res) => {
        let { order, idUser } = req.body;

        let newOrder = { idUser, status_: 1, date_: new Date() };
        generalDB.insert('order_', newOrder, (order_sId) => {
            let products = order.cartItems.map(p => {
                return { idProduct: p.product.id, qry: p.count, date_: new Date(), status_: 1, idOrder: order_sId }

            });
            products.forEach(async p => {
                generalDB.insert('productinorder', p, (id) => { console.log(id); })
                let query = `update product set QuantityOfPurchasesFromAProduct=QuantityOfPurchasesFromAProduct+${p.qry} where id=${p.idProduct};`;
                let result = await generalDB._getResult2(query);

            })
            res.send({ insertId: order_sId });
        });
    })


}
module.exports = order_Controller;