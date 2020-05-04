import React from 'react';

const DeleteFilm = ({film, deleteFilm, updateFilm}) => {
    return(
        <>
        <button onClick={() => deleteFilm(film._id)}>Delete</button>
        <button onClick={() => updateFilm(film)}>Edit</button>
        </>
    )
}

export default DeleteFilm;