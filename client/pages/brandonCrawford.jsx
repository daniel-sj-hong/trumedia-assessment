import React from 'react';
export default class BrandonCrawford extends React.Component {
  render() {
    return (
      <>
      {JSON.stringify(this.props.playerSeason)};
      </>
    );
  }
}
