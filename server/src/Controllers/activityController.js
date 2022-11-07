const activityBLL = require("../BLL/activityBLL");


activityController = app => {

    let router = '/activity';



    app.get(router + '/get', (req, res) => {
        activityBLL.get((activitys) => {
            res.send(activitys);
        });
    })

    app.post(router + '/post', (req, res) => {
        let activity = req.body;
        activityBLL.insert(activity, (activityId) => {
            res.send({ insertId: activityId });
        });
    })





}
module.exports = activityController;