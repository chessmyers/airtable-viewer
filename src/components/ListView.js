import React, {Component} from 'react';
import '../styles/ListingsView.css';

class ListView extends Component {
    static defaultProps = {
        movies: [],
        showEntry() {
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            movies: nextProps.movies
        });
    }

    render() {
        return (
            <div className="container-fluid">

                <div className="list-group view listView">
                    <div className="row headerRow">
                        <div className="col-1">SREF #</div>
                        <div className="col-2">SDI ID</div>
                        <div className="col-2">English Title</div>
                        <div className="col-2">Spanish Title</div>
                        <div className="col-1">Year</div>
                        <div className="col-1">Synopsis (ENG)</div>
                        <div className="col-1">Synopsis (ESP)</div>
                        <div className="col-1">Nationality</div>
                        <div className="col-1">Poster</div>
                    </div>
                    <div className="row" style={{visibility: 'hidden'}}>
                        <div className="col-sm"> fsfdsfsd</div>
                    </div>
                    <div className="row" style={{visibility: 'hidden'}}>
                        <div className="col-sm"> fsfdsfsd</div>
                    </div>
                    {this.props.movies.map((item) => (
                        <div className="list-group-item-action row" key={item.id}
                             onClick={() => this.props.showEntry(item)}>
                            <div className="col-1">{item.fields["SREF#"]}</div>
                            <div className="col-2">{item.fields["SDI ID"]}</div>
                            <div className="col-2">{item.fields["SD Title"]}</div>
                            <div className="col-2">{item.fields["Título"]}</div>
                            <div className="col-1 text-center">{item.fields["Year"]}</div>
                            <div className="col-1">
                                <div data-toggle="tooltip" data-placement="top" title={item.fields["Synopsis (ENG)"]}
                                     className="text-center">
                                    ...
                                </div>
                            </div>
                            <div className="col-1">
                                <div data-toggle="tooltip" data-placement="top" title={item.fields["Synopsis (ESP)"]}
                                     className="text-center">
                                    ...
                                </div>
                            </div>
                            <div
                                className="col-1 text-center">{item.fields.Nationality && item.fields.Nationality[0]}</div>
                            <div className="col-1 text-center">
                                <img src={item.fields.Poster ? item.fields.Poster[0].url : ""} height="64px"
                                     width="48px" alt="Movie Poster"/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default ListView;