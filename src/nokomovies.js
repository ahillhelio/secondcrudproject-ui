import React, { Component } from 'react';
import MovieForm from './nokomovieform';
import FilmUpdate from './filmupdate';
import DeleteFilm from './deletefilm';

class Movie extends Component {
    constructor(props){
        super(props);
        this.state ={
            film : [
              
            ],
            isCreate : true,
            updateFilm : {
                watched : false
            },
        }
    }

    getFilm = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/nokomovies`) 
        .then(response => response.json())
        .then(data => this.setState( {film : data, isCreate: true } ));//further instructions about what to do with it
    };

    deleteFilm = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/api/nokomovies/${id}`, {
            method: 'DELETE'
        }) 
        .then(response => response.json())
        .then(console.log)
        .then(this.getFilm);
    };

    updateFilm = (film) => {
        this.setState({
            updateFilm: film,
            isCreate: false
        })
    };

    patchFilm = (film) => {
        console.log("Began patchFilm process", film)
        fetch(`${process.env.REACT_APP_API_URL}/api/nokomovies/${film._id}`, {
            method: 'PATCH',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({watched : !film.watched})
        })
        .then(response => response.json())
        .then(response => {
            console.log ("patch response", response)
            return response
        })
    
        // .then(this.getFilm);
        .then(response => {
            if (response.nModified = 1) {
               let temp = this.state.film
               film.watched = !film.watched
               let filmIndex = temp.findIndex((element) => element._id === film._id)
               temp.splice(filmIndex,1,film)
               //complete this part working with "temp" variable (which is an array)modify temp in order to prepare it to be modified on line below. Use splice?
               //find index of object, findIndex? probably do it first and then splice 
               this.setState({film : temp})
            } else {
                alert ("Failed to change WATCHED status")
            }
        })
    };


    renderForm = () => {
        let result;
        if (this.state.isCreate) {
            result = (<MovieForm key="createForm" refresh={this.getFilm} />); //refresh is not needed- we mainly want to deactivate it on nokomovieform
        } else {
            const data = this.state.updateFilm; 
            result = <FilmUpdate key={data._id} film={data} refresh={this.getFilm}/>;
        }
        return result; 
    }

    componentDidMount (){ 
        this.getFilm();
    }

    render(){ //had to add three parameters and make sure keys were as I had entered them
        const displayFilm = this.state.film.map((film) => {
            
            return <div key = {film._id}> 
                        {film.title}, 
                        {film.koreantitle}, 
                        {film.year}, 
                        {film.watched ? 'watched': 'will watch'} 
                        <br></br>
                        <DeleteFilm film={film} 
                        deleteFilm={this.deleteFilm}
                        updateFilm={this.updateFilm}
                        patchFilm={this.patchFilm}
                        />
                  </div>    
               
        })

    console.log(this.state.film);

    return (
        <>
        
        <img src={ require('./mansudae.jpg') } />

        <h3>조선민주주의인민공화국의영화목록 
            <br></br>
         🇰🇵Democratic People's Republic of Korea Films🇰🇵 </h3>
       
        {this.renderForm()}
        {displayFilm}

        
        </>
    )

    }

    
};

export default Movie;