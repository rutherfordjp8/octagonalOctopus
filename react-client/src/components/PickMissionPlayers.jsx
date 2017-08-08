import React from 'react';

class PickMissonPlayer extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    players = []// Right array from props, but also rendered nicely as
                // a string with the Oxford coma if more than two
                // others (can there be missions of size 4?)

    return (
      <div>

      <Stats />

      <Timer />

        <h3> Pick Mission Players </h3>

        Pick k players to go:

        Appropriate Widget here

        (Shown only to Game owner)
      </div>
      )
  }
}

export default PickMissonPlayer;
