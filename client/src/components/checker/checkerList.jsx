import React, { useEffect, useState, useContext } from 'react';
import checkerService from '../../services/checkerService';


export default function checkersList(props) {

    const [checkers, setcheckers] = useState([]);
    const [newchecker, setNewchecker] = useState({ firstName: '', lastName: '' });

    useEffect(() => //initial
    {
        getcheckers();

        // eslint-disable-next-line
    }, []);

    const getcheckers = async () => {
        let _checkers = await checkerService.get();
        setcheckers(_checkers);
    }

    const updateFormState = (event) => {
        setNewchecker({
            ...newchecker,
            [event.target.name]: event.target.value,
        });
    };

    const add = async () => {
        let checkerId = await checkerService.post(newchecker);
        getcheckers();
        setNewchecker({ firstName: '', lastName: '' });
    }

    return (
        <div>
            <div>
                <h1>new checker:</h1>
                first name:<input value={newchecker.firstName} name='firstName' onChange={updateFormState}></input>
                last name:<input value={newchecker.lastName} name='lastName' onChange={updateFormState}></input>
                <button onClick={add}>add checker</button>

            </div>

            <div>
                checkers list: {
                    checkers.map(checker => <>
                        <div>
                            {checker.id} {checker.firstName} {checker.lastName}
                        </div>
                    </>)
                }
            </div>

        </div>
    )
}