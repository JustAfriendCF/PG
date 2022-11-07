import React, { useEffect, useState, useContext } from 'react';
import complaintsService from '../../services/complaintsService';


export default function complaintssList(props) {

    const [complaintss, setcomplaintss] = useState([]);
    const [newcomplaints, setNewcomplaints] = useState({ firstName: '', lastName: '' });

    useEffect(() => //initial
    {
        getcomplaintss();

        // eslint-disable-next-line
    }, []);

    const getcomplaintss = async () => {
        let _complaintss = await complaintsService.get();
        setcomplaintss(_complaintss);
    }

    const updateFormState = (event) => {
        setNewcomplaints({
            ...newcomplaints,
            [event.target.name]: event.target.value,
        });
    };

    const add = async () => {
        let complaintsId = await complaintsService.post(newcomplaints);
        getcomplaintss();
        setNewcomplaints({ firstName: '', lastName: '' });
    }

    return (
        <div>
            <div>
                <h1>new complaints:</h1>
                first name:<input value={newcomplaints.firstName} name='firstName' onChange={updateFormState}></input>
                last name:<input value={newcomplaints.lastName} name='lastName' onChange={updateFormState}></input>
                <button onClick={add}>add complaints</button>

            </div>

            <div>
                complaintss list: {
                    complaintss.map(complaints => <>
                        <div>
                            {complaints.id} {complaints.firstName} {complaints.lastName}
                        </div>
                    </>)
                }
            </div>

        </div>
    )
}