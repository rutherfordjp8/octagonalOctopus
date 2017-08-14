import React from 'react';

class InfoPanel extends React.Component {

  constructor(props) {
    super(props);

    this.otherCharInfo = props.otherCharInfo;
  }

  render() {

    return (
      <div>
      <h6> Info Panel </h6>

      Your role is {this.props.role}

        <MissionHistory history={this.props.missionHistory}/>

      Other Knowledge (A component?)
      
      </div>
      )
  }
}

export default InfoPanel;
