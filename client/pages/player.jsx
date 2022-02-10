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
                      <h2>{this.state.playerSeason[0].fullName}</h2>
                    </div>
                    <div className="row space-evenly justify-center align-center">
                      <h4>{this.state.playerSeason[0].team}</h4>
                      <img src={this.state.playerSeason[0].teamImage} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row justify-center mt-20">
                <div className="row align-center space-evenly justify-center width-height-background-border">
                  <div className="mobile-width-30 height-100 row column align-center space-evenly">
                    <div className="row justify-center">
                      <h2 className="remove-margin">VS.</h2>
                    </div>
                    <div className="row width-100 space-evenly">
                      <h3>{this.state.playerSeason[0].opponent}</h3>
                      <img src={this.state.playerSeason[0].opponentImage} />
                    </div>
                    <div className="row justify-center">
                    <h3 className="remove-margin mobile-date-font">Game Date: {format(parse(this.state.playerSeason[0].gameDate, 'yyyy-MM-dd HH:mm:ss', new Date()), 'MM/dd/yyyy')}</h3>
                    </div>
                  </div>
                  {/* <div className="mobile-width-70 height-100 row justify-center"> */}
                    <table className="mobile-width-70 height-100 row justify-center align-center">
                      <tbody>
                        <tr>
                          <th>PA:</th>
                          <td>{this.state.playerSeason[0].PA}</td>
                          <th>K:</th>
                          <td>{this.state.playerSeason[0].K}</td>
                        </tr>
                        <tr>
                          <th>AB:</th>
                          <td>{this.state.playerSeason[0].AB}</td>
                          <th>HBP:</th>
                          <td>{this.state.playerSeason[0].HBP}</td>
                        </tr>
                        <tr>
                          <th>H:</th>
                          <td>{this.state.playerSeason[0].H}</td>
                          <th>SF:</th>
                          <td>{this.state.playerSeason[0].SF}</td>
                        </tr>
                        <tr>
                          <th>HR:</th>
                          <td>{this.state.playerSeason[0].HR}</td>
                          <th>TB:</th>
                          <td>{this.state.playerSeason[0].TB}</td>
                        </tr>
                        <tr>
                          <th>BB:</th>
                          <td>{this.state.playerSeason[0].BB}</td>
                          <th>RBI:</th>
                          <td>{this.state.playerSeason[0].RBI}</td>
                        </tr>
                      </tbody>
                    </table>
                  {/* </div> */}
                </div>
              </div>
            </>

          : <p className="row justify-center">Loading...</p>}
      </>
    );
  }
}

Player.contextType = AppContext;
