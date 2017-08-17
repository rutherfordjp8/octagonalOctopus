import React from 'react';
import GameOwnerEnterNameScreen from './GameOwnerEnterNameScreen.jsx';
import PlayerEnterNameScreen from './PlayerEnterNameScreen.jsx';
class WelcomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {page: 'Start'};
    this.player = this.player.bind(this);
    this.host = this.host.bind(this);
    this.PlayerEnterNameScreen = this.PlayerEnterNameScreen.bind(this);
    this.GameOwnerEnterNameScreen = this.GameOwnerEnterNameScreen.bind(this);
    
  }

  PlayerEnterNameScreen() {

    return (
    <PlayerEnterNameScreen
    backButtonClickHandler={this.backButtonClickHandler}
    joinButtonClickHandler={this.joinButtonClickHandler}
    submitButtonClickHandler={this.submitButtonClickHandler}
    getuserinfo={this.submitUserInfo}
      />
  )}

  GameOwnerEnterNameScreen() {

        return (
            <GameOwnerEnterNameScreen
            socket={this.props.socket}
          createButtonClickHandler={this.createButtonClickHandler}
          backButtonClickHandler={this.backButtonClickHandler}
          hostsubmit={this.hostSubmit}
            />
          
        )}

  player(){
    this.setState({page: 'PlayerEnterNameScreen'});
    }

    host(){
      this.setState({page: 'GameOwnerEnterNameScreen'})
    }

  Start() {
    return(
    <div>
     <h2> Welcome to Definitely Not Avalon </h2>

        <p>
            Clicking 'New Game' will make you the owner of a game and
            you will get a short code to give to your friends so that
            they can join your game.
        </p>

        <p>
            Clicking 'Join' will take you to a screen where you can
            enter a short code given to you by the owner of a game to
            join that game.
        </p>

        <button onClick={this.host}>
        {'New Game'}
        </button>

        <button onClick={this.player}>
        {'Join'}
        </button>
        </div>
        )
  }  


  render() {

    return (
      <div>
      {this[this.state.page]()} 
      </div>
    )}
}

export default WelcomeScreen;
