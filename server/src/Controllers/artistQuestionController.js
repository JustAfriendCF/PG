const artistQuestionBLL = require("../BLL/artistQuestionBLL");


artistQuestionController = app => {

    let router = '/artistQuestion';



    app.get(router + '/get', (req, res) => {
        artistQuestionBLL.get((artistQuestions) => {
            res.send(artistQuestions);
        });
    })

    app.post(router + '/post', (req, res) => {
        let artistQuestion = req.body;
        artistQuestionBLL.insert(artistQuestion, (artistQuestionId) => {
            res.send({ insertId: artistQuestionId });
        });
    })





}
module.exports = artistQuestionController;