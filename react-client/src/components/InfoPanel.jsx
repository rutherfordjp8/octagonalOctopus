import React from 'react';

import MissionHistory from './MissionHistory.jsx';

class InfoPanel extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>
        <h5> Info Panel </h5>

        Your role: {this.props.role}

        <MissionHistory missionHistory={this.props.missionHistory}/>

        Other Knowledge (A component?)

      </div>
      )}
}

export default InfoPanel;
