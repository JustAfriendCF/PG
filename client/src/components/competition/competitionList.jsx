import React, { useEffect, useState, useContext } from 'react';
import competitionService from '../../services/competitionService';


export default function competitionsList(props) {

    const [competitions, setcompetitions] = useState([]);
    const [newcompetition, setNewcompetition] = useState({ firstName: '', lastName: '' });

    useEffect(() => //initial
    {
        getcompetitions();

        // eslint-disable-next-line
    }, []);

    const getcompetitions = async () => {
        let _competitions = await competitionService.get();
        setcompetitions(_competitions);
    }

    const updateFormState = (event) => {
        setNewcompetition({
            ...newcompetition,
            [event.target.name]: event.target.value,
        });
    };

    const add = async () => {
        let competitionId = await competitionService.post(newcompetition);
        getcompetitions();
        setNewcompetition({ firstName: '', lastName: '' });
    }

    return (
        <div>
            <div>
                <h1>new competition:</h1>
                first name:<input value={newcompetition.firstName} name='firstName' onChange={updateFormState}></input>
                last name:<input value={newcompetition.lastName} name='lastName' onChange={updateFormState}></input>
                <button onClick={add}>add competition</button>

            </div>

            <div>
                competitions list: {
                    competitions.map(competition => <>
                        <div>
                            {competition.id} {competition.firstName} {competition.lastName}
                        </div>
                    </>)
                }
            </div>

        </div>
    )
}