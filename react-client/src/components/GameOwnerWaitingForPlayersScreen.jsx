import React from 'react';

class GameOwnerWaitingForPlayersScreen extends React.Component {

  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.props.socket.emit('hostpressedstart', 'please start game');
  }

  leaveGame() {
    this.props.socket.emit('disconnect', 'can we just kick him out of the room??');
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

        <button onClick={this.leaveGame}>
        {'Leave'}
        </button>

        <button onClick={this.startGame}>
        {'Start'}
        </button>

      </div>
      )}
}

export default GameOwnerWaitingForPlayersScreen;
