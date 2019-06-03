import React, {Component} from 'react';
import './App.css';

import Controls from './components/Controls';
import ListView from './components/ListView';
import CardView from './components/CardView';
import EntryView from './components/EntryView';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allMovies: [],
            showMovies: [],
            view: 'card',
            currentEntry: null
        };

        this.loadData = this.loadData.bind(this);
        this.fetchMoreRecords = this.fetchMoreRecords.bind(this);
        this.changeView = this.changeView.bind(this);
        this.updateShowMovies = this.updateShowMovies.bind(this);
        this.showEntry = this.showEntry.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    changeView(type) {
        this.setState({
            view: type
        })
    }

    loadData() {
        fetch('https://api.airtable.com/v0/app908XPeMBkOTZ1j/Film Registry?api_key=keyO8hayVZ0xsDhDM')
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    allMovies: data.records
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
                    allMovies: prevState.allMovies.concat(data.records),
                    showMovies: prevState.allMovies.concat(data.records)
                }));
                if (data.offset) {
                    this.fetchMoreRecords(data.offset);
                }
            })
    }

    updateShowMovies(movies) {
        this.setState({
            showMovies: movies
        })
    }

    showEntry(entry) {
        this.setState({
            view: 'entry',
            currentEntry: entry
        })
    }

    render() {
        const view = () => {
            if (this.state.view === 'card') {
                return <CardView movies={this.state.showMovies} showEntry={this.showEntry}/>
            }
            if (this.state.view === 'list') {
                return <ListView movies={this.state.showMovies} showEntry={this.showEntry}/>
            }
            if (this.state.view === 'entry') {
                return <EntryView movie={this.state.currentEntry}/>
            }
        };

        return (
            <div>
                <Controls movies={this.state.allMovies} changeView={this.changeView}
                          reload={this.loadData} returnMovies={this.updateShowMovies}/>
                {view()}
            </div>
        );
    }
}

export default App;
