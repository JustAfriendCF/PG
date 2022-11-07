import React, { useContext, useState } from 'react';
import '../pages/CSS_page/login.css'
import userService from '../../services/userService';
import UserContext from '../../UserContext';
import { useHistory } from 'react-router-dom';
const mode = 'login';

//const signUp = () => {
class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.mode
        }
    }
    toggleMode() {
        var newMode = this.state.mode === 'login' ? 'signup' : 'login';
        this.setState({ mode: newMode });
    }
    render() {
        return (
            <div>
                <div className={`form-block-wrapper form-block-wrapper--is-${this.state.mode}`} ></div>
                <section className={`form-block form-block--is-${this.state.mode}`}>
                    <header className="form-block__header">
                        <h1>{this.state.mode === 'login' ? 'ברוכים השבים' : 'ברוכים הבאים'}</h1>
                        <span>{this.state.mode === 'login' ? '  אין' : 'יש'} לכם חשבון? לחצו כאן &#8594;</span>
                        <div className="form-block__toggle-block">
                            <input id="form-toggler" type="checkbox" onClick={this.toggleMode.bind(this)} />
                            <label htmlFor="form-toggler"></label>
                        </div>
                    </header>
                    <LoginForm mode={this.state.mode} onSubmit={this.props.onSubmit} />
                </section>
            </div>
        )
    }
}



const LoginForm = (props) => {

    const [userDetailsLogin, setUserDetailsLogin] = useState({ email: "", password: "" });
    const [userDetailsLogUp, setUserDetailsLogUp] = useState({ fullname: '', email: '', createpassword: '', repeatPassword: '' });

    const onChangeLogin = (name, e) => {
        setUserDetailsLogin({ ...userDetailsLogin, [name]: e.target.value })
    }
    const onChangeLogUp = (name, e) => {
        setUserDetailsLogUp({ ...userDetailsLogUp, [name]: e.target.value })
    }

    return (
        // <form onSubmit={() => { this.props.onSubmit(userDetailsLogin, this.props.mode) }}>
        <form onSubmit={() => { props.onSubmit(props.mode, props.mode == 'login' ? userDetailsLogin : userDetailsLogUp) }}>

            <div className="form-block__input-wrapper">
                {/* sign in */}
                <div className="form-group form-group--login">
                    <Input value={userDetailsLogin.email} type="email" id="username" label="אימייל" disabled={props.mode === 'signup'} onChange={(e) => onChangeLogin('email', e)} />
                    <Input value={userDetailsLogin.password} type="password" id="password" label="סיסמא" disabled={props.mode === 'signup'} onChange={(e) => onChangeLogin('password', e)} />
                </div>
                {/* <div className="form-group form-group--login">
                        <Input value={userDetailsLogin.email} onChange={(e) => { setUserDetailsLogin({ ...userDetailsLogin, email: e.target.value }) }} type="email" id="username" label="user name" disabled={this.props.mode === 'signup'} />
                        <Input value={userDetailsLogin.password} type="password" id="password" label="password" disabled={this.props.mode === 'signup'} />
                    </div> */}
                {/* signUp */}
                {<div className="form-group form-group--signup">
                    <Input value={userDetailsLogUp.fullname} type="text" id="fullname" label="שם" disabled={props.mode === 'login'} onChange={(e) => onChangeLogUp('fullname', e)} />
                    <Input value={userDetailsLogUp.email} type="email" id="email" label="אימייל" disabled={props.mode === 'login'} onChange={(e) => onChangeLogUp('email', e)} />
                    <Input value={userDetailsLogUp.createpassword} type="password" id="createpassword" label="סיסמא" disabled={props.mode === 'login'} onChange={(e) => onChangeLogUp('createpassword', e)} />
                    <Input value={userDetailsLogUp.repeatPassword} type="password" id="repeatpassword" label="אישור סיסמא" disabled={props.mode === 'login'} onChange={(e) => onChangeLogUp('repeatPassword', e)} />
                </div>}
            </div>
            {/* <button className="button button--primary full-width" type="submit">{props.mode === 'login' ? 'Log In' : 'Sign Up'}</button> */}
            <input className="button button--primary full-width" type="button" value="שלח" onClick={() => { props.onSubmit(props.mode, props.mode == 'login' ? userDetailsLogin : userDetailsLogUp) }} />
        </form>
    )
}

const Input = ({ id, type, label, disabled, onChange }) => (
    <input className="form-group__input" type={type} id={id} placeholder={label} disabled={disabled} onChange={onChange} />
);
const SignUp = (props) => {

    const { user, setUser } = useContext(UserContext);//get the curent user from the context
    const history = useHistory();

    return (
        <>
            {/* <h1>{user.id}</h1> */}
            <div className={`app app--is-${mode}`}>

                <LoginComponent
                    mode={mode}
                    onSubmit={
                        async (mode, userDetails) => {
                            var response;
                            // sign in
                            if (mode == 'login') {
                                let { user, type, ok } = await userService.signIn(userDetails);//sighn-in
                                console.log(userService.signIn(userDetails));
                                // alert(type)
                                if (ok) {
                                    console.log('user', user);
                                    setUser(user);
                                    // put in the local storage
                                    const json = JSON.stringify(user); //set the context to storage
                                    localStorage.setItem("user", json); ////set the context to storage

                                    alert("ברוך הבא: " + user.firstName)
                                    console.log(user);
                                    if (user.firstName == 'dvora')
                                        history.push('/artist');
                                    else if (type == 'checker')
                                        // לאם זה בודק-
                                        history.push('/checker');

                                }
                                else if (type == 'blockUser') {
                                    alert('Sorry, you are blocked from the system')
                                }
                                else {
                                    alert('the user not found');
                                }

                                // להכניס לקונטקסט
                            }

                            // sign up
                            else {

                                let { user, type, ok } = await userService.signUp(userDetails);//sighn-up
                                if (ok) {
                                    setUser(user);
                                    if (type == 'checker')
                                        alert('נרשמת בהצלחה כבודק המתן לאישור מנהל')
                                    else
                                        alert(`נרשמת בהצלחה למערכת`)

                                }
                                else {
                                    alert('המשתמש אינו קיים');
                                }
                            }
                            //לשלוח לשרת
                            console.log('1 submit');
                        }
                    }
                />
            </div></>
    );
}

export default SignUp;
//ReactDOM.render(<App />, document.getElementById("app"));
