import React from 'react';
import axios from 'axios';
import AppContext from '../lib/context';
import { format, parse } from 'date-fns';

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
                      <h2>{this.state.playerSeason[0].fullName}</h2>
                    </div>
                    <div className="row space-evenly justify-center align-center">
                      <h4>{this.state.playerSeason[0].team}</h4>
                      <img src={this.state.playerSeason[0].teamImage} />
                    </div>
                  </div>
                </div>
              </div>

              {this.state.playerSeason.map(player =>
                <div className="row justify-center mt-20" key={player.gameDate}>
                  <div className="row align-center space-evenly justify-center width-height-background-border">
                    <div className="mobile-width-30 height-100 row column align-center space-evenly">
                      <div className="row justify-center">
                        <h2 className="remove-margin">VS.</h2>
                      </div>
                      <div className="row width-100 space-evenly">
                        <h3>{player.opponent}</h3>
                        <img src={player.opponentImage} />
                      </div>
                      <div className="row justify-center">
                      <h3 className="remove-margin mobile-date-font">Game Date: {format(parse(player.gameDate, 'yyyy-MM-dd HH:mm:ss', new Date()), 'MM/dd/yyyy')}</h3>
                      </div>
                    </div>
                    {/* <div className="mobile-width-70 height-100 row justify-center"> */}
                      <table className="mobile-width-70 height-100 row justify-center align-center">
                        <tbody>
                          <tr>
                            <th>PA:</th>
                            <td>{player.PA}</td>
                            <th>K:</th>
                            <td>{player.K}</td>
                          </tr>
                          <tr>
                            <th>AB:</th>
                            <td>{player.AB}</td>
                            <th>HBP:</th>
                            <td>{player.HBP}</td>
                          </tr>
                          <tr>
                            <th>H:</th>
                            <td>{player.H}</td>
                            <th>SF:</th>
                            <td>{player.SF}</td>
                          </tr>
                          <tr>
                            <th>HR:</th>
                            <td>{player.HR}</td>
                            <th>TB:</th>
                            <td>{player.TB}</td>
                          </tr>
                          <tr>
                            <th>BB:</th>
                            <td>{player.BB}</td>
                            <th>RBI:</th>
                            <td>{player.RBI}</td>
                          </tr>
                        </tbody>
                      </table>
                    {/* </div> */}
                  </div>
                </div>
              )}
            </>

          : <p className="row justify-center">Loading...</p>}
      </>
    );
  }
}

Player.contextType = AppContext;
