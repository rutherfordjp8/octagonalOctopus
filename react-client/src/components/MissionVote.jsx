import React from 'react';

class MissonVote extends React.Component {

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

        <h3> Mission Vote </h3>
        You are on a mission with {players} Nice prompt here

        <FailButton /> <PassButton />
        (Shown only to players on the Mission)
      </div>
      )
  }
}

export default MissonVote
