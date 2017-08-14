import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import WelcomeScreen from './components/WelcomeScreen.jsx';
import GameOwnerEnterNameScreen from './components/GameOwnerEnterNameScreen.jsx';
import PlayerEnterNameScreen from './components/PlayerEnterNameScreen.jsx';
import PlayerWaitingForPlayersScreen from './components/PlayerWaitingForPlayersScreen.jsx';
import DiscussMissionPlayersScreen from './components/DiscussMissionPlayersScreen.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      pageID: 'DiscussMissionPlayersScreen',

      //pageID: 'EnterMissionPlayersScreen',
      //pageID: 'GameOutcomeScreen',
      //pageID: 'MerlinChoiceScreen',
      //pageID: 'MissionOutcomeScreen',
      //pageID: 'MissionVoteScreen',
      //pageID: 'AwaitAssassinScreen',
      //pageID: 'AwaitMissionOutcomeScreen',
      //pageID: 'GameOwnerWaitingForPlayersScreen',



      //pageID: 'WelcomeScreen',
      //pageID: 'GameOwnerEnterNameScreen',
      //pageID: 'PlayerEnterNameScreen',
      //pageID: 'PlayerWaitingForPlayersScreen',
      //pageID: 'DiscussMissionPlayersScreen',


      // State like things that don't exist on the app's first render,
      // but depend on a a Game having been created, joined by
      // players, and started.
      players: [],
      role: 'Merlin',
      otherCharInfo: {},
      spyCount: 3,

      roundsHistory: [null, null, null, null, null],

      missionParticipation: [],

      // I presume that this will be sent over by the server for each
      // round in state via sockets. Adopting a hard coded value to move fwd
      missionSize: 3,

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

      DiscussMissionPlayersScreen: function(pObj) {
        return (
            <DiscussMissionPlayersScreen
          missionSize={pObj['missionSize'] }
            />
        )
      },

      EnterMissionPlayersScreen: function(pObj) { return 'MissionPlayersScreen' + pObj['thing'] },
      GameOutcomeScreen: function(pObj) { return 'GameOutocomeScreen' + pObj['thing'] },

      GameOwnerEnterNameScreen: function(pObj) {
        return (
            <GameOwnerEnterNameScreen
          createButtonClickHandler={pObj.createButtonClickHandler}
          backButtonClickHandler={pObj.backButtonClickHandler}
            />
        )
      },

      GameOwnerWaitingForPlayersScreen: function(pObj) { return 'GameOwnerWaitPlayers' + pObj['code'] },
      MerlinChoiceScreen: function(pObj) { return 'MerlinChoiceScreen' + pObj['thing'] },
      MissionOutcomeScreen: function(pObj) { return 'MissionOutcomeScreen' + pObj['thing'] },
      MissionVoteScreen: function(pObj) { return 'MissionVoteScreen' + pObj['thing'] },
      PlayerEnterNameScreen: function(pObj) {
        return (
            <PlayerEnterNameScreen
          backButtonClickHandler={pObj.backButtonClickHandler}
          joinButtonClickHandler={pObj.joinButtonClickHandler}
            />
        )},

      PlayerWaitingForPlayersScreen: function(pObj) {
        return (
            <PlayerWaitingForPlayersScreen
          leaveButtonClickHandler={pObj.leaveButtonClickHandler}
            />

        )},

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
      'DiscussMissionPlayersScreen': {'missionSize':this.state.missionSize},
      'EnterMissionPlayersScreen': {thing: 888888},
      'GameOutcomeScreen': {thing: 'tttt'},

      'GameOwnerEnterNameScreen': {
        createButtonClickHandler:this.handleCreateButtonClick,
        backButtonClickHandler:this.handleBackButtonClick,
      },

      'GameOwnerWaitingForPlayersScreen': {code: 'kdjfkjfd'},
      'MerlinChoiceScreen': {thing: 39},
      'MissionOutcomeScreen': {thing:'Orange'},
      'MissionVoteScreen': {thing:'Apple'},

      'PlayerEnterNameScreen':  {
        backButtonClickHandler:this.handleBackButtonClick,
        joinButtonClickHandler:this.handleJoinButtonClick
      },

      'PlayerWaitingForPlayersScreen': {
        leaveButtonClickHandler: this.handleLeaveButtonClick,
      },

      'WelcomeScreen': {
        newButtonClickHandler:this.handleNewButtonClick,
        joinButtonClickHandler:this.handleJoinButtonClick
      }
    }

    this.handleNewButtonClick = this.handleNewButtonClick.bind(this);
    this.handleJoinButtonClick = this.handleJoinButtonClick.bind(this);
    this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleLeaveButtonClick = this.handleLeaveButtonClick.bind(this);
    this.handleLeaveButtonClick = this.handleLeaveButtonClick.bind(this);

  }

  handleNewButtonClick() {console.log("I CAN HAZ NEW CLICKS") };
  handleJoinButtonClick() {console.log("I CAN HAZ JOIN CLICKS") };
  handleCreateButtonClick() {console.log("I CAN HAZ CREATE CLICKS") };
  handleBackButtonClick() {console.log("I CAN HAZ BACK CLICKS") };
  handleLeaveButtonClick() {console.log("I CAN HAZ LEAVE CLICKS") };


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
