import React from 'react';

import InfoPanel from './InfoPanel.jsx';

class DiscussMissionPlayersScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>

      <Stats />

        <h3> Discuss Which {this.props.missionSize} Players to Send on the Mission </h3>
        (Shown to all players except for game owner)
      </div>
      )
  }
}

export default DiscussMissionPlayersScreen;
