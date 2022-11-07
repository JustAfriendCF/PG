import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
export function TutorialContext() {
    const msg = useContext(UserContext);

    return (
        <>
            <h1>hi</h1>
            <div>{msg}</div>
        </>
    )
}