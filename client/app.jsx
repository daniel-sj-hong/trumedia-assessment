import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parseRoute';
import JoshBell from './pages/joshBell';
import BryceHarper from './pages/bryceHarper';
import BrandonCrawford from './pages/brandonCrawford';
import Header from './components/header';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      playerSeason: []
    };
    this.renderPage = this.renderPage.bind(this);
    this.updatePlayerSeason = this.updatePlayerSeason.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  updatePlayerSeason(playerSeason) {
    this.setState({ playerSeason: playerSeason });
    console.log('this is this.state.playerSeason after setState: ', this.state.playerSeason);
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'Josh-Bell') {
      return <JoshBell playerSeason={this.state.playerSeason}/>;
    }
    if (route.path === 'Bryce-Harper') {
      return <BryceHarper playerSeason={this.state.playerSeason} />;
    }
    if (route.path === 'Brandon-Crawford') {
      return <BrandonCrawford playerSeason={this.state.playerSeason}/>;
    }
  }

  render() {
    return (
      <>
       <Header updatePlayerSeason={this.updatePlayerSeason} />
       { this.renderPage() }
      </>
    );
  }
}
