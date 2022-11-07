const userAnswerBLL = require("../BLL/userAnswerBLL");


userAnswerController = app => {

    let router = '/userAnswer';



    app.get(router + '/get', (req, res) => {
        userAnswerBLL.get((userAnswers) => {
            res.send(userAnswers);
        });
    })

    app.post(router + '/post', (req, res) => {
        let userAnswer = req.body;
        userAnswerBLL.insert(userAnswer, (userAnswerId) => {
            res.send({ insertId: userAnswerId });
        });
    })





}
module.exports = userAnswerController;