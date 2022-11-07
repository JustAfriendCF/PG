const imageOrCommentBLL = require("../BLL/imageOrCommentBLL");


imageOrCommentController = app => {

    let router = '/imageOrComment';



    app.get(router + '/get', (req, res) => {
        imageOrCommentBLL.get((imageOrComments) => {
            res.send(imageOrComments);
        });
    })

    app.post(router + '/post', (req, res) => {
        let imageOrComment = req.body;
        imageOrCommentBLL.insert(imageOrComment, (imageOrCommentId) => {
            res.send({ insertId: imageOrCommentId });
        });
    })





}
module.exports = imageOrCommentController;