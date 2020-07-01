import React from 'react';

class MovieForm extends React.Component{
    state = {
        title: "",
        koreantitle: "",
        year: 0,
        watched: true
    }

    handleChange = ( {target} ) => {
        const key = target.name; // should I change 'name'' to 'title'? didn't need to last time
        this.setState({ [key] : target.value }, () => console.log(this.state[key]));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const watched= this.state.watched === true;
        fetch(`${process.env.REACT_APP_API_URL}/api/nokomovies`, {
            method: "POST",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify([{title : this.state.title, koreantitle : this.state.koreantitle, year : parseInt(this.state.year), watched : watched}])
        })
        // .then(this.props.refresh)
        .then(result=> console.log("post result", result)) //how can we modify this to update state object?
        .then(() => this.setState({
            title: "",
            koreantitle: "",
            year: 0, 
            watched: true
        })); //THEN
    }

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

                <input type="submit" value="Add a Movie"/>
            </form>
        )
    }
}

export default MovieForm; 