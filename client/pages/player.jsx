import React from 'react';
import axios from 'axios';
import AppContext from '../lib/context';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerSeason: []
    };
  }

  componentDidMount() {
    axios.get(`https://project.trumedianetworks.com/api/mlb/player/${this.props.currentPlayer}`, {
      headers: {
        accept: 'application/json',
        tempToken: this.context
      }
    })
      .then(result => {
        this.setState({ playerSeason: result.data });
      })
      .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentPlayer !== prevProps.currentPlayer) {
      axios.get(`https://project.trumedianetworks.com/api/mlb/player/${this.props.currentPlayer}`, {
        headers: {
          accept: 'application/json',
          tempToken: this.context
        }
      })
        .then(result => {
          this.setState({ playerSeason: result.data });
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    console.log('this.props.currentPlayer: ', this.props.currentPlayer);
    return (
      <>
        {(this.state.playerSeason.length > 0)
          ? <div className="row justify-center align-center">
            <div className="col-half row justify-center">
              <img src={this.state.playerSeason[0].playerImage} />
            </div>
            <div className="col-half row justify-center">
              <h3>{this.state.playerSeason[0].fullName}</h3>
              <div className="row">
                <h5>{this.state.playerSeason[0].team}</h5>
              </div>
            </div>
          </div>

          : <p>is Loading...</p>}
      </>
    );
  }
}

Player.contextType = AppContext;
