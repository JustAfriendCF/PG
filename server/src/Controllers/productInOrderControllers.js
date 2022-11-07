const productInOrderBLL = require("../BLL/productInOrderBLL");
const productsBLL = require("../BLL/productBLL");


productInOrderController = app => {

    let router = '/productInOrder';



    app.get(router + '/get', (req, res) => {
        productInOrderBLL.get((productInOrders) => {
            res.send(productInOrders);
        });
    })
    app.get(router + '/getByOrder/:orderId', async (req, res) => {
        productInOrderBLL.getByIdOrder(req.params.orderId, (productInOrders) => {
                 productsBLL.getByIds(productInOrders.map(item => item.idProduct), (products) => {
                    res.send(products);
                });
        });
    })
    app.post(router + '/post', (req, res) => {
        let productInOrder = req.body;
        productInOrderBLL.insert(productInOrder, (productInOrderId) => {
            res.send({ insertId: productInOrderId });
        });
    })
    // app.post(router + '/insertProduct', (req, res) => {
    //     let productInOrder = req.body;
    //     productInOrderBLL.insert(productInOrder, (productInOrderId) => {
    //         res.send({ insertId: productInOrderId });
    //     });
    // })
    // app.post(router + '/removeProduct', (req, res) => {
    //     let productInOrder = req.body;
    //     productInOrderBLL.insert(productInOrder, (productInOrderId) => {
    //         res.send({ insertId: productInOrderId });
    //     });
    // })





}
module.exports = productInOrderController;