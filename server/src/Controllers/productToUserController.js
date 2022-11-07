const productToUserBLL = require("../BLL/productToUserBLL");


productToUserController = app => {

    let router = '/productToUser';



    app.get(router + '/get', (req, res) => {
        productToUserBLL.get((productToUsers) => {
            res.send(productToUsers);
        });
    })

    app.post(router + '/post', (req, res) => {
        let productToUser = req.body;
        productToUserBLL.insert(productToUser, (productToUserId) => {
            res.send({ insertId: productToUserId });
        });
    })





}
module.exports = productToUserController;