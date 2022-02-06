import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parseRoute';
import JoshBell from './pages/joshBell';
import BryceHarper from './pages/bryceHarper';
import BrandonCrawford from './pages/brandonCrawford';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'Josh-Bell') {
      return <JoshBell />;
    }
    if (route.path === 'Bryce-Harper') {
      return <BryceHarper />;
    }
    if (route.path === 'Brandon-Crawford') {
      return <BrandonCrawford />;
    }
  }

  render() {
    return (
      <>
       { this.renderPage() }
      </>
    );
  }
}
