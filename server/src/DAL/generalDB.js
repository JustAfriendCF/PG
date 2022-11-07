

const db = require('./DBconnection');
const product_query = require("./queries/productOrder")



const getTable = (nameTable, cb) => {
    db.query(`select * from ${nameTable}`, (err, rows) => {
        if (err) console.log(err);
        cb(rows);
    });
}
const getById = (nameTable, id, cb) => {
    db.query(`select * from ${nameTable} where id=?`, [id], (err, rows) => {
        if (err) console.log(err);
        cb(rows);
    });
}

const getByKey = (nameTable, key, value, cb) => {
    db.query(`select * from ${nameTable} where ${key}=?`, [value], (err, rows) => {
        if (err) console.log(err);
        cb(rows);
    });
}


const getByKeys = async (nameTable, key, values, cb) => {
    db.query(`select * from ${nameTable} where ${key} IN ?`, values, (err, rows) => {
        if (err) console.log(err);
        cb(rows);
    });
}

const getByCondition = (nameTable, condition, cb) => {
    db.query(`select * from ${nameTable} where ${condition}`, (err, rows) => {
        if (err) console.log(err);
        cb(rows);
    });
}

const getByName = (nameTable, name, cb) => {
    db.query(`select * from ${nameTable} where name=?`, [name], (err, rows) => {
        if (err) console.log(err);
        cb(rows);
    });
}

const insert = (nameTable, object, cb) => {
    db.query(`insert into ${nameTable} set ?`, object, (err, result) => {
        if (err)
            console.log(err);
        let id = result ? result.insertId : -1
        cb(id);
    });
}
const update = (nameTable, object, cb) => {
    const columns = Object.keys(object);
    const values = Object.values(object);
    let id = object.id;
    let sql = `UPDATE ${nameTable} SET ` + columns.join(" = ? ,") + " = ?" + " where id=" + id;
    db.query(sql, values, (err, result) => {
        if (err) console.log(err);
        cb(result);
    });
}

const updateColumnByNamen = (nameTable, object, cb) => {
    const { id, name, value } = object;
    let sql = `UPDATE ${nameTable} SET ` + name + " = ?" + " where id=" + id;
    db.query(sql, value, (err, result) => {
        if (err) console.log(err);
        cb(result);
    });
}

const lastProductOrder = (userId) => {

    db.query(product_query.last_product_order(userId), (err, rows) => {
        if (err) console.log(err);
        cb(rows);
    });


}
const _getResult_cb = async (query, params, cb) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, rows) => {
            if (err) console.log(err);
            cb(rows && !err ? rows : null);
        })
    })
}

const _getResult = async (query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, rows) => {
            if (err) console.log(err);
            resolve(rows && !err ? rows : null);
        })
    })
}

const _getResult2 = async (query) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err, rows) => {
            if (err) console.log(err);
            resolve(rows && !err ? rows : null);
        })
    })
}
module.exports = {
    getTable, _getResult2, getByKey, getById, getByName, insert, update, lastProductOrder, getByCondition, _getResult, _getResult_cb, updateColumnByNamen, getByKeys
}


