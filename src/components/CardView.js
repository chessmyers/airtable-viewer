import React, {Component} from 'react';
import '../styles/ListingsView.css';

class CardView extends Component {
    static defaultProps = {
        movies: [],
        showEntry() {
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            movies: nextProps.movies
        })
    }

    render() {
        const loadingView = <div style={{padding: '15px'}}>Loading...</div>;
        return (
            <div className="container-fluid">
                <div className="row view">
                    {
                        this.props.movies.length === 0 ?
                            loadingView
                            :
                            this.props.movies.map((card) => (
                                <div className="col-2" key={card.id} style={{padding: '20px'}}
                                     onClick={() => this.props.showEntry(card)}>
                                    <div className="card" style={{height: '600px'}}>
                                        <img className="card-img-top"
                                             src={card.fields.Poster ? card.fields.Poster[0].url : ""} alt="Poster"/>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {card.fields["SD Title"]}<br/>
                                                ({card.fields["Título"]})
                                            </h5>
                                            <p className="card-text" style={{
                                                height: '150px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>{card.fields["Synopsis (ENG)"]}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                </div>
            </div>
        );
    }
}

export default CardView;