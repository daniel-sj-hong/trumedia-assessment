import React from 'react';
import { FiMenu } from 'react-icons/fi';
import axios from 'axios';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOn: false,
      mlbPlayers: [],
      tempToken: '',
      playerId: ''
    };
    this.toggle = this.toggle.bind(this);
    this.getMlbPlayers = this.getMlbPlayers.bind(this);
    this.getMlbPlayer = this.getMlbPlayer.bind(this);
  }

  toggle() {
    this.setState(prevState => {
      return { isModalOn: !prevState.isModalOn };
    });
  }

  componentDidMount() {
    axios.get('/api/mlb/token')
      .then(results => {
        console.log('this is the results of componentDidMount: ', results);
        this.setState({ tempToken: results.data.token });
        console.log('this is this.state.tempToken after setState: ', this.state.tempToken);
      })
      .catch(err => console.error(err));
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
        console.log('this is the result of getMlbPlayers method:', result);
        console.log('this is mlbPlayers: ', this.state.mlbPlayers);
      })
      .catch(err => console.error(err));

    this.toggle();
  }

  getMlbPlayer(e) {
    axios(`https://project.trumedianetworks.com/api/mlb/player/${parseInt(e.target.getAttribute('playerid'))}`, {
      headers: {
        accept: 'application/json',
        tempToken: this.state.tempToken
      }
    })
      .then(result => {
        this.props.updatePlayerSeason(result.data);
      })
      .catch(err => console.error(err));
  }

  render() {

    const players = this.state.mlbPlayers;
    const array = players.map(player =>
      <li key={player.playerId} className="list-item"><a onClick={this.getMlbPlayer} href={`#${player.fullName.replace(' ', '-')}`} playerid={player.playerId}>{player.fullName}</a></li>
    );

    return (
      <>
        <header>
          <div className="header row black">
            <h1 className="white title" onClick={this.getMlbPlayer}>MLB Stats Tracker</h1>
            <FiMenu className="align-center white hamburger" onClick={this.getMlbPlayers}/>
          </div>
        </header>
        {this.state.isModalOn &&
        <>
          <div onClick={this.toggle} className="background absolute"></div>
          <div className="app-drawer absolute row column align-center">
            <h2 className="remove-padding">Players</h2>
            <ul className="width-100">
              {array}
            </ul>
          </div>
        </>
        }
      </>
    );
  }
}
