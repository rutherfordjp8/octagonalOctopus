import React from 'react';

class InfoPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <h5> Info Panel </h5>

        Your role: {this.props.role}

      </div>
      )}
}

export default InfoPanel;
