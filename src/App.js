import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

import Navigation from './components/Navigation';
import ListViewPage from './components/ListView';
import CardViewPage from './components/CardView';
import EntryViewPage from './components/EntryView';
import LostPage from './components/Lost';
import * as ROUTES from './constants/routes';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

        this.loadData = this.loadData.bind(this);
        this.fetchMoreRecords = this.fetchMoreRecords.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch('https://api.airtable.com/v0/app908XPeMBkOTZ1j/Film Registry?api_key=keyO8hayVZ0xsDhDM')
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    data: data.records
                });
                if (data.offset) {
                    this.fetchMoreRecords(data.offset);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    fetchMoreRecords(offset) {
        fetch(`https://api.airtable.com/v0/app908XPeMBkOTZ1j/Film Registry?offset=${offset}&api_key=keyO8hayVZ0xsDhDM`)
            .then(resp => resp.json())
            .then(data => {
                this.setState((prevState) => ({
                    data: prevState.data.concat(data.records)
                }));
                console.log(this.state.data);
                if (data.offset) {
                    this.fetchMoreRecords(data.offset);
                }
            })
    }

    render() {
        return (
            <Router>
                <div>
                    <Navigation/>
                    <Switch>
                        <Route exact path={ROUTES.LANDING} render={() => (
                            <CardViewPage data={this.state.data} reload={this.loadData}/>
                        )}/>
                        <Route exact path={ROUTES.CARDVIEW} render={() => (
                            <CardViewPage data={this.state.data} reload={this.loadData}/>
                        )}/>
                        <Route exact path={ROUTES.LISTVIEW} render={() => (
                            <ListViewPage data={this.state.data} reload={this.loadData}/>
                        )}/>
                        <Route exact path={ROUTES.ENTRYVIEW} render={(props) => {
                            let movieID = props.location.pathname.replace('/view-entry/', '');
                            let movieToShow = this.state.data.filter((movie) => {
                                return movie.id === movieID;
                            })
                            return <EntryViewPage movie={movieToShow}/>
                        }}/>
                        <Route component={LostPage}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
