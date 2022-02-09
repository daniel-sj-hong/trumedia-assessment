import React from 'react';
import { FiMenu } from 'react-icons/fi';
import AppContext from '../lib/context';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOn: false,
      mlbPlayers: []
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    this.setState({ isModalOn: !this.state.isModalOn });
  }

  render() {
    return (
      <>
        <header>
          <div className="header row black">
            <h1 className="white title"><a href="#">MLB Stats Tracker</a></h1>
            <FiMenu className="align-center white hamburger" onClick={this.toggle}/>
          </div>
        </header>
        {this.state.isModalOn &&
        <>
          <div onClick={this.toggle} className="background fixed"></div>
          <div className="app-drawer fixed row column align-center">
            <h2 className="remove-padding">Players</h2>
            <ul className="width-100">
              {this.props.mlbPlayers.map(player =>
                <li key={player.playerId} className="list-item">
                  <a onClick={this.toggle}href={`#player?playerId=${player.playerId}`} playerid={player.playerId}>
                    {player.fullName}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </>
        }
      </>
    );
  }
}

Header.contextType = AppContext;
