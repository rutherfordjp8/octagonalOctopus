import React from 'react';

class AwaitAssassin extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

      <Stats />

      <Timer />

        <h3> Awaiting Assassin </h3>
        (Shown to non-spy players)
      </div>
      )
  }
}

export default AwaitAssassin;
