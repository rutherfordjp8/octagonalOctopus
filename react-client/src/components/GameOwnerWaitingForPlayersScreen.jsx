import React from 'react';

class GameOwnerWaitingForPlayersScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>

        <h2> Waiting for Players </h2>

        <p>
        Access Code: {this.props.accessCode}
        </p>
        <ul>
        {this.props.players.map((player, index)=>{
          return (<li key={index}>{player}</li>)
        })}
        </ul>
        
        <p> Patience is a virtue.....</p>

        <button onClick={this.props.leaveButtonClickHandler}>
        {'Leave'}
        </button>

        <button onClick={this.props.startButtonClickHandler}>
        {'Start'}
        </button>

      </div>
      )}
}

export default GameOwnerWaitingForPlayersScreen;
