const complaintsBLL = require("../BLL/complaintsBLL");


complaintsController = app => {

    let router = '/complaints';



    app.get(router + '/get', (req, res) => {
        complaintsBLL.get((complaintss) => {
            res.send(complaintss);
        });
    })

    app.post(router + '/post', (req, res) => {
        let complaints = req.body;
        complaintsBLL.insert(complaints, (complaintsId) => {
            res.send({ insertId: complaintsId });
        });
    })
    





}
module.exports = complaintsController;