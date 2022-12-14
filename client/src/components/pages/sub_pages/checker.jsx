
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { Form, Button, Table, Alert } from 'react-bootstrap';
// import { Add_Company } from '../services/Company.service';
import userService from "../../../services/userService";
import serverUrl from "../../../utilities/serverUrl";
import '../CSS_page/funArt.css';
import UserContext from '../../../UserContext';
import '../../../storeMD/index.css'
import add1 from '../../../images/home_page_adds/add1.jpg'
import Card from 'react-bootstrap/Card';

// const messageType = messageType(null)
// const messageRef = useRef(null)

// const handleSubmit = (event) => {
//     event.preventDefault()
//     const data = {
//         messageType: emailRef.current.value,
//         message: messageRef.current.value
//     }
//     alert("tadaaa!: \n" + JSON.stringify(data) + "Your data 😎")
// }




// {/* <></> */}
// <div className="container">
//     <h1>Contact us</h1>
//     <form onSubmit={handleSubmit} className="form">
//         <label for="messageType">messag Type</label>
//         <select value={optionsState}>
//             <option value="private">private</option>
//             <option value="public">public</option>
//         </select>

//         <label for="message">Message</label>
//         <textarea
//             placeholder="Start typing..."
//             className="message"
//             name="message"
//             ref={messageRef}
//         >

//         </textarea>
//         <button type="submit" className="send">Send</button>
//     </form>
// </div>


const Checker = () => {
    const { user, setUser } = useContext(UserContext);//get the curent user from the context
    const [images, setImages] = useState([]);
    // const [images, setImages] = useState([{ id: '1', imageSrc: add1, name_: "img1", idSubscription: '1' },
    // { id: '1', imageSrc: add1, name_: "img1", idSubscription: '1' },
    // { id: '1', imageSrc: add1, name_: "img1", idSubscription: '1' },
    // { id: '1', imageSrc: add1, name_: "img1", idSubscription: '1' }]);
    const [competition, setcompetition] = useState({});
    //     name: '',
    //     mail: '',
    //     phone: '',
    //     freightCost: '',
    //     symbol: ''
    // });
    const blockUser = async (userId, imageForTheCompetitionId) => {
        try {
            console.log("here")
            //UserContext.id
            const response = await axios.post("http://localhost:8080/user/blockUser", { userId: userId })
            console.log("response", response.data);
            let _maxproduct = response.data;
            this.setState({ product: _maxproduct });
            response = await axios.post("http://localhost:8080/imageForTheCompetition/imageForTheCompetitionSetChecker", { imageForTheCompetitionId: imageForTheCompetitionId, checkerId: user.id })
            console.log("response", response.data);

        }
        catch (e) {
            console.log("error", e)
        }
    }
    const addImageForTheCompetition = async (imageForTheCompetitionId, checkerId) => {
        try {

            //UserContext.id
            const response = await axios.post("http://localhost:8080/imageForTheCompetition/addImageForTheCompetition", { imageForTheCompetitionId: imageForTheCompetitionId, checkerId })
            console.log("response", response.data);

        }
        catch (e) {
            console.log("error", e)
        }
    }
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect( () => {
        getComp();
         axios.get("http://localhost:8080/imageForTheCompetition/getNotChecked").then(res =>{
            
        console.log(res.data);
        setImages(res.data);
        });
    }, []);

    const getComp = async () => {
        let result = await axios.post(serverUrl + "/competition/getCompetion");
        let _competition = result.data.competition;
        setcompetition(_competition);
    }

    useEffect(() => {
        console.log(selectedFile)
        handleSubmit()
    }, [selectedFile]);

    const handleSubmit = () => {
        debugger
        // await Add_Company(companyState, selectedFile);
        userService.handleInputChange(selectedFile, "imageForTheCompetition");
    }

    const onSelectedFile = e => {
        debugger
        e && e.stopPropagation()
        let file = e.target.files;
        setSelectedFile(file);
        // setSelectedFile({ selectedFile: file });
        // handleSubmit()
        // setCompanyState({ ...companyState, symbol: `images/companies/${e.target.files[0].name}` });
    }
    const addLike = img => {
        //axios.post()//add like
    }
    const getUrl = (productImage) => {
        return `http://localhost:8080/imageForTheCompetition/getPicture?fileName=${productImage}`
    }
    const addImageToTheCompetition = () => {

    }
    return (
        <>
            <div></div>

            <div style={{
                fontSize: '500%',
                marginLeft: '35%'
            }}>{UserContext.id} </div>
            <form style={{
                marginTop: '1%',
                marginLeft: '35%'
            }}>
                {/* <fieldset className="forms" style={{ width: '23rem' }}>
                    <Form>
                        <Form.Control type="file" className='symbol' name="symbol" accept=".png,.jpg,.jpeg,.webp" onChange={onSelectedFile} />
                
                    </Form>
                </fieldset> */}
            </form>
            <h3 className='title-checker'>
                {/* <ImUserCheck className='icon-check' /> */}
                מוצרים בתחרות
            </h3>

            {!images.length ? (
                <div>Loading...</div>
            ) : (
                <ul className="products row">
                    {images.map((imageForTheCompetition) => (
                        <Card className='col-3 card-container card-checker' key={imageForTheCompetition.id} style={{ width: '18rem' }}>
                            <Card.Link href={"#" + imageForTheCompetition.id}>
                                <Card.Img variant="top" src={getUrl(imageForTheCompetition.imageSrc)} />
                                <Card.Title>{imageForTheCompetition.name_}</Card.Title>
                            </Card.Link>
                            <Card.Body>
                                {/* <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text> */}

                                <div className='row' style={{ msFlexDirection: 'column' }}>
                                    <Button className='button primary' onClick={() => blockUser(imageForTheCompetition.idSubscription, imageForTheCompetition.id)} variant="primary">חסימת משתמש</Button>
                                    <Button className='button primary' onClick={() => addImageForTheCompetition(imageForTheCompetition, user.id)} variant="primary">הוספה לתחרות</Button>
                                </div>
                            </Card.Body>
                        </Card>
                        // <li key={imageForTheCompetition.id}>

                        //     <div className="product-details">
                        //         <a
                        //             href={"#" + imageForTheCompetition.id}
                        //         // onClick={() => this.openModal(imageForTheCompetition)}
                        //         >
                        //             <img className='imageLook' src={imageForTheCompetition.imageSrc} alt={imageForTheCompetition.name_}></img>
                        //             <p>{imageForTheCompetition.name_}</p>
                        //         </a>
                        //         <div >
                        //             <button
                        //                 onClick={() => blockUser(imageForTheCompetition.idSubscription, imageForTheCompetition.id)}
                        //                 className="button primary"
                        //             >
                        //                 חסימת משתמש
                        //             </button>
                        //             <button
                        //                 onClick={() => addImageForTheCompetition(imageForTheCompetition, user.id)}
                        //                 className="button primary"
                        //             >
                        //                 הוספה לתחרות
                        //             </button>
                        //         </div>
                        //     </div>
                        // </li>
                    ))}
                </ul>
            )}

        </>
    )
}
export default Checker;
