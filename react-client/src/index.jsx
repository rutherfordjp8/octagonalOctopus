import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import WelcomeScreen from './components/WelcomeScreen.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      pageID: 'WelcomeScreen',

      //pageID: 'PlayerWaitingForPlayersScreen',
      //pageID: 'DiscussMissionPlayersScreen',
      //pageID: 'EnterMissionPlayersScreen',
      //pageID: 'GameOutcomeScreen',
      //pageID: 'MerlinChoiceScreen',
      //pageID: 'MissionOutcomeScreen',
      //pageID: 'MissionVoteScreen',
      //pageID: 'AwaitAssassinScreen',
      //pageID: 'AwaitMissionOutcomeScreen',
      //pageID: 'PlayerWaitingForPlayersScreen',
      //pageID: 'PlayerEnternameScreen',
      //pageID: 'GameOwnerWaitingForPlayersScreen',
      //pageID: 'WelcomeScreen',
      //pageID: 'GameOwnerEnterNameScreen',

      // State like things that don't exist on the app's first render,
      // but depend on a a Game having been created, joined by
      // players, and started.
      players: [],
      role: 'Merlin',
      otherCharInfo: {},
      spyCount: 3,

      roundsHistory: [null, null, null, null, null],

      missionParticipation: [],

      // Work out if to have different click handling functions or if dispatch within one
      // newButtonClickHandler: this.handleButtonClick,
      // joinButtonClickHandler: this.handleButtonClick,
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

      DiscussMissionPlayersScreen: function(pObj) { return 'DiscussMissionPlayersScreen' + pObj['thing'] },
      EnterMissionPlayersScreen: function(pObj) { return 'MissionPlayersScreen' + pObj['thing'] },
      GameOutcomeScreen: function(pObj) { return 'GameOutocomeScreen' + pObj['thing'] },
      GameOwnerEnterNameScreen: function(pObj) { return 'GameOwnerEntername' + pObj['thing'] },
      GameOwnerWaitingForPlayersScreen: function(pObj) { return 'GameOwnerWaitPlayers' + pObj['code'] },
      MerlinChoiceScreen: function(pObj) { return 'MerlinChoiceScreen' + pObj['thing'] },
      MissionOutcomeScreen: function(pObj) { return 'MissionOutcomeScreen' + pObj['thing'] },
      MissionVoteScreen: function(pObj) { return 'MissionVoteScreen' + pObj['thing'] },
      PlayerEnternameScreen: function(pObj) { return 'PlayerEntername' + pObj['thing'] },
      PlayerWaitingForPlayersScreen: function(pObj) { return 'PlayerWaitForPlayers' + pObj['button'] },

      WelcomeScreen: function(pObj) {
        return (
            <WelcomeScreen
          newButtonClickHandler={pObj.newButtonClickHandler}
          joinButtonClickHandler={pObj.joinButtonClickHandler}
            />
        )},
    }

    this.propsDispatch = {
      'AwaitAssassinScreen': {spyCount:this.state.spyCount},
      'AwaitMissionOutcomeScreen': {role:this.state.role, history:this.state.roundsHistory },
      'DiscussMissionPlayersScreen': {thing:1000},
      'EnterMissionPlayersScreen': {thing: 888888},
      'GameOutcomeScreen': {thing: 'tttt'},
      'GameOwnerEnterNameScreen': {thing:'Stuff'},
      'GameOwnerWaitingForPlayersScreen': {code: 'kdjfkjfd'},
      'MerlinChoiceScreen': {thing: 39},
      'MissionOutcomeScreen': {thing:'Orange'},
      'MissionVoteScreen': {thing:'Apple'},
      'PlayerEnternameScreen':  {thing:'Fruit'},
      'PlayerWaitingForPlayersScreen': {button: 'rrr'},
      'WelcomeScreen': {
        newButtonClickHandler:this.handleNewButtonClick,
        joinButtonClickHandler:this.handleJoinButtonClick
      }
    }

    this.handleNewButtonClick = this.handleNewButtonClick.bind(this);
    this.handleJoinButtonClick = this.handleJoinButtonClick.bind(this);

  }

  handleNewButtonClick() {console.log("I CAN HAZ NEW CLICKS") };
  handleJoinButtonClick() {console.log("I CAN HAZ JOIN CLICKS") };

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
