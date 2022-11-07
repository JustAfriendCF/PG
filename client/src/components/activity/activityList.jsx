import React, { useEffect, useState, useContext } from 'react';
import activityService from '../../services/activityService';


export default function activitysList(props) {

    const [activitys, setactivitys] = useState([]);
    const [newactivity, setNewactivity] = useState({ firstName: '', lastName: '' });

    useEffect(() => //initial
    {
        getactivitys();

        // eslint-disable-next-line
    }, []);

    const getactivitys = async () => {
        let _activitys = await activityService.get();
        setactivitys(_activitys);
    }

    const updateFormState = (event) => {
        setNewactivity({
            ...newactivity,
            [event.target.name]: event.target.value,
        });
    };

    const add = async () => {
        let activityId = await activityService.post(newactivity);
        getactivitys();
        setNewactivity({ firstName: '', lastName: '' });
    }

    return (
        <div>
            <div>
                <h1>new activity:</h1>
                first name:<input value={newactivity.firstName} name='firstName' onChange={updateFormState}></input>
                last name:<input value={newactivity.lastName} name='lastName' onChange={updateFormState}></input>
                <button onClick={add}>add activity</button>

            </div>

            <div>
                activitys list: {
                    activitys.map(activity => <>
                        <div>
                            {activity.id} {activity.firstName} {activity.lastName}
                        </div>
                    </>)
                }
            </div>

        </div>
    )
}