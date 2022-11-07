const blackListBLL = require("../BLL/blackListBLL");


blackListController = app => {

    let router = '/blackList';



    app.get(router + '/get', (req, res) => {
        blackListBLL.get((blackLists) => {
            res.send(blackLists);
        });
    })

    app.post(router + '/post', (req, res) => {
        let blackList = req.body;
        blackListBLL.insert(blackList, (blackListId) => {
            res.send({ insertId: blackListId });
        });
    })





}
module.exports = blackListController;