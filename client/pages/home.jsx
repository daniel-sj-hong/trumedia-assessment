import React from 'react';
import Header from '../components/header';

export default function Home(props) {
  return (
      <>
        <Header />
        <div className='row justify-center'>
          <p>Please click on the menu button above<br />to see a player&apos;s stats!</p>
        </div>
      </>
  );
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
