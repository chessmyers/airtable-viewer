import React, {Component} from 'react';
import * as ROUTES from '../constants/routes';
import {Link} from "react-router-dom";


class EntryView extends Component {
    static defaultProps = {
        movie: {}
    };

    constructor(props) {
        super(props);
        this.state = {
            movie: {}
        }
    }

    componentDidMount() {
        this.setState({
            movie: this.props.movie[0]
        });
    }

    render() {
        return (
            <div>
                <Link to={ROUTES.LANDING} style={{fontSize: '150%'}}>Go Back</Link>
                <h1 className="display-2">Movie Info:</h1>
                {
                    this.state.movie !== {} ?
                        <div>
                            <img src={this.state.movie.fields ? this.state.movie.fields.Poster[0].url : ""} alt="Movie Poster" height="50%" width="50%"/>
                            <p>
                                <button className="btn btn-primary padding" type="button" data-toggle="collapse"
                                        data-target="#basicInfo"
                                        aria-expanded="false" aria-controls="basicInfo">
                                    Basic Info
                                </button>
                                <button className="btn btn-primary padding" type="button" data-toggle="collapse"
                                        data-target="#castingInfo"
                                        aria-expanded="false" aria-controls="castingInfo">
                                    Casting Info
                                </button>
                                <button className="btn btn-primary padding" type="button" data-toggle="collapse"
                                        data-target="#producerInfo"
                                        aria-expanded="false" aria-controls="producerInfo">
                                    Producer Info
                                </button>
                                <button className="btn btn-primary padding" type="button" data-toggle="collapse"
                                        data-target="#genreInfo"
                                        aria-expanded="false" aria-controls="genreInfo">
                                    Genre/Nationality
                                </button>
                            </p>
                            <p>
                                IMDB Link: <a href={this.state.movie.fields ? this.state.movie.fields.iMDB : "#"}>{this.state.movie.fields && this.state.movie.fields.iMDB}</a>
                            </p>
                            <div className="collapse" id="basicInfo">
                                <div className="card card-body">
                                    <h2><b>Title (ENG): </b>{this.state.movie.fields && this.state.movie.fields["SD Title"]}</h2>
                                    <h2><b>Title (ESP): </b>{this.state.movie.fields && this.state.movie.fields["Título"]}</h2>
                                    <h2><b>SDI ID: </b>{this.state.movie.fields && this.state.movie.fields["SDI ID"]}</h2>
                                    <h2><b>Year: </b>{this.state.movie.fields && this.state.movie.fields.Year}</h2>
                                    <h2><b>Synopsis (ENG): </b>{this.state.movie.fields && this.state.movie.fields["Synopsis (ENG)"]}</h2>
                                    <h2><b>Synopsis (ESP): </b>{this.state.movie.fields && this.state.movie.fields["Synopsis (ESP)"]}</h2>
                                </div>
                            </div>
                            <div className="collapse" id="castingInfo">
                                <div className="card card-body">
                                    <h2><b>Director: </b>{this.state.movie.fields && this.state.movie.fields.Director}</h2>
                                    <h2><b>Cast: </b>{this.state.movie.fields && this.state.movie.fields.Cast}</h2>
                                </div>
                            </div>
                            <div className="collapse" id="producerInfo">
                                <div className="card card-body">
                                    <img src={this.state.movie.fields ? this.state.movie.fields["Producer Logo"][0].url : ""} alt="Producer Logo" />
                                </div>
                            </div>
                            <div className="collapse" id="genreInfo">
                                <div className="card card-body">
                                    <h2><b>Genre(s): </b>{this.state.movie.fields && this.state.movie.fields.Genre}</h2>
                                    <h2><b>Nationality: </b>{this.state.movie.fields && this.state.movie.fields.Nationality[0]}</h2>
                                </div>
                            </div>
                        </div>
                        : <div>Loading...</div>
                }

            </div>
        );
    }
}

const TabBar = () => {

}

export default EntryView;