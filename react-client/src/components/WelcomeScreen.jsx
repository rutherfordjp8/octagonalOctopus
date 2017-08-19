import React from 'react';
import GameOwnerEnterNameScreen from './GameOwnerEnterNameScreen.jsx';
import PlayerEnterNameScreen from './PlayerEnterNameScreen.jsx';

class WelcomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {page: 'welcome'};
    this.player = this.player.bind(this);
    this.host = this.host.bind(this);
    this.pageSelector =this.pageSelector.bind(this);
    this.goBack = this.goBack.bind(this);
  }


  player(){
    this.setState({page:'join'});
    }

    host(){
      this.setState({page:'newgame'});
    }

    goBack(){
      this.setState({page: 'welcome'});
    }

    pageSelector(key) {
      var pages = {welcome: (<div id='welcomeScreen'>
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
        <div className="welcomeScreenInput">
          <button onClick={this.host} >
            New Game
          </button>

          <button onClick={this.player} >
            Join
          </button>
        </div>
      </div>
    ),
    newgame: (<GameOwnerEnterNameScreen
        socket={this.props.socket}
        back={this.goBack}
        />),
    join: (<PlayerEnterNameScreen
        socket={this.props.socket}
        back={this.goBack}
        />)
      }
    return pages[key];
    }


  render() {
    return (
      <div>
      {this.pageSelector(this.state.page)}
      </div>
    )}
}

export default WelcomeScreen;
