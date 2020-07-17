import React from 'react';

const DeleteFilm = ({film, deleteFilm, updateFilm, patchFilm}) => {
    return(
        <>
        <button onClick={() => deleteFilm(film._id)}>Delete</button>
        <button onClick={() => updateFilm(film)}>Edit</button>
        <button onClick={() => patchFilm(film)}>{film.watched === true? "Watched" : "Yet to Watch" }</button> 
        </>
    )
}

export default DeleteFilm;