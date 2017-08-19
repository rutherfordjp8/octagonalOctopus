import React from 'react';

class GameOwnerWaitingForPlayersScreen extends React.Component {

  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.props.socket.emit('start game', {roomname: this.props.accessCode});
  }

  leaveGame() {
    console.log('should emit disconnect');
    this.props.socket.emit('disconnect', 'can we just kick him out of the room??');
  }



  render() {

    return (
      <div id="gameOwnerWaitingForPlayersScreen">

        <h2> Waiting for Players </h2>

        <p id="accessCode">
        Access Code: {this.props.accessCode}
        </p>
        <ul>
        {this.props.players.map((player, index)=>{
          return (<li key={index}>{player}</li>)
        })}
        </ul>

        <p className="waitMessage"> Patience is a virtue.....</p>
        <div className="gameOwnerWaitingForPlayersScreenInput">
          <button onClick={this.leaveGame}>
            {'Leave'}
          </button>


          <button onClick={this.startGame}>
            {'Start'}
          </button>
        </div>

      </div>
    )
  }
}

export default GameOwnerWaitingForPlayersScreen;
