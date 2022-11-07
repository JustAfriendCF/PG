import React, { useEffect, useState, useContext } from 'react';
import userAnswerService from '../../services/userAnswerService';


export default function userAnswersList(props) {

    const [userAnswers, setuserAnswers] = useState([]);
    const [newuserAnswer, setNewuserAnswer] = useState({ firstName: '', lastName: '' });

    useEffect(() => //initial
    {
        getuserAnswers();

        // eslint-disable-next-line
    }, []);

    const getuserAnswers = async () => {
        let _userAnswers = await userAnswerService.get();
        setuserAnswers(_userAnswers);
    }

    const updateFormState = (event) => {
        setNewuserAnswer({
            ...newuserAnswer,
            [event.target.name]: event.target.value,
        });
    };

    const add = async () => {
        let userAnswerId = await userAnswerService.post(newuserAnswer);
        getuserAnswers();
        setNewuserAnswer({ firstName: '', lastName: '' });
    }

    return (
        <div>
            <div>
                <h1>new userAnswer:</h1>
                first name:<input value={newuserAnswer.firstName} name='firstName' onChange={updateFormState}></input>
                last name:<input value={newuserAnswer.lastName} name='lastName' onChange={updateFormState}></input>
                <button onClick={add}>add userAnswer</button>

            </div>

            <div>
                userAnswers list: {
                    userAnswers.map(userAnswer => <>
                        <div>
                            {userAnswer.id} {userAnswer.firstName} {userAnswer.lastName}
                        </div>
                    </>)
                }
            </div>

        </div>
    )
}