import React, { useEffect, useState, useContext } from 'react';
import imageOrCommentService from '../../services/imageOrCommentService';


export default function imageOrCommentsList(props) {

    const [imageOrComments, setimageOrComments] = useState([]);
    const [newimageOrComment, setNewimageOrComment] = useState({ firstName: '', lastName: '' });

    useEffect(() => //initial
    {
        getimageOrComments();

        // eslint-disable-next-line
    }, []);

    const getimageOrComments = async () => {
        let _imageOrComments = await imageOrCommentService.get();
        setimageOrComments(_imageOrComments);
    }

    const updateFormState = (event) => {
        setNewimageOrComment({
            ...newimageOrComment,
            [event.target.name]: event.target.value,
        });
    };

    const add = async () => {
        let imageOrCommentId = await imageOrCommentService.post(newimageOrComment);
        getimageOrComments();
        setNewimageOrComment({ firstName: '', lastName: '' });
    }

    return (
        <div>
            <div>
                <h1>new imageOrComment:</h1>
                first name:<input value={newimageOrComment.firstName} name='firstName' onChange={updateFormState}></input>
                last name:<input value={newimageOrComment.lastName} name='lastName' onChange={updateFormState}></input>
                <button onClick={add}>add imageOrComment</button>

            </div>

            <div>
                imageOrComments list: {
                    imageOrComments.map(imageOrComment => <>
                        <div>
                            {imageOrComment.id} {imageOrComment.firstName} {imageOrComment.lastName}
                        </div>
                    </>)
                }
            </div>

        </div>
    )
}