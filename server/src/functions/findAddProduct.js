// import convertString from '../Controllers/productController'
const productBLL = require("../BLL/productBLL");
const productInOrderBLL = require("../BLL/productInOrderBLL");
const order_BLL = require("../BLL/order_BLL");
const generalDB = require("../DAL/generalDB");
const db = require("../DAL/DBconnection");

const productAdd = async (userId) => {
    let allProduct = await productBLL.get();

    return new Promise(resolve => {
        // if(!userId||userId==-1)
        let maxProduct = allProduct.reduce((prev, current) =>
            (+prev.QuantityOfPurchasesFromAProduct > +current.QuantityOfPurchasesFromAProduct) ? prev : current)

        if (userId && userId != -1) {
            let query = `select  o.date_, p.* from product p
    join productinorder po on po.idProduct=p.id
    join order_ o on o.id=po.idOrder
    where o.idUser=?
    order by o.date_
    limit 1;`

            db.query(query, [userId], (err, rows) => {
                if (err) console.log(err);

                if (rows[0]) {
                    let lastProduct = rows[0];
                    allProduct.map(p => {
                        let mark = computeMark(lastProduct, p);
                        return { ...p, mark };
                    })

                    maxProduct = allProduct.reduce((prev, current) => (+prev.mark > +current.mark) ? prev : current)
                }
                resolve(maxProduct)

            })


        }
        else resolve(maxProduct);
    })

}

const computeMark = (lastPurchase, p) => {
    let mark = -1;
    if (p.category == lastPurchase.category)
        mark++;
    if (p.category == "clothes") {
        let match = lastPurchase.color.split(',').filter(element => p.color.includes(element));
        if (match = !null)
            mark++;
        match = lastPurchase.availableSizes.split(',').filter(element => p.availableSizes.includes(element));
        if (match = !null)
            mark++;
    }
    return mark;
}


// let maxProduct =
//     QuantityOfPurchasesFromAProduct
// // get the lasrt ordeed product
// const rows = generalDB.lastProductOrder(userId);
// console.log(rows)
// products = productBLL.get((products) => {
//     products = products.map(p => {
//         p.availableSizes = convertString(p.availableSizes);
//         return p;
//     })
//     res.send(products);
// });
// productsInOrder = productInOrderBLL.get((productInOrders) => {
//     res.send(productInOrders);
// });
// orders = order_BLL.get((order_s) => {
//     res.send(order_s);
// });




// //find the lastPurchase when p.idUser == idUser
// lastPurchase = productsInOrder.get(pio => {
//     let o = orders.get(p => {
//         if (p.idUser == idUser)
//             return p;
//     })
//     if (pio.idOrder == o.idOrder)
//         return pio;
// })
// //find the product that is the most close to lastPurchase 
// let arreyMarks = [];
// let num = 0;
// products.map(p => {
//     if (p.category == lastPurchase.category)
//         arreyMarks[num]++;
//     let match = lastPurchase.color.filter(element => p.color.includes(element));
//     if (match = !null)
//         arreyMarks[num]++;
//     let match = lastPurchase.availableSizes.filter(element => p.availableSizes.includes(element));
//     if (match = !null)
//         arreyMarks[num]++;
//     return p;
// })

// //find the high mark
// let maxMark = 0;
// let indexMaxMark = -1;
// for (var i = 0; i < arreyMarks.length; i++) {
//     (function () {
//         let PM = products.get(p => {
//             if (p.id == arreyMarks[i + 1])
//                 return p;
//         })
//         if (maxMark < arreyMarks[i] && (lastPurchase.idProduct = !PM.id)) {
//             maxMark = arreyMarks[i];
//             indexMaxMark = i + 1;
//         }
//     })();
// }
// if (indexMaxMark == -1)
//     return hotestProduct();

// return products.get(p => {
//     if (p.id == indexMaxMark)
//         return p;
// })


module.exports = { productAdd }
