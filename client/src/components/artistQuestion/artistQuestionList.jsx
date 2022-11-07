import React, { useEffect, useState, useContext } from 'react';
import artistQuestionService from '../../services/artistQuestionService';


export default function artistQuestionsList(props) {

    const [artistQuestions, setartistQuestions] = useState([]);
    const [newartistQuestion, setNewartistQuestion] = useState({ firstName: '', lastName: '' });

    useEffect(() => //initial
    {
        getartistQuestions();

        // eslint-disable-next-line
    }, []);

    const getartistQuestions = async () => {
        let _artistQuestions = await artistQuestionService.get();
        setartistQuestions(_artistQuestions);
    }

    const updateFormState = (event) => {
        setNewartistQuestion({
            ...newartistQuestion,
            [event.target.name]: event.target.value,
        });
    };

    const add = async () => {
        let artistQuestionId = await artistQuestionService.post(newartistQuestion);
        getartistQuestions();
        setNewartistQuestion({ firstName: '', lastName: '' });
    }

    return (
        <div>
            <div>
                <h1>new artistQuestion:</h1>
                first name:<input value={newartistQuestion.firstName} name='firstName' onChange={updateFormState}></input>
                last name:<input value={newartistQuestion.lastName} name='lastName' onChange={updateFormState}></input>
                <button onClick={add}>add artistQuestion</button>

            </div>

            <div>
                artistQuestions list: {
                    artistQuestions.map(artistQuestion => <>
                        <div>
                            {artistQuestion.id} {artistQuestion.firstName} {artistQuestion.lastName}
                        </div>
                    </>)
                }
            </div>

        </div>
    )
}