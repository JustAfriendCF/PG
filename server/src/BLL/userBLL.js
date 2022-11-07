const generalDB = require("../DAL/generalDB");



const nameTable = 'user';

const getById = (id, cb) => {
    generalDB.getByKey(nameTable, 'id', id, (rows => {
        cb(rows);
    }));
}
const getUser = (details, cb) => {
    debugger
    generalDB.get(nameTable, { email: details.username, password: details.pass }, (rows => {
        cb(rows);
    }));
}

const getUserByDetails = (details, cb) => {
    const condition = `Email="${details.email}" and password_="${details.pass}"`
    generalDB.getByCondition(nameTable, condition, (rows => {
        cb(rows);
    }));
}

const signIn = (details, cb) => {

    const condition = `Email="${details.email}" and password_="${details.pass}"`
    generalDB.getByCondition(nameTable, condition, (async rows => {
        if (!rows || rows.length == 0) {//אם הוא לא משתמש אז אולי הוא בודק
            let res = await generalDB._getResult2(`SELECT * FROM checker where password_='${details.pass}' and eMail='${details.email}' ;`)
            if (res && res[0]) { cb(res[0], 'checker', true); return; }
            else { cb(null, null, false); return; }
        }
        else if (!rows || rows.length != 0) {
            let res = await generalDB._getResult2(`SELECT * FROM user where password_='${details.pass}' and eMail='${details.email}' and status_=1;`)
            if (res && res[0]) { cb(res[0], 'blockUser', false); return; }
        }
        cb(rows[0], 'user', true)
    }));
}
const get = (cb) => {
    generalDB.getTable(nameTable, (rows) => {
        cb(rows);
    })
}
const insert = (user, cb) => {
    let newUser = validation(user);
    if (newUser !== null)
        generalDB.insert(nameTable, newUser, (insertId) => {
            cb(insertId);
        });
}

const update = (user, cb) => {
    let newUser = validation(user);
    generalDB.update(nameTable, newUser, (result) => {
        cb(result);
    });
}
const blockUser = (userId, cb) => {
    console.log('aaaaa', userId)
    const columnDetails = {
        id: userId,
        name: 'status_',
        value: 1
    }
    generalDB.updateColumnByNamen(nameTable, columnDetails, (result) => {
        cb(result);
    });
}

const validation = (user) => {
    let newUser = {};
    if (user.createpassword && user.createpassword.length <= 45)
        newUser.password_ = user.createpassword;
    else
        return null;
    if (user.fullname && user.fullname.length <= 45)
        newUser.firstName = user.fullname;
    else
        return null;
    if (user.email && user.email.length <= 45)
        newUser.Email = user.email;
    else
        return null;
    // if (user.lastName && user.lastName.length <= 45)
    //     newUser.lastName = user.lastName;
    // else
    //     return null;
    // if (user.statusReceivingAdvertisements)
    //     newUser.statusReceivingAdvertisements = user.statusReceivingAdvertisements;
    // else
    //     return null;
    // if (user.credits)
    //     newUser.credits = user.credits;
    // else
    //     return null;
    return newUser;
}

module.exports = {
    get, insert, update, getUserByDetails, blockUser, signIn, validation
}


