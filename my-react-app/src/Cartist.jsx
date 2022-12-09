
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { Form, Button, Table, Alert } from 'react-bootstrap';
import userService from "../../../services/userService";
import serverUrl from "../../../utilities/serverUrl";
import UserContext from '../../../UserContext';
import '../../../storeMD/index.css'
import '../../pages/CSS_page/login.css'
import productService from '../../../services/productService';
// import UserContext from '../../UserContext';

//const signUp = () => {
const Artist1 = (props) => {

    const [checkers, setCheckers] = useState([]);

    useEffect(async () => {
        // getComp();
        const res = await axios.get("http://localhost:8080/checker/get");
        console.log(res.data);
        setCheckers(res.data);
    }, []);
    // useEffect(async () => {
    //     // getComp();
    //     const res = await axios.get("http://localhost:8080/order_/getWithProducts");
    //     console.log(res.data);
    // }, []);
    // useEffect(async () => {
    //     // getComp();
    //     const res = await axios.get("http://localhost:8080/order_/getByOrder/:orderId");
    //     console.log(res.data);
    // }, []);
    const blockChecker = async (checkerId) => {
        try {
            console.log("here")
            //UserContext.id
            const response = await axios.post("http://localhost:8080/checker/blockChecker", { checkerId: checkerId })
            console.log("response", response.data);

        }
        catch (e) {
            console.log("error", e)
        }
    }
    const unBlockChecker = async (checkerId) => {
        try {
            console.log("here")
            //UserContext.id
            const response = await axios.post("http://localhost:8080/checker/unBlockChecker", { checkerId: checkerId })
            console.log("response", response.data);

        }
        catch (e) {
            console.log("error", e)
        }
    }

    // class ArtistComponent extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    // toggleMode() {
    //     var newMode = this.state.mode === 'login' ? 'signup' : 'login';
    //     this.setState({ mode: newMode });
    // }

    return (
        <div>
            {/* <div className={`form-block-wrapper  form-block-wrapper --is-login`} ></div> */}
            <section className={`form-block form-block--is-login`}>
                <header className="form-block__header">
                    <h1>הוספת מוצר</h1>
                </header>
                <ArtistForm onSubmit={props.onSubmit} />
            </section>
            <section>
                <div >
                    {!checkers.length ? (
                        <div>Loading...</div>
                    ) : (
                        <ul className="checker">
                            {checkers.map((checker) => (
                                <li key={checker.id}>

                                    {checker.firstName} {checker.lastName}
                                    <div className="activityofchecker">
                                        פעילות בודק:
                                        {checker.activities.map(activity => <>
                                            <br />
                                            {activity.date_}
                                            <br />
                                            {activity.description}
                                        </>)}
                                        <br />
                                        הבודק {checker.status_ === 1 ? 'חסום' : 'פעיל'}

                                        <div>




                                        </div>
                                        <div >
                                            <button
                                                onClick={() => { debugger; blockChecker(checker.id) }}
                                                className="button primary"
                                            >
                                                חסימת בודק
                                            </button>
                                            <button
                                                onClick={() => { debugger; unBlockChecker(checker.id) }}
                                                className="button primary"
                                            >
                                                ביטול חסימת בודק
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </section>
            {/* <section>
                <div >
                    {!checkers.length ? (
                        <div>Loading...</div>
                    ) : (
                        <ul className="Order">
                            {checkers.map((order_) => (
                                <li key={order_.id}>

                                    {checker.idUser} {checker.date_}
                                    {/* <div className="activityofchecker">
                                        פעילות בודק:
                                        {checker.activities.map(activity => <>
                                            <br />
                                            {activity.date_}
                                            <br />
                                            {activity.description}
                                        </>)}
                                        <br />
                                        הבודק {checker.status_ === 1 ? 'חסום' : 'פעיל'}

                                     
                                     
                                    </div> //סיום 
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </section>   */}

        </div>
    )
}



const ArtistForm = (props) => {
    // const [checkers, setCheckers] = useState([]);

    // useEffect(async () => {
    //     // getComp();
    //     const res = await axios.get("http://localhost:8080/checker/get");
    //     console.log(res.data);
    //     setCheckers(res.data);
    // }, []);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        debugger
        console.log(selectedFile)
        handleSubmit()
    }, [selectedFile]);

    const handleSubmit = () => {
        debugger
        // await Add_Company(companyState, selectedFile);
        userService.handleInputChange(selectedFile, "checker");
    }
    // const blockChecker = async (checkerId) => {
    //     try {
    //         console.log("here")
    //         //UserContext.id
    //         const response = await axios.post("http://localhost:8080/checker/blockChecker", { checkerId: checkerId })
    //         console.log("response", response.data);

    //     }
    //     catch (e) {
    //         console.log("error", e)
    //     }
    // }
    // const unBlockChecker = async (checkerId) => {
    //     try {
    //         console.log("here")
    //         //UserContext.id
    //         const response = await axios.post("http://localhost:8080/checker/unBlockChecker", { checkerId: checkerId })
    //         console.log("response", response.data);

    //     }
    //     catch (e) {
    //         console.log("error", e)
    //     }
    // }
    const [productDetails, setproductDetails] = useState({ fullname: '', email: '', createpassword: '', repeatPassword: '' });

    const onChange = (name, e) => {
        setproductDetails({ ...productDetails, [name]: e.target.value })
    }

    return (
        <div>
            <div>
                <form onSubmit={() => { props.onSubmit(productDetails) }}>

                    <div className="form-block__input-wrapper_artist">
                        {/* sign in */}
                        {/* <div className="form-group form-group--login">
                    <Input value={productDetailsLogin.email} type="email" id="productname" label="אימייל" disabled={props.mode === 'signup'} onChange={(e) => onChangeLogin('email', e)} />
                    <Input value={productDetailsLogin.password} type="password" id="password" label="סיסמא" disabled={props.mode === 'signup'} onChange={(e) => onChangeLogin('password', e)} />
                </div> */}
                        {/* <div className="form-group form-group--login">
                        <Input value={productDetailsLogin.email} onChange={(e) => { setUserDetailsLogin({ ...productDetailsLogin, email: e.target.value }) }} type="email" id="productname" label="product name" disabled={this.props.mode === 'signup'} />
                        <Input value={productDetailsLogin.password} type="password" id="password" label="password" disabled={this.props.mode === 'signup'} />
                    </div> */}
                        {/* signUp */}
                        {<div className="form-group form-group--login">
                            <Input value={productDetails.fullname} type="text" id="name_" label="שם מוצר" onChange={(e) => onChange('name_', e)} />
                            <Input value={productDetails.email} type="number" id="qryInStock" label="כמות" onChange={(e) => onChange('qryInStock', e)} />
                            <Input value={productDetails.price} type="number" id="price" label="מחיר" onChange={(e) => onChange('price', e)} />
                            <Input value={productDetails.description_} type="text" id="description_" label="תאור" onChange={(e) => onChange('description_', e)} />
                            <Input value={productDetails.color} type="text" id="color" label="צבע" onChange={(e) => onChange('color', e)} />
                            <Input value={productDetails.number} type="number" id="size" label="מידה" onChange={(e) => onChange('size', e)} />
                            <Input value={productDetails.category} type="text" id="category" label="קטגוריה" onChange={(e) => onChange('category', e)} />
                            <Input value={productDetails.category} type="text" id="image" label="תמונה" onChange={(e) => onChange('image', e)} />
                        </div>}
                    </div>
                    {/* <button className="button button--primary full-width" type="submit">{props.mode === 'login' ? 'Log In' : 'Sign Up'}</button> */}
                    <input className="button button--primary full-width" type="button" value="שלח" onClick={() => { props.onSubmit(productDetails) }} />
                </form>


            </div>
            {/* <div>
                {!checkers.length ? (
                    <div>Loading...</div>
                ) : (
                    <ul className="checker">
                        {checkers.map((checker) => (
                            <li key={checker.id}>

                                {checker.firstName} {checker.lastName}
                                <div className="activityofchecker">
                                    פעילות בודק:
                                    {checker.activities.map(activity => <>
                                        {activity.date_} {activity.details}
                                    </>)}

                                    הבודק {checker.status_=== 1 ? 'חסום' : 'פעיל'}

                                    <div>
                                        



                                    </div>
                                    <div >
                                        <button
                                             onClick={() => blockChecker(checkers.id)}
                                            className="button primary"
                                        >
                                            חסימת בודק
                                        </button>
                                        <button
                                            onClick={() => unBlockChecker(checkers.id)}
                                            className="button primary"
                                        >
                                            ביטול חסימת בודק
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div> */}
        </div>
    )
}

const Input = ({ id, type, label, disabled, onChange }) => (
    <input className="form-group__input" type={type} id={id} placeholder={label} disabled={disabled} onChange={onChange} />
);

const Artist = (props) => {
    return (
        <>
            {/* <h1>{product.id}</h1> */}
            <Artist1
                onSubmit={
                    async (productDetails) => {
                        var response;
                        let productId = await productService.post(productDetails);
                        alert(`הוסף מוצר חדש`);

                        console.log(productId);
                    }
                }
            />
        </>
    );
}

export default Artist;
//ReactDOM.render(<App />, document.getElementById("app"));
