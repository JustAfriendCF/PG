const BuyingAProductBLL = require("../BLL/BuyingAProductBLL");


BuyingAProductController = app => {

    let router = '/BuyingAProduct';



    app.get(router + '/get', (req, res) => {
         BuyingAProductBLL.get((BuyingAProducts)=>{
            res.send(BuyingAProducts);
        });
    })

    app.post(router + '/post', (req, res) => {
        let BuyingAProduct=req.body;
         BuyingAProductBLL.insert(BuyingAProduct,(BuyingAProductId)=>{
            res.send({insertId:BuyingAProductId});
        });
    })





}
module.exports = BuyingAProductController;