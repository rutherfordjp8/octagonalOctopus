import React from 'react';

class DiscussMissionPlayers extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

      <Stats />

      <Timer />

        <h3> Discuss Mission Players </h3>
        (Shown to all players except for game owner)
      </div>
      )
  }
}

export default DiscussMissionPlayers;
