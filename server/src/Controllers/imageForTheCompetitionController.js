const imageForTheCompetitionBLL = require("../BLL/imageForTheCompetitionBLL");
const path = require('path');
const { before } = require("lodash");


imageForTheCompetitionController = app => {

    let router = '/imageForTheCompetition';



    app.get(router + '/get', (req, res) => {
        imageForTheCompetitionBLL.getByC((imageForTheCompetitions) => {
            res.send(imageForTheCompetitions);
        });
    })
    app.get(router + '/getWinner', (req, res) => {
        imageForTheCompetitionBLL.get((imageForTheCompetitions) => {
            let max = 0, beforeMax = 0;

            imageForTheCompetitions.forEach(image => {
                if (image.idSCompetition > max) {
                    beforeMax = max;
                    max = image.idSCompetition;
                } else {
                    if (image.idSCompetition != max && image.idSCompetition > beforeMax) {
                        beforeMax = image.idSCompetition
                    }
                }
            });

            const imagesForWinnerCompetition = imageForTheCompetitions.filter(im => im.idSCompetition === beforeMax);
            const winner = imagesForWinnerCompetition.reduce(function (prev, current) {
                return (prev.likesNum > current.likesNum) ? prev : current
            });
            res.send(winner);
        });
    })
    app.get(router + '/getNotChecked', (req, res) => {
        imageForTheCompetitionBLL.getNotChecked((imageForTheCompetitions) => {
            res.send(imageForTheCompetitions);
        });
    })


    app.get(router + '/getPicture', async (req, response) => {
        console.log('get file: ', req.query);
        let { fileName } = req.query;
        // let fileName = 'shirts.jpg';
        var path1 = `${__dirname}/../../images/imageForTheCompetition/${fileName}`
        console.log("path1######", path1);
        response.sendFile(path.resolve(path1));
    });

    app.get(router + '/getBestPicture', async (req, response) => {
        console.log('get file: ', req.query);
        let { fileName } = req.query;
        // let fileName = 'shirts.jpg';
        var path1 = `${__dirname}/../../images/imageForTheCompetition/${fileName}`
        console.log("path1######", path1);
        response.sendFile(path.resolve(path1));
    });
    app.post(`${router}/upload`, (req, res) => {
        try {
            var myPath = `${__dirname}/../../images/imageForTheCompetition/${req.files.file.name}`;
            uploadFile(req.files.file, myPath);



            let imageForTheCompetition = { idSubscription: req.body.userId, imageSrc: req.files.file.name, idChecker: 2 };
            imageForTheCompetitionBLL.insert(imageForTheCompetition, (imageForTheCompetitionId) => {
                res.send({ insertId: imageForTheCompetitionId });
            });
        } catch (ex) {
            return res.status(500)
        }
    });
    const uploadFile = (file, path) => {
        file.mv(path, function (err) {
            if (err)
                console.log(err);
            else
                console.log('ok');
        });
    }

    app.post(`${router}/addlike`, (req, res) => {
        try {
            const { imageForTheCompetition } = req.body;
            imageForTheCompetitionBLL.addLike(imageForTheCompetition, (imageForTheCompetitionId) => {
                res.send({ updatedId: imageForTheCompetitionId });
            });
        } catch (ex) {
            return res.status(500)
        }
    });


    app.post(router + '/addImageForTheCompetition', (req, res) => {
        const { imageForTheCompetitionId, checkerId } = req.body;
        console.log('body:', req.body)
        imageForTheCompetitionBLL.addImageForTheCompetition(imageForTheCompetitionId, checkerId, (imageForTheCompetitions) => {
            res.send(imageForTheCompetitions);
        });
    });

    app.post(router + '/imageForTheCompetitionSetChecker', (req, res) => {
        const { imageForTheCompetitionId, checkerId } = req.body;
        console.log('body:', req.body)
        imageForTheCompetitionBLL.imageForTheCompetitionSetChecker(imageForTheCompetitionId, checkerId, (imageForTheCompetitions) => {
            res.send(imageForTheCompetitions);
        });
    });
}
module.exports = imageForTheCompetitionController;