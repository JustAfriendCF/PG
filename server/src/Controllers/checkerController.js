const checkerBLL = require("../BLL/checkerBLL");
const generalDB = require('../DAL/generalDB')

checkerController = app => {

    let router = '/checker';



    app.get(router + '/get', async (req, res) => {
        checkerBLL.get(async (checkers) => {

            for await (let checker of checkers) {
                let query = ' SELECT * FROM activityofchecker where idchecker=?'
                let activities = await generalDB._getResult(query, [checker.id]);
                checker.activities = activities;
            }

            res.send(checkers);
        });
    })

    app.post(router + '/post', (req, res) => {
        let checker = req.body;
        checkerBLL.insert(checker, (checkerId) => {
            res.send({ insertId: checkerId });
        });
    })

    // app.blockChecker
    app.post(router + '/blockChecker', (req, res) => {
        const { checkerId } = req.body;
        console.log('body:', req.body)
        checkerBLL.blockChecker(checkerId, (checkers) => {
            res.send(checkers);
        });
    })
    app.post(router + '/unBlockChecker', (req, res) => {
        const { checkerId } = req.body;
        console.log('body:', req.body)
        checkerBLL.unBlockChecker(checkerId, (checkers) => {
            res.send(checkers);
        });
    })
}
module.exports = checkerController;