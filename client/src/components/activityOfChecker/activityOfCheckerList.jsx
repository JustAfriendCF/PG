import React, { useEffect, useState, useContext } from 'react';
import activityOfCheckerService from '../../services/activityOfCheckerService';


export default function activityOfCheckersList(props) {

    const [activityOfCheckers, setactivityOfCheckers] = useState([]);
    const [newactivityOfChecker, setNewactivityOfChecker] = useState({ firstName: '', lastName: '' });

    useEffect(() => //initial
    {
        getactivityOfCheckers();

        // eslint-disable-next-line
    }, []);

    const getactivityOfCheckers = async () => {
        let _activityOfCheckers = await activityOfCheckerService.get();
        setactivityOfCheckers(_activityOfCheckers);
    }

    const updateFormState = (event) => {
        setNewactivityOfChecker({
            ...newactivityOfChecker,
            [event.target.name]: event.target.value,
        });
    };

    const add = async () => {
        let activityOfCheckerId = await activityOfCheckerService.post(newactivityOfChecker);
        getactivityOfCheckers();
        setNewactivityOfChecker({ firstName: '', lastName: '' });
    }

    return (
        <div>
            <div>
                <h1>new activityOfChecker:</h1>
                first name:<input value={newactivityOfChecker.firstName} name='firstName' onChange={updateFormState}></input>
                last name:<input value={newactivityOfChecker.lastName} name='lastName' onChange={updateFormState}></input>
                <button onClick={add}>add activityOfChecker</button>

            </div>

            <div>
                activityOfCheckers list: {
                    activityOfCheckers.map(activityOfChecker => <>
                        <div>
                            {activityOfChecker.id} {activityOfChecker.firstName} {activityOfChecker.lastName}
                        </div>
                    </>)
                }
            </div>

        </div>
    )
}