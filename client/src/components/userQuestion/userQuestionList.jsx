import React, { useEffect, useState, useContext } from 'react';
import userQuestionService from '../../services/userQuestionService';


export default function userQuestionsList(props) {

    const [userQuestions, setuserQuestions] = useState([]);
    const [newuserQuestion, setNewuserQuestion] = useState({ firstName: '', lastName: '' });

    useEffect(() => //initial
    {
        getuserQuestions();

        // eslint-disable-next-line
    }, []);

    const getuserQuestions = async () => {
        let _userQuestions = await userQuestionService.get();
        setuserQuestions(_userQuestions);
    }

    const updateFormState = (event) => {
        setNewuserQuestion({
            ...newuserQuestion,
            [event.target.name]: event.target.value,
        });
    };

    const add = async () => {
        let userQuestionId = await userQuestionService.post(newuserQuestion);
        getuserQuestions();
        setNewuserQuestion({ firstName: '', lastName: '' });
    }

    return (
        <div>
            <div>
                <h1>new userQuestion:</h1>
                first name:<input value={newuserQuestion.firstName} name='firstName' onChange={updateFormState}></input>
                last name:<input value={newuserQuestion.lastName} name='lastName' onChange={updateFormState}></input>
                <button onClick={add}>add userQuestion</button>

            </div>

            <div>
                userQuestions list: {
                    userQuestions.map(userQuestion => <>
                        <div>
                            {userQuestion.id} {userQuestion.firstName} {userQuestion.lastName}
                        </div>
                    </>)
                }
            </div>

        </div>
    )
}