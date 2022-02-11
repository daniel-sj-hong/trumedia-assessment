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
    this.getMlbPlayers = this.getMlbPlayers.bind(this);
  }

  getMlbPlayers() {
    axios.get('https://project.trumedianetworks.com/api/mlb/players', {
      headers: {
        accept: 'application/json',
        tempToken: this.state.tempToken
      }
    })
      .then(result => {
        this.setState({ mlbPlayers: result.data });
      })
      .catch(err => console.error(err));
  }

  getToken() {
    axios.get('/api/mlb/token')
      .then(results => {
        localStorage.setItem('tempToken', results.data.token);
        localStorage.setItem('expires', results.data.expires);
        this.setState({ tempToken: results.data.token }, this.getMlbPlayers);
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) }, () => {});
    });
    if (!localStorage.getItem('tempToken')) {
      this.getToken();
    } else if (Date.now() > Date.parse(localStorage.getItem('expires'))) {
      this.getToken();
    } else {
      this.setState({ tempToken: localStorage.getItem('tempToken') }, this.getMlbPlayers);
    }
  }

  renderPage() {
    const { route } = this.state;
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
