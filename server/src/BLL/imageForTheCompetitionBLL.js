const generalDB = require("../DAL/generalDB");



const nameTable = 'imageForTheCompetition';
const getById = (id, cb) => {
    generalDB.getByKey(nameTable, 'idSubscription', id, (rows => {
        cb(rows);
    }));
}

const get = (cb) => {
    generalDB.getTable(nameTable, (rows) => {
        cb(rows);
    })
}
const getByC = async (cb) => {
    let rows = await generalDB._getResult2(`select * from imageforthecompetition where
    idSCompetition=
    (select max(idSCompetition) as max from imageforthecompetition)`);
    cb(rows);

}
const getWinner = (cb) => {
    const condition = `id=2`
    generalDB.getByCondition(nameTable, condition, (rows => {
        cb(rows);
    }));
}
const getNotChecked = (cb) => {
    const condition = `idChecker=2`
    generalDB.getByCondition(nameTable, condition, (rows => {
        cb(rows);
    }));
}
const insert = (imageForTheCompetition, cb) => {
    let newimageForTheCompetition = imageForTheCompetition;
    generalDB.insert(nameTable, newimageForTheCompetition, (insertId) => {
        cb(insertId);
    });
}
const addImageForTheCompetition = (imageForTheCompetitionId, checkerId, cb) => {
    console.log('aaaaa', checkerId)
    const columnDetails = {
        id: imageForTheCompetitionId,
        name: 'status_',
        value: 1
    }

    generalDB.updateColumnByNamen(nameTable, columnDetails, (result) => {
        cb(result);
    });
    columnDetails = {
        id: imageForTheCompetitionId,
        name: 'idChecker',
        value: checkerId
    }
    generalDB.updateColumnByNamen(nameTable, columnDetails, (result) => {
        cb(result);
    });
}
const imageForTheCompetitionSetChecker = (imageForTheCompetitionId, checkerId, cb) => {
    console.log('aaaaa', checkerId)

    const columnDetails = {
        id: imageForTheCompetitionId,
        name: 'idChecker',
        value: checkerId
    }
    generalDB.updateColumnByNamen(nameTable, columnDetails, (result) => {
        cb(result);
    });
}
const addLike = (imageForTheCompetition, cb) => {
    let newimageForTheCompetition = validation(imageForTheCompetition);
    generalDB.insert(nameTable, newimageForTheCompetition, (insertId) => {
        cb(insertId);
    });
}
const update = (imageForTheCompetition, cb) => {
    let newimageForTheCompetition = validation(imageForTheCompetition);
    generalDB.update(nameTable, newimageForTheCompetition, (result) => {
        cb(result);
    });
}

const validation = (imageForTheCompetition) => {
    let newimageForTheCompetition = {};
    if (imageForTheCompetition.idSCompetition)
        newimageForTheCompetition.idSCompetition = imageForTheCompetition.idSCompetition;
    if (imageForTheCompetition.status_ && (imageForTheCompetition.status_ == "sending" || imageForTheCompetition.status_ == "waiting for the checker" || imageForTheCompetition.status_ == "waiting for upload" || imageForTheCompetition.status_ == "canceled" || imageForTheCompetition.status_ == "in current competition" || imageForTheCompetition.status_ == "in the archive" || imageForTheCompetition.status_ == "winner"))
        newimageForTheCompetition.status_ = imageForTheCompetition.status_;
    if (imageForTheCompetition.idSubscription)
        newimageForTheCompetition.idSubscription = imageForTheCompetition.idSubscription;
    if (imageForTheCompetition.idChecker)
        newimageForTheCompetition.idChecker = imageForTheCompetition.idChecker;
    return newimageForTheCompetition;
}

module.exports = {
    get, insert, update, getNotChecked, getByC, imageForTheCompetitionSetChecker
}


