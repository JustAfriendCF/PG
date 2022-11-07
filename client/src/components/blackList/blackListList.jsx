import React, { useEffect, useState, useContext } from 'react';
import blackListService from '../../services/blackListService';


export default function blackListsList(props) {

    const [blackLists, setblackLists] = useState([]);
    const [newblackList, setNewblackList] = useState({ firstName: '', lastName: '' });

    useEffect(() => //initial
    {
        getblackLists();

        // eslint-disable-next-line
    }, []);

    const getblackLists = async () => {
        let _blackLists = await blackListService.get();
        setblackLists(_blackLists);
    }

    const updateFormState = (event) => {
        setNewblackList({
            ...newblackList,
            [event.target.name]: event.target.value,
        });
    };

    const add = async () => {
        let blackListId = await blackListService.post(newblackList);
        getblackLists();
        setNewblackList({ firstName: '', lastName: '' });
    }

    return (
        <div>
            <div>
                <h1>new blackList:</h1>
                first name:<input value={newblackList.firstName} name='firstName' onChange={updateFormState}></input>
                last name:<input value={newblackList.lastName} name='lastName' onChange={updateFormState}></input>
                <button onClick={add}>add blackList</button>

            </div>

            <div>
                blackLists list: {
                    blackLists.map(blackList => <>
                        <div>
                            {blackList.id} {blackList.firstName} {blackList.lastName}
                        </div>
                    </>)
                }
            </div>

        </div>
    )
}