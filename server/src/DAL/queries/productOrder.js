const last_product_order = (user_id) => {
    return `SELECT o.idUser, p.name_ ,p.image , p.price,p.description_,p.category,p.color, p.qryInStock ,p.availableSizes ,po.date_ 
    FROM productinorder po 
    INNER JOIN product p 
    ON p.id= po.idProduct
    INNER JOIN order_ o ON o.id=po.idOrder
    WHERE o.idUser=${user_id}
    ORDER BY po.date_ DESC LIMIT 1;`;
}
module.exports = { last_product_order }