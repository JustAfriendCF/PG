const userBLL = require("../BLL/userBLL");
const generalDB = require("../DAL/generalDB");


userController = app => {

    let router = '/user';



    app.get(router + '/get', (req, res) => {
        userBLL.get((users) => {
            res.send(users);
        });
    })
    app.post(router + '/blockUser', (req, res) => {
        const { userId } = req.body;
        console.log('body:', req.body)
        userBLL.blockUser(userId, (users) => {
            res.send(users);
        });
    })
    // app.getByUsername_pass(router + '/get', (req, res) => {
    //     let details = {
    //         username: req.username,
    //         pass: req.password
    //     }
    //     userBLL.getUser(details, (user) => {
    //         res.send(user);
    //         // res.send("user: ", user);
    //     });
    // })

    // app.get(router + '/getUserById', (req, res) => {
    //      userBLL.get((u)=>{u.id = req.userId
    //     });
    //     //  userBLL.get((users)=>{
    //     //     res.send(users);
    //     // });
    // })

    app.post(router + '/post', (req, res) => {
        let user = req.body;
        userBLL.insert(user, (userId) => {
            res.send({ insertId: userId });
        });
    })

    app.post(`${router}/signIn`, (req, res) => {
        let { email, password } = req.body;
        userBLL.signIn({ email: email, pass: password }, (user, type, ok) => {
            console.log('result:', user, type, ok);
            res.send({ user, type, ok });
        })
    });

    app.post(`${router}/signUp`, (req, res) => {
        try {
            let { email, createpassword } = req.body;
            console.log(`in sign in email: ${email}`);
            let newUser = userBLL.validation(req.body);
            userBLL.signIn({ email: email, pass: createpassword }, (user, type, ok) => {
                if (user) {
                    res.send({ user: null, type: 'exist', ok: false });
                } else {
                    if (createpassword.startsWith('ch'))
                    // אם הסיסמא מתאימה לבודק, להכניס לטבלת בודקים
                    {
                        let rows =
                            generalDB.insert('checker', newUser, (id) => {
                                newUser.id = id;
                                res.send({ user: newUser, type: 'checker', ok: true });
                            })
                    }
                    else {
                        userBLL.insert(req.body, (userId) => {
                            newUser.id = userId;
                            res.send({ user: newUser, type: 'user', ok: true });
                        })
                    }

                }
            })
        } catch (ex) {
            return res.status(500)
        }
    });
}
module.exports = userController;