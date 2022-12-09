
// import React, { useContext } from 'react';
// import { connect } from 'react-redux';
// import { UserContext } from '../../UserContext';

// // const message = {
// //     msg: useContext(UserContext)
// // }

// export const funArt = (props) => {
//     return (
//         <> 

//         </>
//     );
// };

// export default funArt;
// // export default connect(message)(funArt);


import Modal from "react-modal";
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { Form, Button, Table, Alert } from 'react-bootstrap';
// import { Add_Company } from '../services/Company.service';
import userService from "../../services/userService";
import serverUrl from "../../utilities/serverUrl";
import '../pages/CSS_page/funArt.css';
import UserContext from '../../UserContext';
import '../../storeMD/index.css'
import { BiImageAdd } from 'react-icons/bi';
// import add1 from '../../images/home_page_adds/add1.jpg'
// import Artboard from '../../images/products/Artboard.png'
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { RiHeartAddLine } from 'react-icons/ri';
// import { IoHeartSharp } from 'react-icons/io';
// export const fetchProducts = () => async (dispatch) => {
//     const res = await fetch("http://localhost:8080/imageForTheCompetitions/get");
//     const data = await res.json();
//     console.log(data);
//     // dispatch({
//     //     // type: FETCH_PRODUCTS,
//     //     payload: data,
//     // });
// };

const FunArt = () => {
    const { user, setUser } = useContext(UserContext);//get the curent user from the context
    const [images, setImages] = useState([]);
    const [competition, setcompetition] = useState({});
    const [winner, setWinner] = useState({});
    const [uploadImg, setUploadImg] = useState('');
    const [winnerLikeId, setWinnerLikeId] = useState(+(localStorage.getItem("liked") || -1));
    const [showModal, setShowModal] = useState(false)

    //     name: '',
    //     mail: '',
    //     phone: '',
    //     freightCost: '',
    //     symbol: ''
    // });

    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        getComp();
        // let arr = [{ id: '1', imageSrc: add1, name_: "img1", idSubscription: '1' },
        // { id: '2', imageSrc: add1, name_: "img1",idSubscription: '1' },
        // { id: '3', imageSrc: add1, name_: "img1", idSubscription: '1' },
        // { id: '4', imageSrc: add1, name_: "img1",  idSubscription: '1' }]

    }, []);

    const getComp = async () => {
        //   debugger;
        let result = await axios.post(serverUrl + "/competition/getCompetion");
        let _competition = result.data.competition;
        setcompetition(_competition);
        const res = await fetch("http://localhost:8080/imageForTheCompetition/get");
        const data = await res.json();
        // console.log(data);
        // setImages(arr);
        setImages(data);
    }
    const getWinner = async () => {
        try {
            console.log("here")
            //UserContext.id
            const response = await axios.get("http://localhost:8080/imageForTheCompetition/getWinner")
            console.log("response", response.data);
            setWinner(response.data)
        }
        catch (e) {
            console.log("error", e)
        }
    }
    useEffect(() => {
        getWinner()
    }, [])
    useEffect(() => {

        console.log(selectedFile)
        handleSubmit()
    }, [selectedFile]);

    const handleSubmit = () => {
        //   debugger
        // await Add_Company(companyState, selectedFile);
        userService.handleInputChange(selectedFile, "imageForTheCompetition", user.id);
    }

    const onSelectedFile = e => {

        if (user.id === null || user.id == -1 || user == null)
            alert("רק לקוח רשום יכול לשלוח תמונה לתחרות")
        else {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadImg(reader.result);
            };
            e && e.stopPropagation()
            let file = e.target.files;
            setSelectedFile(file);
            // setSelectedFile({ selectedFile: file });
            // handleSubmit()
            // setCompanyState({ ...companyState, symbol: `images/companies/${e.target.files[0].name}` });
        }
    }
    const addLike = (img, index) => {
        if (!(user.id > -1)) {
            setShowModal(true)
            // alert("רק לקוח רשום יכול להוסיף לייק");
            return;
        }
        //בפוקציה הזו שמרתי את המקום במערך ואת האיבר במערך שעשו לו לייק

        const updated = images.map(_img => ({
            ..._img, liked: _img.id === img.id && !images[index].liked
        }))
        setImages(updated);

        // this can be the pressed image but also -1 if the img eas selected before
        const imgLiked = updated.find(_img => _img.liked);

        const lastWinnerLikedID = winnerLikeId;

        setWinnerLikeId(imgLiked?.id || -1);
        localStorage.setItem(`liked`, imgLiked?.id || -1);

        if (lastWinnerLikedID > -1 && lastWinnerLikedID !== imgLiked?.id) {
            const lastImg = updated.find(_img => _img.id == lastWinnerLikedID);
            axios.post(serverUrl + "/imageForTheCompetition/addLike", { imageForTheCompetition: { ...lastImg, likesNum: lastImg.likesNum - 1 }, userId: user.id }).then(res => {
            })
        }
        const updatedLikeNums = updated[index].liked ? img.likesNum + 1 : img.likesNum - 1;
        axios.post(serverUrl + "/imageForTheCompetition/addLike", { imageForTheCompetition: { ...img, likesNum: updatedLikeNums }, userId: user.id }).then(res => {
        })

        console.log(images);
    }
    const getUrl = (productImage) => {
        return `http://localhost:8080/imageForTheCompetition/getPicture?fileName=${productImage}`
    }
    const onChangeHandlerImg = (event) => {
        const reader = new FileReader();
        const file = event;
        reader.onloadend = () => {
            setUploadImg(reader.result);
        };
        reader.readAsDataURL(file);
        var fileToUpload = event
        var myFile = new FormData();
        myFile.append("file", fileToUpload);
    }

    return (
        <>
            <div className='title-artist2'>הציורים שלכם</div>
            {/* <form style={{
                marginTop: '1%',
                marginLeft: '35%'
            }}> */}
            <div className='row div-container'>
                <div className='col-8'>
                    {!images.length ? (
                        <div>Loading...</div>
                    ) : (
                        <ul className="products row">
                            {images.map((imageForTheCompetition, index) => {
                                return <li className='col-3 product-details' key={imageForTheCompetition.id}>

                                    <div className='div-product-details'>
                                        <a
                                            href={"#" + imageForTheCompetition.id}
                                        // onClick={() => this.openModal(imageForTheCompetition)}
                                        >
                                            {/* <img className='imageLook' src={imageForTheCompetition.imageSrc} alt={imageForTheCompetition.name_}></img> */}
                                            <img className='imageLook' src={getUrl(imageForTheCompetition.imageSrc)} alt={imageForTheCompetition.name_}></img>
                                            <p>{imageForTheCompetition.name_}</p>
                                        </a>
                                        {/* <div > */}

                                        <button
                                            onClick={() => addLike(imageForTheCompetition, index)}
                                            className={`${user.id > -1 && winnerLikeId === imageForTheCompetition?.id ? 'liked-btn' : "like-btn"}`}
                                        >
                                            {user.id > -1 && winnerLikeId === imageForTheCompetition?.id ? <BsFillSuitHeartFill /> : <RiHeartAddLine />}
                                            {/* <BsFillSuitHeartFill/> */}
                                        </button>

                                        {/* </div> */}
                                    </div>
                                </li>
                            })}
                        </ul>
                    )}

                </div>
                <div className='col-4 winner-col'>
                    <div className='firstPlace'>
                        <h1>  מנצח התחרות הקודמת!</h1>
                        {/* <img className='img-look' src={add1} alt={winner.name_}></img> */}
                        <img className='imageLook' src={getUrl(winner.imageSrc)} alt={winner.name_}></img>

                    </div>
                    <fieldset className="forms form-upload-img" style={{ width: '23rem' }}>
                        <Form>
                            <form className='package-img-div row' noValidate autoComplete="off" style={{
                                display: 'flex'
                            }}>
                                <label className='lable-upload-img' for="profileImg">
                                    {uploadImg === '' && <div className='icon-add-img'>
                                        <BiImageAdd />
                                        <p className='img-title-choose'> בחר תמונה לתחרות</p>
                                    </div>
                                    }

                                    {uploadImg !== '' && <img className={uploadImg !== '' ? "package-img-img" : 'none-img'} referrerpolicy="no-referrer" src={uploadImg} />}
                                </label>
                                <input
                                    type={"file"}
                                    id="profileImg"
                                    htmlFor="myInput"
                                    accept="image/*"
                                    style={{
                                        display: 'none',
                                        cursor: 'pointer'
                                    }}
                                    onChange={(e) => onChangeHandlerImg(e.target.files[0], onSelectedFile)}
                                />
                            </form>
                            {/* <Form.Control type="file" className='symbol' name="symbol" accept=".png,.jpg,.jpeg,.webp" onChange={onSelectedFile} /> */}
                            {/* <Form.Control type="file" name="symbol" value={companyState.value} accept=".png,.jpg,.jpeg,.webp" onChange={onSelectedFile} /> */}

                            {/* <Table borderless="0" style={{ marginLeft: '2rem' }}>
                        <tbody>
                            <tr>
                                <td style={{ textAlign: 'left' }}><label>לוגו החברה: </label></td>
                                <td style={{ width: '10rem' }}><Form.Control type="file" name="symbol" value={companyState.value} accept=".png,.jpg,.jpeg,.webp"
                                    onChange={onSelectedFile} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style={{ textAlign: 'left' }}>
                                    <Button type="submit" variant="outline-dark" onClick={handleSubmit}>הוספה</Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table> */}
                        </Form>
                    </fieldset>

                    {/* </form> */}

                </div>
                <Modal
                closeTimeoutMS={200}
                 style={{
                    content: {
                        width: "max-content",
                        height: "max-content"
                    }
                }} shouldCloseOnOverlayClick={true}
                onRequestClose={() => setShowModal(false)}
                    isOpen={showModal === true}
                    contentLabel="modal"
                >
                    <h2>רק משתמש רשום יכול להוסיף לייק</h2>
                    <hr></hr>
                    <button className="button-remove-from-cart" onClick={() => setShowModal(false)}>הבנתי</button>
                </Modal>
            </div>


        </>
    )
}
export default FunArt;
