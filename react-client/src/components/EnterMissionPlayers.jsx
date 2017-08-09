import React from 'react';

class EnterMissonPlayer extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

      <Stats />

      <Timer />

        <h3> Enter Mission Players </h3>

        Enter the {this.props.missionCount} players that the group has
        decided will go on the mission:

        Appropriate Widget here

        (Shown only to Game owner)
      </div>
      )
  }
}

export default EnterMissonPlayer;
