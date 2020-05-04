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
            isCreate: false,
        })
    };

    renderForm = () => {
        let result;
        if (this.state.isCreate){
            result = (<MovieForm key="createForm" refresh={this.getFilm} />);
        } else {
            const data = this.state.updateFilm; // will be changed to ".updateFilm;""
            //result = <MovieForm/>; // double check "ProvinceUpdate"
            result = <FilmUpdate key={data._id} film={data} refresh={this.getFilm}/>;
        }
        return result; 
}
    componentDidMount (){ 
        this.getFilm();
    }

    render(){ //had to add three parameters and make sure keys were as I had entered them
        const displayFilm = this.state.film.map((film) => {
        return <div> 
                    {film.title}, {film.koreantitle}, {film.year}, {film.watched ? 'watched': 'will watch'}
                    <DeleteFilm film={film} 
                    deleteFilm={this.deleteFilm}
                    updateFilm={this.updateFilm}
                    />
               </div>    
        })

    console.log(this.state.film);

    return (
        <>
        <h3> Democratic People's Republic of Korea Films </h3>
        {this.renderForm()}
        {displayFilm}
        </>
    )

    }

    
};

export default Movie;