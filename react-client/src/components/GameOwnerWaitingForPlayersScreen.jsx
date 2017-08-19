import React from 'react';

class GameOwnerWaitingForPlayersScreen extends React.Component {

  constructor(props) {
    super(props);
    this.startButtonClickHandler = this.startButtonClickHandler.bind(this);
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

        <button onClick={this.startButtonClickHandler}>
        {'Start'}
        </button>

      </div>
    )
  }

  startButtonClickHandler() {
    this.props.socket.emit('start game', {roomname: this.props.accessCode});
  }
}

export default GameOwnerWaitingForPlayersScreen;
