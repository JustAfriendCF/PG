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




import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { Form, Button, Table, Alert } from 'react-bootstrap';
// import { Add_Company } from '../services/Company.service';
import userService from "../../services/userService";
import serverUrl from "../../utilities/serverUrl";
import '../pages/CSS_page/funArt.css';
import UserContext from '../../UserContext';
import '../../storeMD/index.css'
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
    //     name: '',
    //     mail: '',
    //     phone: '',
    //     freightCost: '',
    //     symbol: ''
    // });

    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(async () => {
        getComp();
        const res = await fetch("http://localhost:8080/imageForTheCompetition/get");
        const data = await res.json();
        console.log(data);
        setImages(data);
    }, []);

    const getComp = async () => {
        //   debugger;
        let result = await axios.post(serverUrl + "/competition/getCompetion");
        let _competition = result.data.competition;
        setcompetition(_competition);
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
    useEffect(async () => {
        await getWinner()
    }, [])
    useEffect(() => {
        //  debugger
        console.log(selectedFile)
        handleSubmit()
    }, [selectedFile]);

    const handleSubmit = () => {
        //   debugger
        // await Add_Company(companyState, selectedFile);
        userService.handleInputChange(selectedFile, "imageForTheCompetition", user.id);
    }

    const onSelectedFile = e => {
        // debugger

        if (user.id === null || user.id == -1 || user == null)
            alert("רק לקוח רשום יכול לשלוח תמונה לתחרות")
        else {
            e && e.stopPropagation()
            let file = e.target.files;
            setSelectedFile(file);
            // setSelectedFile({ selectedFile: file });
            // handleSubmit()
            // setCompanyState({ ...companyState, symbol: `images/companies/${e.target.files[0].name}` });
        }
    }
    const addLike = img => {
        //axios.post()//add like
    }
    const getUrl = (productImage) => {
        return `http://localhost:8080/imageForTheCompetition/getPicture?fileName=${productImage}`
    }
    return (
        <>
            <div></div>
            <div style={{
                fontSize: '500%',
                marginLeft: '35%'
            }}
            >הציורים שלכם</div>
            <form style={{
                marginTop: '1%',
                marginLeft: '35%'
            }}>
                <fieldset className="forms" style={{ width: '23rem' }}>
                    <Form>
                        <Form.Control type="file" className='symbol' name="symbol" accept=".png,.jpg,.jpeg,.webp" onChange={onSelectedFile} />
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
            </form>
            <div className='firstPlace'>
                <h1>  !מנצח התחרות הקודמת</h1>
                <img className='imageLook' src={getUrl(winner.imageSrc)} alt={winner.name_}></img>

            </div>

            {!images.length ? (
                <div>Loading...</div>
            ) : (
                <ul className="products">
                    {images.map((imageForTheCompetition) => (
                        <li key={imageForTheCompetition.id}>

                            <div className="product-details">
                                <a
                                    href={"#" + imageForTheCompetition.id}
                                // onClick={() => this.openModal(imageForTheCompetition)}
                                >
                                    <img className='imageLook' src={getUrl(imageForTheCompetition.imageSrc)} alt={imageForTheCompetition.name_}></img>
                                    <p>{imageForTheCompetition.name_}</p>
                                </a>
                                <div >

                                    <button
                                        onClick={() => addLike(imageForTheCompetition)}
                                        className="button primary"
                                    >
                                        ❤
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

        </>
    )
}
export default FunArt;
