import React from 'react';

class PlayerWaitingForPlayersScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>

        <h2> Waiting for Players </h2>

          <ul>
        {this.props.players.map((player, index)=>{
          return (<li key={index}>{player}</li>)
        })}
        </ul>

        <p> Patience is a virtue.....</p>

        <button onClick={this.props.leaveButtonClickHandler}>
        {'Leave'}
        </button>

      </div>
      )}
}

export default PlayerWaitingForPlayersScreen;
