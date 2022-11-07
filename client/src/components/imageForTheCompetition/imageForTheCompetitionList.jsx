import React, { useEffect, useState, useContext } from 'react';
import imageForTheCompetitionService from '../../services/imageForTheCompetitionService';


export default function imageForTheCompetitionsList(props) {

    const [imageForTheCompetitions, setimageForTheCompetitions] = useState([]);
    const [newimageForTheCompetition, setNewimageForTheCompetition] = useState({ firstName: '', lastName: '' });

    useEffect(() => //initial
    {
        getimageForTheCompetitions();

        // eslint-disable-next-line
    }, []);

    const getimageForTheCompetitions = async () => {
        let _imageForTheCompetitions = await imageForTheCompetitionService.get();
        setimageForTheCompetitions(_imageForTheCompetitions);
    }

    const updateFormState = (event) => {
        setNewimageForTheCompetition({
            ...newimageForTheCompetition,
            [event.target.name]: event.target.value,
        });
    };

    const add = async () => {
        let imageForTheCompetitionId = await imageForTheCompetitionService.post(newimageForTheCompetition);
        getimageForTheCompetitions();
        setNewimageForTheCompetition({ firstName: '', lastName: '' });
    }

    return (
        <div>
            <div>
                <h1>new imageForTheCompetition:</h1>
                first name:<input value={newimageForTheCompetition.firstName} name='firstName' onChange={updateFormState}></input>
                last name:<input value={newimageForTheCompetition.lastName} name='lastName' onChange={updateFormState}></input>
                <button onClick={add}>add imageForTheCompetition</button>

            </div>

            <div>
                imageForTheCompetitions list: {
                    imageForTheCompetitions.map(imageForTheCompetition => <>
                        <div>
                            {imageForTheCompetition.id} {imageForTheCompetition.firstName} {imageForTheCompetition.lastName}
                        </div>
                    </>)
                }
            </div>

        </div>
    )
}