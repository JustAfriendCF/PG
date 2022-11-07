import React, { useEffect, useState, useContext } from 'react';
import artistAnswerService from '../../services/artistAnswerService';


export default function artistAnswersList(props) {

    const [artistAnswers, setartistAnswers] = useState([]);
    const [newartistAnswer, setNewartistAnswer] = useState({ firstName: '', lastName: '' });

    useEffect(() => //initial
    {
        getartistAnswers();

        // eslint-disable-next-line
    }, []);

    const getartistAnswers = async () => {
        let _artistAnswers = await artistAnswerService.get();
        setartistAnswers(_artistAnswers);
    }

    const updateFormState = (event) => {
        setNewartistAnswer({
            ...newartistAnswer,
            [event.target.name]: event.target.value,
        });
    };

    const add = async () => {
        let artistAnswerId = await artistAnswerService.post(newartistAnswer);
        getartistAnswers();
        setNewartistAnswer({ firstName: '', lastName: '' });
    }

    return (
        <div>
            <div>
                <h1>new artistAnswer:</h1>
                first name:<input value={newartistAnswer.firstName} name='firstName' onChange={updateFormState}></input>
                last name:<input value={newartistAnswer.lastName} name='lastName' onChange={updateFormState}></input>
                <button onClick={add}>add artistAnswer</button>

            </div>

            <div>
                artistAnswers list: {
                    artistAnswers.map(artistAnswer => <>
                        <div>
                            {artistAnswer.id} {artistAnswer.firstName} {artistAnswer.lastName}
                        </div>
                    </>)
                }
            </div>

        </div>
    )
}