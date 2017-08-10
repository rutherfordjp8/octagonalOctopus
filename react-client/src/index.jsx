import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      pageID: 'PlayerWaitingForPlayersScreen',

      // State like things that don't exist on the app's first render,
      // but depend on a a Game having been created, joined by
      // players, and started.
      players: [],
      role: undefined,
      otherCharInfo: {},
      spyCount: 0,

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
      AwaitAssassinScreen: function(propsObj) {return '<AwaitAssassin spyCount={propsObj.spyCount} />'},
      // AwaitMissionOutcomeScreen: (propsObj) => {},
      // DiscussMissionPlayersScreen: (propsObj) => {},
      // EnterMissionPlayersScreen: (propsObj) => {},
      // GameOutcomeScreen: (propsObj) => {},
      GameOwnerEnterNameScreen: function(pObj) { return 'GameOwnerEntername' + pObj['thing'] },
      GameOwnerWaitingForPlayersScreen: function(pObj) { return 'GameOwnerWaitPlayers' + pObj['code'] },
      // MerlinChoiceScreen: (propsObj) => {},
      // MissionOutcomeScreen: (propsObj) => {},
      // MissionVoteScreen: (propsObj) => {},
      PlayerEnternameScreen: function(pObj) { return 'PlayerEntername' + pObj['thing'] },
      PlayerWaitingForPlayersScreen: function(pObj) { return 'PlayerWaitForPlayers' + pObj['button'] },
//      WelcomeScreen: function(pObj) { return "WELCOME" + pObj },
      WelcomeScreen: function(pObj) { return 'WELCOME' + pObj['thing'] },
    }


    this.propsDispatch = {
      'AwaitAssassinScreen': {spyCount:this.state.spyCount},
      // AwaitMissionOutcomeScreen:
      // DiscussMissionPlayersScreen:
      // EnterMissionPlayersScreen:
      // GameOutcomeScreen:
      'GameOwnerEnterNameScreen': {thing:'Stuff'},
      'GameOwnerWaitingForPlayersScreen': {code: 'kdjfkjfd'},
      // MerlinChoiceScreen:
      // MissionOutcomeScreen:
      // MissionVoteScreen:
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
