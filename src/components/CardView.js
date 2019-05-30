import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../styles/CardView.css';
import * as ROUTES from '../constants/routes';
import EntryViewPage from './EntryView';

class CardView extends Component {
    static defaultProps = {
        data: []
    };

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            movies: []
        }
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("NEXT PROPS");
        console.log(nextProps);
        this.setState({
            movies: nextProps.data
        })
    }

    onChange(event) {
        let search = event.target.value;
        this.setState({
            searchText: search
        })

        if (search && search !== '') {
            let movies = this.props.data;
            movies = movies.filter((movie) => {
                return (movie.fields["SD Title"] && movie.fields["SD Title"].toLowerCase().indexOf(search.toLowerCase()) > -1)
                    || (movie.fields["Título"] && movie.fields["Título"].toLowerCase().indexOf(search.toLowerCase()) > 1)
                    || (movie.fields.Nationality && movie.fields.Nationality[0].toLowerCase().indexOf(search.toLowerCase()) > -1)
                    || (movie.fields.Cast && movie.fields.Cast.toLowerCase().indexOf(search.toLowerCase()) > -1)
                    || (movie.fields.Director && movie.fields.Director.toLowerCase().indexOf(search.toLowerCase()) > -1)
                    || (movie.fields["SREF#"] && movie.fields["SREF#"].toString().indexOf(search.toLowerCase()) > 1)
            })
            this.setState({
                movies
            });

        } else {
            this.setState({
                movies: this.props.data
            })
        }

    }

    render() {
        const { searchText } = this.state;
        return (
            <div className="container-fluid">
                <input type="text" className="form-control" id="searchBar" aria-describedby="searchMovies"
                       placeholder="Search Movies..." value={searchText} onChange={this.onChange}/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <span>Total movies: {this.state.movies.length}</span>
                    <button className="btn btn-primary" onClick={() => this.props.reload()}>Reload Movies</button>
                </div>
                <div className="row">
                    {
                        this.props.data.length === 0 ?
                            <div>Loading...</div>
                            :
                        this.state.movies.map((card) => (
                        <div className="col-2" key={card.id} style={{padding: '20px'}}>
                            <Link to={`/view-entry/${card.id}`}>
                                <div className="card" style={{height: '600px'}}>
                                    <img className="card-img-top" src={card.fields.Poster ? card.fields.Poster[0].url : ""} alt="Poster"/>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {card.fields["SD Title"]}<br />
                                            ({card.fields["Título"]})
                                        </h5>
                                        <p className="card-text" style={{height: '150px', overflow: 'hidden', textOverflow: 'ellipsis'}}>{card.fields["Synopsis (ENG)"]}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default CardView;