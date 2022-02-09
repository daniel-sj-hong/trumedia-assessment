import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parseRoute';
import Header from './components/header';
import axios from 'axios';
import AppContext from './lib/context';
import Player from './pages/player';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      playerSeason: [],
      tempToken: '',
      mlbPlayers: []
    };
    this.renderPage = this.renderPage.bind(this);
    this.updatePlayerSeason = this.updatePlayerSeason.bind(this);
    this.getMlbPlayers = this.getMlbPlayers.bind(this);
  }

  getMlbPlayers() {
    axios('https://project.trumedianetworks.com/api/mlb/players', {
      headers: {
        accept: 'application/json',
        tempToken: this.state.tempToken
      }
    })
      .then(result => {
        this.setState({ mlbPlayers: result.data });
        // console.log('this is the result of getMlbPlayers method:', result);
        // console.log('this is mlbPlayers: ', this.state.mlbPlayers);
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) }, () => {
      }
      );
    });

    axios.get('/api/mlb/token')
      .then(results => {
        // console.log('this is the results of componentDidMount: ', results);
        this.setState({ tempToken: results.data.token }, this.getMlbPlayers);
        // console.log('this is this.state.tempToken: ', this.state.tempToken);
      })
      .catch(err => console.error(err));
  }

  updatePlayerSeason(playerSeason) {
    this.setState({ playerSeason: playerSeason });
    // console.log('this is this.state.playerSeason after setState: ', this.state.playerSeason);
  }

  renderPage() {
    const { route } = this.state;
    // console.log('route: ', route);
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'player') {
      return <Player currentPlayer={route.params.get('playerId')}/>;
    }
  }

  render() {
    const tokenContext = this.state.tempToken;
    return (
      <AppContext.Provider value={tokenContext}>
       <Header mlbPlayers={this.state.mlbPlayers} />
       { this.renderPage() }
      </AppContext.Provider>
    );
  }
}
