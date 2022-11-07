const checkerBLL = require("../BLL/checkerBLL");
const userBLL = require("../BLL/userBLL");
const login = (values, mode) => {
    checkers = checkerBLL.get;
    users = userBLL.get;
    // const [values, setValues] = ({ name: '', });
    if (mode = 'signup') {
        //if the password start /cheker check if checker exists in checker list
        //Check if the user exists
        //if yes send eror
        //if the password start /cheker add to checkerlist and send request to the artist
        //else add to users
        if (values.password == values.repeatPassword) {
            let x = console.log(values.password.startsWith('/cheker'));
            if (x) {
                checkers.password_.forEach(element => {
                    if (element == values.password)
                        send('eror: checker exists')
                });

                checkerBLL.insert(values)
                send('you have send request to the artist')
            }
            else {
                users.password_.forEach(element => {
                    if (element == values.password)
                        send('eror: checker exists')
                });
                userBLL.insert(values)
            }
        } else send('eror: 2 passwords must match')
    }
    else {
        //if the password start /cheker check if checker exists in checker list
        //else check if exists in user list
        //else return eror

    }


}