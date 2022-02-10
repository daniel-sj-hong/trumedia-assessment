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
    console.log('this.props: ', this.props);
    console.log('this.state.playerSeason: ', this.state.playerSeason);
    return (
      <>
        {(this.state.playerSeason.length > 0)
          ? <>
              <div className="container row justify-center mt-20">
                <div className="row align-center width-height-background-border">
                  <div className="col-half row justify-center">
                    <img src={this.state.playerSeason[0].playerImage} />
                  </div>
                  <div className="col-half">
                    <div className="row justify-center align-center">
                      <h3>{this.state.playerSeason[0].fullName}</h3>
                    </div>
                    <div className="row space-evenly justify-center align-center">
                      <h4>{this.state.playerSeason[0].team}</h4>
                      <img src={this.state.playerSeason[0].teamImage} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                hello
              </div>
            </>

          : <p className="row justify-center">Loading...</p>}
      </>
    );
  }
}

Player.contextType = AppContext;
