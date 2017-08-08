import React from 'react';

class Stats extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>
      <h6> Stats Panel </h6>

      Your role is {role}

        <MissionHistory />

      Other Knowledge (A component?)
      
      </div>
      )
  }
}

export default Stats;
