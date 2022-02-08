import React from 'react';

export default class JoshBell extends React.Component {
  render() {
    return (
      <>
        {JSON.stringify(this.props.playerSeason)}
      </>
    );
  }
}
