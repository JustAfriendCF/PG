const productBLL = require("../BLL/productBLL");

const hotestProduct = () => {
    products = productBLL.get((products) => {
        products = products.map(p => {
            p.availableSizes = convertString(p.availableSizes);
            return p;
        })
        res.send(products);
    });
    let maxOrder = -1;
    let HP;
    products.map(p => {
        if (maxOrder < p.QuantityOfPurchasesFromAProduct) {
            maxOrder = p.QuantityOfPurchasesFromAProduct;
            HP = p;
        }
    })
    return HP;



}