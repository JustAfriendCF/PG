
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
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import { ImBlocked, ImUserCheck } from 'react-icons/im';
import { FaRegCheckCircle } from 'react-icons/fa';
import { RiListUnordered } from 'react-icons/ri';
import { BsCalendar2Date } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { TbCircleCheck } from 'react-icons/tb';

import Accordion from 'react-bootstrap/Accordion';

//const signUp = () => {
const Artist1 = (props) => {

    const [checkers, setCheckers] = useState([]);
    const [orders, setOrders] = useState([ ])
    const [productByOrder, setProductByOrder] = useState([ ])
    const [productDetails, setProductDetails] = useState([ ])
    useEffect(() => {
        // getComp();
        axios.get("http://localhost:8080/checker/get").then(res => {

            console.log(res.data);
            setCheckers(res.data);
        });
        axios.get("http://localhost:8080/order_/get").then(res => {

            console.log(res.data);
            setOrders(res.data);
        });
        axios.get("http://localhost:8080/order_/getProductInOrder").then(res => {

            console.log(res.data);
            setProductByOrder(res.data);
        });
        axios.get("http://localhost:8080/product/get").then(res => {

            console.log(res.data);
            setProductDetails(res.data);
        });
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
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div >
            {/* <div className={`form-block-wrapper  form-block-wrapper --is-login`} ></div> */}
            <div className='header-artist'>
                <h3 className='title-artist'>
                    <ImUserCheck className='icon-check' />
                    רשימת הבודקים
                </h3>
                <Button className='btn-add' variant="primary" onClick={handleShow}>
                    הוספת מוצר
                </Button>
            </div>

            {/* <section className={`form-block form-block--is-login`}>

                <header className="form-block__header">

                </header> */}
            <ArtistForm className='padding' handleClose={handleClose} show={show} onSubmit={props.onSubmit} />
            {/* </section> */}

            <section >
                <div >
                    {!checkers.length ? (
                        <div>Loading...</div>
                    ) : (
                        <>

                            <ul className="checker row">
                                {checkers.map((checker) => (
                                    <Card className='card-container col-3' style={{ width: '18rem' }} key={checker.id}>
                                        <Card.Body className='card-body-checker'>
                                            <Card.Title >{checker.firstName} {checker.lastName}  : פעילות בודק</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted"> </Card.Subtitle>
                                            {checker?.activities?.map(activity =>
                                                <Card.Text>
                                                    <br />
                                                    {activity.date_}
                                                    <br />
                                                    {activity.description}
                                                    <br />
                                                    הבודק {checker.status_ === 1 ? 'חסום' : 'פעיל'}
                                                </Card.Text>
                                            )}
                                            <div className='div-btn'>
                                                <button
                                                    onClick={() => { debugger; blockChecker(checker.id) }}
                                                    className="button primary"
                                                >
                                                    חסימת בודק
                                                    <ImBlocked className='icon-check' />
                                                </button>
                                                <button
                                                    onClick={() => { debugger; unBlockChecker(checker.id) }}
                                                    className="button primary"
                                                >
                                                    ביטול חסימת בודק
                                                    <FaRegCheckCircle className='icon-check' />
                                                </button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </section >

            <div >
                <h3 className='title-orders'>
                    <RiListUnordered className='icon-check' />
                    רשימת הזמנות
                </h3>
                <div className='row orders-container'>
                    <Accordion defaultActiveKey="0">
                        {orders && orders?.length && orders.sort((a, b )=> +b.id - +a.id).map((orderItem) =>
                            <Accordion.Item eventKey={orderItem.id}>
                                {/* <div className='current-order'> */}
                                <Accordion.Header>
                                    <div className='accor-header'>מספר הזמנה: {orderItem?.id}</div>
                                    <div className='date-order'>
                                        <BsCalendar2Date /> {new Date(orderItem?.date_).toLocaleDateString()}
                                    </div>
                                </Accordion.Header>
                                {productByOrder && productByOrder?.length &&
                                    productByOrder?.map((productItem) =>
                                        productItem?.idOrder === orderItem?.id &&
                                        <>
                                            <Accordion.Body className='accor-body'>
                                                <div>
                                                    {productItem?.status_ ? <TbCircleCheck className='status-true' /> : <AiOutlineCloseCircle className='status-false' />}
                                                    סטטוס
                                                </div>
                                                <div>                                               </div>
                                                {productDetails && productDetails.map((itemDetails) =>
                                                    itemDetails?.id === productItem?.idProduct &&
                                                    <>
                                                        <div className='product-detail'>
                                                            <div className='product-detail-title col-2-t'>מזהה: </div>
                                                            <div>{itemDetails.id}</div>
                                                        </div>
                                                        <div className='product-detail'>
                                                            <div className='product-detail-title col-2-t'>שם פריט: </div>
                                                            <div>{itemDetails.name_}</div>
                                                        </div>
                                                        <div className='product-detail'>
                                                            <div className='product-detail-title col-2-t'>תיאור פריט: </div>
                                                            <div>{itemDetails.description_}</div>
                                                        </div>
                                                        <div className='product-detail'>
                                                            <div className='product-detail-title col-2-t'>קטגוריה: </div>
                                                            <div>{itemDetails.category}</div>
                                                        </div>
                                                        <div className='product-detail'>
                                                            <div className='product-detail-title col-2-t'>מחיר: </div>
                                                            <div>{itemDetails.price}</div>
                                                        </div>
                                                        <br></br>
<hr></hr>
                                                    </>
                                                )}

                                            </Accordion.Body>
                                        </>
                                    )}

                                {/* </div> */}
                            </Accordion.Item>
                        )}
                    </Accordion>

                </div>

            </div>

            {/* <section>
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
                                        {checker?.activities?.map(activity => <>
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

            </section> */}
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

        </div >
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
        console.log(selectedFile)
        handleSubmit()
    }, [selectedFile]);

    const handleSubmit = () => {

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
    const { show, handleClose } = props;
    return (
        <div >
            <div>
                <Offcanvas className='canvas-container padding' show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className='canvas-title'>הוספת מוצר</Offcanvas.Title>
                    </Offcanvas.Header>
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
                            {<div className="form-group form-group--login form-create">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='lable-form'>שם המוצר</Form.Label>
                                    <Form.Control className='form-input' value={productDetails.fullname} type="text" id="name_" label="שם מוצר" onChange={(e) => onChange('name_', e)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='lable-form'>כמות</Form.Label>
                                    <Form.Control className='form-input' value={productDetails.email} type="number" id="qryInStock" label="כמות" onChange={(e) => onChange('qryInStock', e)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='lable-form'>מחיר</Form.Label>
                                    <Form.Control className='form-input' value={productDetails.price} type="number" id="price" label="מחיר" onChange={(e) => onChange('price', e)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='lable-form'>תאור</Form.Label>
                                    <Form.Control className='form-input' value={productDetails.description_} type="text" id="description_" label="תאור" onChange={(e) => onChange('description_', e)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='lable-form'>צבע</Form.Label>
                                    <Form.Control className='form-input' value={productDetails.color} type="text" id="color" label="צבע" onChange={(e) => onChange('color', e)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='lable-form'>מידה</Form.Label>
                                    <Form.Control className='form-input' value={productDetails.number} type="number" id="size" label="מידה" onChange={(e) => onChange('size', e)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='lable-form'>קטגוריה</Form.Label>
                                    <Form.Control className='form-input' value={productDetails.category} type="text" id="category" label="קטגוריה" onChange={(e) => onChange('category', e)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='lable-form'>תמונה</Form.Label>
                                    <Form.Control className='form-input' value={productDetails.category} type="text" id="image" label="תמונה" onChange={(e) => onChange('image', e)} />
                                </Form.Group>
                                {/* <Input value={productDetails.fullname} type="text" id="name_" label="שם מוצר" onChange={(e) => onChange('name_', e)} /> */}
                                {/* <Input value={productDetails.email} type="number" id="qryInStock" label="כמות" onChange={(e) => onChange('qryInStock', e)} /> */}
                                {/* <Input value={productDetails.price} type="number" id="price" label="מחיר" onChange={(e) => onChange('price', e)} /> */}
                                {/* <Input value={productDetails.description_} type="text" id="description_" label="תאור" onChange={(e) => onChange('description_', e)} /> */}
                                {/* <Input value={productDetails.color} type="text" id="color" label="צבע" onChange={(e) => onChange('color', e)} /> */}
                                {/* <Input value={productDetails.number} type="number" id="size" label="מידה" onChange={(e) => onChange('size', e)} /> */}
                                {/* <Input value={productDetails.category} type="text" id="category" label="קטגוריה" onChange={(e) => onChange('category', e)} /> */}
                                {/* <Input value={productDetails.category} type="text" id="image" label="תמונה" onChange={(e) => onChange('image', e)} /> */}
                            </div>}
                        </div>
                        {/* <button className="button button--primary full-width" type="submit">{props.mode === 'login' ? 'Log In' : 'Sign Up'}</button> */}
                        <input className="button button--primary full-width btn-send" type="button" value="שלח" onClick={() => { props.onSubmit(productDetails) }} />
                    </form>
                </Offcanvas>



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
            <Artist1 className="padding"
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
