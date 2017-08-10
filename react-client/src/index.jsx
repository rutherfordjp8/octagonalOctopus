import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      // pageID: 'PlayerWaitingForPlayersScreen'

      

      // pageID: // DiscussMissionPlayersScreen
      // pageID: // EnterMissionPlayersScreen
      // pageID: // GameOutcomeScreen

      // pageID: // MerlinChoiceScreen
      // pageID: // MissionOutcomeScreen
      // pageID: // MissionVoteScreen
      
      
      pageID: 'AwaitAssassinScreen',
      //pageID: 'AwaitMissionOutcomeScreen', //works
      //pageID: 'PlayerWaitingForPlayersScreen', //works
      //pageID: 'PlayerEnternameScreen', // Works
      //pageID: 'GameOwnerWaitingForPlayersScreen', // Works
      //pageID: 'WelcomeScreen', // Works
      //pageID: 'GameOwnerEnterNameScreen',  // Works

      // State like things that don't exist on the app's first render,
      // but depend on a a Game having been created, joined by
      // players, and started.
      players: [],
      role: 'Merlin',
      otherCharInfo: {},
      spyCount: 3,

      roundsHistory: [null, null, null, null, null],

      missionParticipation: [],
    }

  // An object that contains the render functions for the various
  // screens as values. With this and the corresponding propsDispatch
  // object, the server can send to the app a single string (one of
  // the keys of these two objects) and the App render function can
  // then simply call the function that is the value of the one object
  // with the props of the other.
    this.screenDispatch = {
       AwaitAssassinScreen: function(pObj) {return 'AwaitAssassin +spyCount=' + pObj.spyCount },
       AwaitMissionOutcomeScreen: function(pObj) {return 'AwaitMissionOutcome' + pObj.role + pObj.history },

//       // DiscussMissionPlayersScreen: (propsObj) => {},
//       // EnterMissionPlayersScreen: (propsObj) => {},
//       // GameOutcomeScreen: (propsObj) => {},
       GameOwnerEnterNameScreen: function(pObj) { return 'GameOwnerEntername' + pObj['thing'] },
       GameOwnerWaitingForPlayersScreen: function(pObj) { return 'GameOwnerWaitPlayers' + pObj['code'] },
//       // MerlinChoiceScreen: (propsObj) => {},
//       // MissionOutcomeScreen: (propsObj) => {},
//       // MissionVoteScreen: (propsObj) => {},
       PlayerEnternameScreen: function(pObj) { return 'PlayerEntername' + pObj['thing'] },
       PlayerWaitingForPlayersScreen: function(pObj) { return 'PlayerWaitForPlayers' + pObj['button'] },
      WelcomeScreen: function(pObj) { return 'WELCOME' + pObj['thing'] },
    }

    this.propsDispatch = {
      'AwaitAssassinScreen': {spyCount:this.state.spyCount},
      'AwaitMissionOutcomeScreen': {role:this.state.role, history:this.state.roundsHistory },
      // // DiscussMissionPlayersScreen:
      // // EnterMissionPlayersScreen:
      // // GameOutcomeScreen:
      'GameOwnerEnterNameScreen': {thing:'Stuff'},
      'GameOwnerWaitingForPlayersScreen': {code: 'kdjfkjfd'},
      // // MerlinChoiceScreen:
      // // MissionOutcomeScreen:
      // // MissionVoteScreen:
      'PlayerEnternameScreen':  {thing:'Fruit'},
      'PlayerWaitingForPlayersScreen': {button: 'rrr'},
      'WelcomeScreen': {thing:'People'}
    }
  }

  componentDidMount() {
  }

  render () {

    return (
        <div>
        {this.screenDispatch[this.state.pageID](this.propsDispatch[this.state.pageID])}
        </div>)
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
