import React, {Component} from 'react';
import {searchMovies} from "../util";
import '../styles/Controls.css';

class Controls extends Component {
    static defaultProps = {
        movies: [],
        changeView() {
        },
        reload() {
        },
        returnMovies() {
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            showMoviesLength: this.props.movies.length,
            allMoviesLoaded: false
        };
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!this.state.allMoviesLoaded) {
            this.setState({
                showMoviesLength: nextProps.movies.length
            })
        }
    }


    onChange(event) {
        this.setState({
            allMoviesLoaded: true
        });
        let search = event.target.value;
        this.setState({
            searchText: search
        });

        if (search && search !== '') {
            let movies = this.props.movies;
            movies = searchMovies(movies, search);
            this.setState({
                showMoviesLength: movies.length
            });
            this.props.returnMovies(movies);

        } else {
            this.setState({
                showMoviesLength: this.props.movies.length
            });
            this.props.returnMovies(this.props.movies)
        }

    }

    render() {
        const {searchText} = this.state;
        return (
            <div className="controls">
                <div className="btn-group" role="group" aria-label="Navigation" style={{width: '100%'}}>
                    <button type="button" className="btn btn-success" onClick={() => this.props.changeView('card')}>Card
                        View
                    </button>
                    <button type="button" className="btn btn-success" onClick={() => this.props.changeView('list')}>List
                        View
                    </button>
                </div>
                <input type="text" className="form-control" id="searchBar" aria-describedby="searchMovies"
                       placeholder="Search Movies..." value={searchText} onChange={this.onChange}/>
                <span><i>Search by title (Spanish/English), nationality, cast, director, genre, or ID number</i></span>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <span>Total movies: {this.state.showMoviesLength}</span>
                    <button className="btn btn-primary" onClick={() => {
                        this.setState({
                            allMoviesLoaded: false
                        });
                        this.props.reload()
                    }}>Reload Movies
                    </button>
                </div>
            </div>
        );
    }
}

export default Controls;