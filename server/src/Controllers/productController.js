const productBLL = require("../BLL/productBLL");
const findAdd = require("../functions/findAddProduct");
const path = require('path');

productController = app => {

    let router = '/product';

    const convertString = (dataString) => {
        if(!dataString)dataString='';
        dataString = dataString.split(',');
        return dataString;
    }

    app.get(router + '/getPicture', async (req, response) => {
        console.log('get file: ', req.query);
        let { fileName } = req.query;
        // let fileName = 'shirts.jpg';
        var path1 = `${__dirname}/../../images/products/${fileName}`
        console.log("path1######", path1);
        response.sendFile(path.resolve(path1));
    });

    app.get(router + '/get', (req, res) => {

        console.log('do get product');

        productBLL.get((products) => {
            products = products.map(p => {
                p.availableSizes = convertString(p.availableSizes);
                p.color = convertString(p.color);
                // p.image = `${__dirname.slice(0, 31)}\\images\\products\\${p.image}`

                return p;
            })
            //const arraySize = convertString(products.availableSizes);
            //  products.availableSizes = availableSizes;
            res.send(products);
        });
    })
    app.get(router + '/getAdd', async (req, res) => {
        let result = await findAdd.productAdd(req.query.userId);
        res.send(result);

    })
    app.post(router + '/post', (req, res) => {
        let product = req.body;
        productBLL.insert(product, (productId) => {
            res.send({ insertId: productId });
        });
    })







}
module.exports = productController;