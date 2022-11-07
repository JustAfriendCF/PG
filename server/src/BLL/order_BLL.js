const order_BLL = require("../BLL/order_BLL");


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
module.exports = order_Controller;