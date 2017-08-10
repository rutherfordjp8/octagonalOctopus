import React from 'react';

class WelcomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.spyCount = 3 // Needs to be passed down appropriately

  }

  render() {

    return (
      <div>

        <h2> Welcome Screen </h2>
        (Shown to non-spy players)
      </div>
      )
  }
}

export default WelcomeScreen;
