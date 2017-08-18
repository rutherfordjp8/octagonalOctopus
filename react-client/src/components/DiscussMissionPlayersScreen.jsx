import React from 'react';

import InfoPanel from './InfoPanel.jsx';

class DiscussMissionPlayersScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

        <h3> Discuss Which {this.props.missionSize} Players to Send on the Mission </h3>

        <InfoPanel role={this.props.role} missionHistory={this.props.missionHistory} />


      </div>
      )}
}

export default DiscussMissionPlayersScreen;
