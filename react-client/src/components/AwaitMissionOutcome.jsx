import React from 'react';

class AwaitMissionOutcome extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

      <Stats />

      <Timer seconds={30}/>

        <h3> Awaiting Mission Outcome </h3>
        (Shown to all players not on the mission. As players vote, they
        are taken here. Except the last to vote, which triggers all
        players being sent to the MissionOutcome page)
      </div>
      )
  }
}

export default AwaitMissionOutcome;
