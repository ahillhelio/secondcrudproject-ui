import React from 'react';

class FilmUpdate extends React.Component {
    state = {
        title: this.props.film.title, 
        koreantitle: this.props.film.koreantitle,
        year: this.props.film.year,
        watched: this.props.film.watched
    }

    handleChange = ( {target} ) => {
        const key = target.name;
        this.setState({ [key] : target.value }, () => console.log(this.state[key]));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const watched= this.state.watched === "true";
        fetch(`${process.env.REACT_APP_API_URL}/api/nokomovies/${this.props.film._id}`, {
            method: 'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({title : this.state.title, koreantitle : this.state.koreantitle, year : this.state.year, watched : watched})
        })
        .then(this.props.refresh)
        .then(() => this.setState({
            title: "",
            koreantitle: "",
            year: 0,
            watched: ""
        }));
    }

    // handlePatch = (event) => {
    //     event.preventDefault();
    //     const watched= this.state.watched === "true"; // change to false?
    //     fetch(`${process.env.REACT_APP_API_URL}/api/nokomovies/${this.props.film._id}`, {
    //         method: 'PATCH',
    //         headers:{
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify({watched : watched})
    //     })
    //     .then(this.props.refresh)
    //     .then(() => this.setState({
    //         // title: "",
    //         // koreantitle: "",
    //         // year: 0,
    //         watched: ""
    //     }));
    // }
// like above, but with PUT becoming PATCH and only the "watched" prop changed in body on line 24
    render() {
        return(
            <form onSubmit={this.handleSubmit}> 
            
                <input 
                    name="title" 
                    type="text"
                    value={this.state.title}
                    placeholder= "Film's Title"
                    onChange={this.handleChange}/>
                <input 
                    name="koreantitle" 
                    type="text"
                    value={this.state.koreantitle}
                    placeholder= "Film's Original Korean Title"
                    onChange={this.handleChange}/>
                <input
                    name="year"
                    type= "number"
                    value={this.state.year}
                    placeholder= "Year Produced"
                    onChange={this.handleChange}/>
                <select
                    name="watched"
                    value={this.state.watched}
                    onChange={this.handleChange}>
                    <option value={true}>Have Watched</option>
                    <option value={false}>Yet To Watch</option>
                    
                </select>

                <input type="submit" value="Edit or Update a Movie"/>
                <input type="button" value="Cancel" onClick={this.props.refresh}/>
            </form>
        )
    }
}

export default FilmUpdate; 