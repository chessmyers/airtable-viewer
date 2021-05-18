import React, {Component} from 'react';
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import '../styles/EntryView.css';

class EntryView extends Component {
    static defaultProps = {
        movie: {}
    };

    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            sales: [],
            producer: null,
            producerContacts: []
        };
        this.loadSaleInfo = this.loadSaleInfo.bind(this);
    }

    componentDidMount() {
        this.setState({
            movie: this.props.movie
        });
        console.log(this.props.movie);
        this.loadSaleInfo(this.props.movie.fields.Sales);
        this.loadProducer(this.props.movie.fields["Purchased From"][0]);
    }

    loadSaleInfo(ids) {
        let fetches = [];
        ids.forEach((id) => {
            fetches.push(fetch(`https://api.airtable.com/v0/app908XPeMBkOTZ1j/Sales/${id}?api_key=keyO8hayVZ0xsDhDM`));
        });
        Promise.all(fetches)
            .then((responses) => {
                let jsons = [];
                responses.forEach((response) => {
                    jsons.push(response.json());
                });
                Promise.all(jsons)
                    .then((sales) => {
                        //console.log(sales);
                        this.setState({
                            sales
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    loadProducer(id) {
        fetch(`https://api.airtable.com/v0/app908XPeMBkOTZ1j/Companies/${id}?api_key=keyO8hayVZ0xsDhDM`)
            .then(resp => resp.json())
            .then((producer) => {
                console.log(producer);
                this.setState({
                    producer
                }, () => {
                    this.state.producer.fields.Contacts && this.loadProducerContacts();
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    loadProducerContacts() {
        const ids = this.state.producer.fields.Contacts;
        let fetches = [];
        ids.forEach((id) => {
            fetches.push(fetch(`https://api.airtable.com/v0/app908XPeMBkOTZ1j/Contacts/${id}?api_key=keyO8hayVZ0xsDhDM`));
        });
        Promise.all(fetches)
            .then((responses) => {
                let jsons = [];
                responses.forEach((response) => {
                    jsons.push(response.json());
                });
                Promise.all(jsons)
                    .then((contacts) => {
                        console.log(contacts);
                        this.setState({
                            producerContacts: contacts
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        const loadingView = <div className="padding">Loading...</div>
        return (
            <div className="view">
                <h5><b>Title
                    (ENG): </b>{this.state.movie.fields && this.state.movie.fields["SD Title"]}</h5>
                <h5><b>Title
                    (ESP): </b>{this.state.movie.fields && this.state.movie.fields["Título"]}</h5>
                <h5><b>SDI ID: </b>{this.state.movie.fields && this.state.movie.fields["SDI ID"]}
                </h5>
                <h5><b>SREF #: </b>{this.state.movie.fields && this.state.movie.fields["SREF#"]}
                </h5>
                <Tabs>
                    <TabList>
                        <Tab>Rights</Tab>
                        <Tab>Basic Info</Tab>
                        <Tab>Casting Info</Tab>
                        <Tab>Genre/Nationality</Tab>
                        <Tab>Other</Tab>
                    </TabList>

                    <TabPanel>
                        {
                            this.state.movie !== {} ?
                                <div className="padding">
                                    <span><b>License Start:</b> {this.state.movie.fields && this.state.movie.fields["L. Start"]}</span>
                                    <span>    </span>
                                    <span><b>License End:</b> {this.state.movie.fields && this.state.movie.fields["L. End"]}</span>
                                    <hr/>
                                    <div>
                                        <b><h5>Sales:</h5></b>{
                                        this.state.sales.length > 0 ? this.state.sales.map((sale, index) => {
                                                return (
                                                    <div key={index}>
                                                        <span>{index + 1}. </span>
                                                        <span><b>Sale Term Start:</b> {sale.fields["Sale Term Start"] && sale.fields["Sale Term Start"]}  </span>
                                                        <span><b>Sale Term End:</b> {sale.fields["Sale Term End"] && sale.fields["Sale Term End"]}  </span>
                                                        <span><b>Buyer Logo:</b>
                                                        <img
                                                            src={sale.fields["Buyer Logo"] ? sale.fields["Buyer Logo"][0].url : ""}
                                                            height="64px" width="48px" alt="Buyer Logo"/>
                                                    </span>
                                                        <hr/>
                                                    </div>
                                                )
                                            })
                                            :
                                            <div>No sales to show!</div>
                                    }
                                    </div>
                                </div>
                                :
                                {loadingView}
                        }
                    </TabPanel>
                    <TabPanel>
                        {/*// Basic Info*/}
                        {
                            this.state.movie !== {} ?
                                <div className="padding">
                                    <img src={(this.state.movie.fields && this.state.movie.fields.Poster) ? this.state.movie.fields.Poster[0].url : ""}
                                         alt="Movie Poster" height="10%" width="10%"/>
                                    <h6><b>Year: </b>{this.state.movie.fields && this.state.movie.fields.Year}</h6>
                                    <h6><b>Synopsis
                                        (ENG): </b>{this.state.movie.fields && this.state.movie.fields["Synopsis (ENG)"]}
                                    </h6>
                                    <h6><b>Synopsis
                                        (ESP): </b>{this.state.movie.fields && this.state.movie.fields["Synopsis (ESP)"]}
                                    </h6>
                                </div>
                                :
                                {loadingView}
                        }
                    </TabPanel>
                    <TabPanel>
                        {/*Casting Info*/}
                        {
                            this.state.movie !== {} ?
                                <div className="padding">
                                    <h6><b>Director: </b>{this.state.movie.fields && this.state.movie.fields.Director}
                                    </h6>
                                    <h6><b>Cast: </b>{this.state.movie.fields && this.state.movie.fields.Cast}</h6>
                                    <h6><b>Producer: </b>{this.state.producer && this.state.producer.fields.Name}</h6>
                                    <h6><b>Producer Contacts: </b>
                                        <ul>
                                            {(this.state.producerContacts && this.state.producerContacts.length > 0) ?
                                                this.state.producerContacts.map((contact, index) => {
                                                return <li key={index}>
                                                    <span>{contact.fields.Name}</span><br/>

                                                    {contact.fields.Title && <span>{contact.fields.Title}</span>}<br/>

                                                    {contact.fields["Direct Line"] &&
                                                    <span>{contact.fields["Direct Line"]}<br/></span>}

                                                    {contact.fields.Email &&
                                                    <a href={"mailto:".concat(contact.fields.Email)}>{contact.fields.Email}</a>}<br/>

                                                    {contact.fields["Notes/Comments"] &&
                                                    <span>{contact.fields["Notes/Comments"]}</span>}


                                                </li>
                                            })
                                                :
                                                <li>No contacts to show</li>
                                            }
                                        </ul>
                                    </h6>
                                    <img
                                        src={this.state.movie.fields ? this.state.movie.fields["Producer Logo"][0].url : ""}
                                        alt="Producer Logo" height="10%" width="10%"/>
                                </div>
                                :
                                {loadingView}
                        }
                    </TabPanel>
                    <TabPanel>
                        {/*Genre/Nationality*/}
                        {
                            this.state.movie !== {} ?
                                <div className="padding">
                                    <h6>
                                        <b>Genre(s): </b>{(this.state.movie.fields && this.state.movie.fields.Genre) ? this.state.movie.fields.Genre.map((genre, index) => {
                                        return <span key={index}>{genre} </span>
                                    }) : <span>N/A</span>}</h6>
                                    <h6>
                                        <b>Nationality: </b>{(this.state.movie.fields && this.state.movie.fields.Nationality) ? this.state.movie.fields.Nationality[0]
                                        :
                                        <span>N/A</span>}
                                    </h6>
                                    <h6><b>Other Title(s): </b>{(this.state.movie.fields && this.state.movie.fields["Other Titles"]) ? this.state.movie.fields["Other Titles"]
                                : <span>N/A</span>}
                                    </h6>
                                </div>
                                :
                                {loadingView}
                        }
                    </TabPanel>
                    <TabPanel>
                        {/*Other Info*/}
                        {
                            this.state.movie !== {} ?
                                <div className="padding">
                                    <h6><b>IMDB Link: </b>
                                        <a href={(this.state.movie.fields && this.state.movie.fields.iMDB) ?
                                            this.state.movie.fields.iMDB : "#"} rel="noopener noreferrer"  target="_blank">
                                        {this.state.movie.fields && this.state.movie.fields.iMDB}
                                        </a>
                                    </h6>
                                    <h6>
                                        <b>Notes: </b>
                                        <span>{(this.state.movie.fields && this.state.movie.fields.Notes) ?
                                            this.state.movie.fields.Notes : <span>No notes to show</span>}</span>
                                    </h6>
                                </div>
                                :
                                {loadingView}
                        }

                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default EntryView;
