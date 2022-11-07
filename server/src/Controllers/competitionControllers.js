const competitionBLL = require("../BLL/competitionBLL");
const competion = require("../functions/competion");

competitionController = app => {

    let router = '/competition';



    app.get(router + '/get', (req, res) => {
        competitionBLL.get((competitions) => {
            res.send(competitions);
        });
    })

    app.post(router + '/post', (req, res) => {
        let competition = req.body;
        competitionBLL.insert(competition, (competitionId) => {
            res.send({ insertId: competitionId });
        });
    })

    app.post(router + '/getCompetion', async (req, res) => {

        let competition = await competion.insertCompetion(req);
        res.send({ competition });

    })



}
module.exports = competitionController;