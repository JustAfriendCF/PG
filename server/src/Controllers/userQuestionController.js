const userQuestionBLL = require("../BLL/userQuestionBLL");


userQuestionController = app => {

    let router = '/userQuestion';



    app.get(router + '/get', (req, res) => {
        userQuestionBLL.get((userQuestions) => {
            res.send(userQuestions);
        });
    })

    app.post(router + '/post', (req, res) => {
        let userQuestion = req.body;
        userQuestionBLL.insert(userQuestion, (userQuestionId) => {
            res.send({ insertId: userQuestionId });
        });
    })





}
module.exports = userQuestionController;