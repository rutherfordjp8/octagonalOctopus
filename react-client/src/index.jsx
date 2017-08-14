import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import WelcomeScreen from './components/WelcomeScreen.jsx';
import GameOwnerEnterNameScreen from './components/GameOwnerEnterNameScreen.jsx';
import PlayerEnterNameScreen from './components/PlayerEnterNameScreen.jsx';
import GameOwnerWaitingForPlayersScreen from './components/GameOwnerWaitingForPlayersScreen.jsx';
import PlayerWaitingForPlayersScreen from './components/PlayerWaitingForPlayersScreen.jsx';
import DiscussMissionPlayersScreen from './components/DiscussMissionPlayersScreen.jsx';
import EnterMissionPlayersScreen from './components/EnterMissionPlayersScreen.jsx';
import MissionVoteScreen from './components/MissionVoteScreen.jsx';
import AwaitMissionOutcomeScreen from './components/AwaitMissionOutcomeScreen.jsx';
import AwaitAssassinScreen from './components/AwaitAssassinScreen.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      pageID: 'AwaitAssassinScreen',


      //pageID: 'GameOutcomeScreen',
      //pageID: 'MerlinChoiceScreen',
      //pageID: 'MissionOutcomeScreen',

      //pageID: 'WelcomeScreen',
      //pageID: 'GameOwnerEnterNameScreen',
      //pageID: 'PlayerEnterNameScreen',
      //pageID: 'GameOwnerWaitingForPlayersScreen',
      //pageID: 'PlayerWaitingForPlayersScreen',
      //pageID: 'DiscussMissionPlayersScreen',
      //pageID: 'EnterMissionPlayersScreen',
      //pageID: 'MissionVoteScreen',
      //pageID: 'AwaitMissionOutcomeScreen',
      //pageID: 'AwaitAssassinScreen',

      // State like things that don't exist on the app's first render,
      // but depend on a Game having been created, joined by
      // players, and started.
      players: ['Sam', 'Pat', 'Chris'],
      role: 'Merlin',

      // The nature of the other character info depends on game
      // knowledge I lack. Discuss with those who know the fame. // FixMe
      otherCharInfo: {},

      // Hard coded value for development. Should come from the server
      // in an actual game // FixMe
      spyCount: 3,

      // Conforms to current pattern in the server
      // helper-functions.generateToken (should be passed in from the
      // server via a socket; for now, hard coded.) // FixMe
      accessCode: '8jsi7s',

      missionHistory: [true, false, true, null, null], // FixMe

      missionPlayers: [],  // FixMe

      // I presume that this will be sent over by the server for each
      // round in state via sockets. Adopting a hard coded value to move fwd
      // Also, not loving the variable name. // FixMe
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

      AwaitAssassinScreen: function(pObj) {

        return (
            <AwaitAssassinScreen
          role={pObj['role']}
          missionHistory={pObj['missionHistory']}
          spyCount={pObj['spyCount']}
            />
        )},


      AwaitMissionOutcomeScreen: function(pObj) {

        return (
            <AwaitMissionOutcomeScreen
          role={pObj['role']}
          missionHistory={pObj['missionHistory']}
            />
        )},


      DiscussMissionPlayersScreen: function(pObj) {
        return (
            <DiscussMissionPlayersScreen
          missionSize={pObj['missionSize']}
          role={pObj['role']}
          missionHistory={pObj['missionHistory']}
            />
        )},


      EnterMissionPlayersScreen: function(pObj) {

        return (

            <EnterMissionPlayersScreen
          missionSize={pObj['missionSize']}
          role={pObj['role']}
          missionHistory={pObj['missionHistory']}
            />

        )},


      GameOutcomeScreen: function(pObj) { return 'GameOutocomeScreen' + pObj['thing'] },


      GameOwnerEnterNameScreen: function(pObj) {
        return (
            <GameOwnerEnterNameScreen
          createButtonClickHandler={pObj.createButtonClickHandler}
          backButtonClickHandler={pObj.backButtonClickHandler}
            />
        )},


      GameOwnerWaitingForPlayersScreen: function(pObj) {

        return (
            <GameOwnerWaitingForPlayersScreen
          leaveButtonClickHandler={pObj.leaveButtonClickHandler}
          startButtonClickHandler={pObj.startButtonClickHandler}
          accessCode={pObj.accessCode}
            />
        )},


      MerlinChoiceScreen: function(pObj) { return 'MerlinChoiceScreen' + pObj['thing'] },


      MissionOutcomeScreen: function(pObj) { return 'MissionOutcomeScreen' + pObj['thing'] },


      MissionVoteScreen: function(pObj) {
        return (
            <MissionVoteScreen
          players={pObj.players}
          role={pObj['role']}
          missionHistory={pObj['missionHistory']}
          failMissionButtonClickHandler={pObj['failMissionButtonClickHandler']}
          passMissionButtonClickHandler={pObj['passMissionButtonClickHandler']}
            />
        )},


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
      'AwaitAssassinScreen': {
        'spyCount':this.state.spyCount,
        'role':this.state.role,
        'missionHistory':this.state.missionHistory,
      },

      'AwaitMissionOutcomeScreen': {
        'role':this.state.role,
        'missionHistory':this.state.missionHistory,
      },

      'DiscussMissionPlayersScreen': {
        'missionSize':this.state.missionSize,
        'role':this.state.role,
        'missionHistory':this.state.missionHistory
      },

      'EnterMissionPlayersScreen': {
        'missionSize':this.state.missionSize,
        'role':this.state.role,
        'missionHistory':this.state.missionHistory
      },

      'GameOutcomeScreen': {thing: 'tttt'},

      'GameOwnerEnterNameScreen': {
        createButtonClickHandler:this.handleCreateButtonClick,
        backButtonClickHandler:this.handleBackButtonClick,
      },

      'GameOwnerWaitingForPlayersScreen': {
        accessCode: this.state.accessCode,
        leaveButtonClickHandler: this.handleLeaveButtonClick,
        startButtonClickHandler: this.handleStartButtonClick,
      },

      'MerlinChoiceScreen': {thing: 39},
      'MissionOutcomeScreen': {thing:'Orange'},
      'MissionVoteScreen': {
        players: this.state.players,
        'role':this.state.role,
        'missionHistory':this.state.missionHistory,
        failMissionButtonClickHandler:this.handleFailMissionButtonClick,
        passMissionButtonClickHandler:this.handlePassMissionButtonClick,
      },

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
    this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
    this.handleFailMissionButtonClick = this.handleFailMissionButtonClick.bind(this);
    this.handlePassMissionButtonClick = this.handlePassMissionButtonClick.bind(this);

  }

  handleNewButtonClick() {console.log("I CAN HAZ NEW CLICKS") };
  handleJoinButtonClick() {console.log("I CAN HAZ JOIN CLICKS") };
  handleCreateButtonClick() {console.log("I CAN HAZ CREATE CLICKS") };
  handleBackButtonClick() {console.log("I CAN HAZ BACK CLICKS") };
  handleLeaveButtonClick() {console.log("I CAN HAZ LEAVE CLICKS") };
  handleStartButtonClick() {console.log("I CAN HAZ START CLICKS") };
  handleFailMissionButtonClick() {console.log("I CAN HAZ FAIL CLICKS") };
  handlePassMissionButtonClick() {console.log("I CAN HAZ PASS CLICKS") };


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
