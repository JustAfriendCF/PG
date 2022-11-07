const activityOfCheckerBLL = require("../BLL/activityOfCheckerBLL");


activityOfCheckerController = app => {

    let router = '/activityOfChecker';



    app.get(router + '/get', (req, res) => {
        activityOfCheckerBLL.get((activityOfCheckers) => {
            res.send(activityOfCheckers);
        });
    })

    app.post(router + '/post', (req, res) => {
        let activityOfChecker = req.body;
        activityOfCheckerBLL.insert(activityOfChecker, (activityOfCheckerId) => {
            res.send({ insertId: activityOfCheckerId });
        });
    })





}
module.exports = activityOfCheckerController;