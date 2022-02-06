import React from 'react';
import axios from 'axios';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mlbPlayers: [],
      tempToken: ''
    };
    this.getMlbPlayers = this.getMlbPlayers.bind(this);
    this.getMlbPlayer = this.getMlbPlayer.bind(this);
  }

  componentDidMount() {
    axios.get('/api/mlb/token')
      .then(results => {
        console.log('this is results of componentDidMount: ', results);
        this.setState({ tempToken: (results.data.token) });
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
  }

  getMlbPlayer() {
    axios(`https://project.trumedianetworks.com/api/mlb/player/${this.state.mlbPlayers[0].playerId}`, {
      headers: {
        accept: 'application/json',
        tempToken: this.state.tempToken
      }
    })
      .then(result => {
        console.log(result);
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
      <h1 onClick={this.getMlbPlayers}>hi</h1>
      <h2 onClick={this.getMlbPlayer}>hello</h2>
      </>
    );
  }
}

// const [mlbPlayers, setMlbPlayers] = useState([]);

// const token = () => axios.get('/api/mlb/token')
//   .then(results => results.data.token)
//   .catch(err => console.error(err));
// console.log(token);

// const getMlbPlayer = token => {

//   const headers = {
//     accept: 'application/json',
//     tempToken: token
//   };

//   axios(`https://project.trumedianetworks.com/api/mlb/player/${mlbPlayers[0].playerId}`, { headers })
//     .then(result => console.log(result.data))
//     .catch(err => console.error(err));
// };

// const getMlbPlayers = async () => {
//   const apiToken = await token();

// const headers = {
//   accept: 'application/json',
//   tempToken: apiToken
// };

//   axios('https://project.trumedianetworks.com/api/mlb/players', { headers })
//     .then(result => setMlbPlayers(result.data))
//     .then(resolution => getMlbPlayer(apiToken))
//     .catch(err => console.error(err));
// };

// useEffect(getMlbPlayers, []);

// console.log(mlbPlayers);
// return (
//   <>
//   {mlbPlayers.map(player => <h1 key={player.playerId}>{player.fullName}</h1>)}
//   </>
// );
