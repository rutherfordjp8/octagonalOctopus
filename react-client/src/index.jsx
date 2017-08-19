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
import MissionOutcomeScreen from './components/MissionOutcomeScreen.jsx';
import AwaitAssassinScreen from './components/AwaitAssassinScreen.jsx';
import MerlinChoiceScreen from './components/MerlinChoiceScreen.jsx';
import GameOutcomeScreen from './components/GameOutcomeScreen.jsx';
import InfoPanel from './components/InfoPanel.jsx';
import openSocket from 'socket.io-client';


class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.nextPage = this.nextPage.bind(this);

    this.socket = openSocket();
    //new game created by host

    this.socket.on('newgame', (data)=>{
      this.setState({accessCode: data.accessCode,
                      players: data.allplayers,
                      pageID: 'GameOwnerWaitingForPlayersScreen'
                    });
    });


    this.socket.on('updateState', (data)=>{
      this.setState({roomname: data.roomname,
                    id: data.id})
    });

    //player tryingt to join game
    this.socket.on('newplayer', (data)=>{
      this.setState({players: data.allplayers,
                    accessCode: data.accessCode,
                    pageID: 'PlayerWaitingForPlayersScreen'
                    });
    });

    this.socket.on('playerjoined', (data) => {
      this.setState({players: data.allplayers});
    });

    //host presses start and moves to page where he can enter the names
    this.socket.on('hoststart', (data)=>{
      this.setState({role: data.role,
                    host: true,
                    pageID: 'EnterMissionPlayersScreen',
                    missionSize: data.missionSize
                  });
    }); //FIXME: the server will only send the role, not the username
    // save username when form is submitted

    //players should be moved to the next page after host starts
    this.socket.on('playerstart', (data)=>{
      this.setState({role: data.role,
                      missionSize: data.missionSize,
                      pageID: 'DiscussMissionPlayersScreen'});
    }); //FIXME: the server will only send the role, not the username
    // save username when form is submitted

    //players on mission should go to voting page
    this.socket.on('missionvote', (data)=>{
      this.setState({missionPlayers: data.missionPlayers,
                      pageID: 'MissionVoteScreen'});
    });

    //players not on mission go here i dont need data i just need you to emit to setState
    this.socket.on('nomissionwaiting', (data)=>{
      this.setState({pageID: 'AwaitMissionOutcomeScreen'});
    });

    //send them back to welcome page if they hit back
     this.socket.on('welcome', (data)=>{
      this.setState({pageID: 'WelcomeScreen'});
    });

    //result of mission
    this.socket.on('missionresult', (data)=>{
      var pass = 0;
      var fail = 0;
      data.results.forEach((vote)=>{
        vote ? pass++ : fail++;
      });
      var history = [`${pass} pass ${fail} fail`];


      this.setState({failVotes: fail,
                      successVotes: pass,
                      missionSize: data.missionSize,
                      missionOutcome: this.state.missionOutcome.concat([history]),
                      pageID: 'MissionOutcomeScreen'});
    });

    this.socket.on('pressedleave', (data)=>{
      this.setState({pageID: 'WelcomeScreen'});
    });

    this.socket.on('entermerlin', (data) => {
      this.setState({pageID: 'MerlinChoiceScreen'});
    });

    this.socket.on('waitmerlinchoice', (data) => {
      this.setState({pageID: 'AwaitAssassinScreen'});
    });

    this.socket.on('finaloutcome', (data) => {
      console.log(data, 'data for final outcome');
      // this.setState({pageID: 'finalOutcomeScreen'})
    });

    this.socket.on('merlinfinaloutcome', (data) => {
      console.log(data, 'data for merlin final outcome');
      // this.setState({pageID: 'finalOutcomeScreen'})
    });
    
    this.state = {

      pageID: 'WelcomeScreen',

      players: ['abhi', 'yang', 'rutherford', 'patricks bf'],

      role: '',

      spyCount: 3,

      accessCode: '',

      missionHistory: [null, null, null, null, null],

      missionPlayers: [],  

      missionSize: 3,

      failVotes: 0,

      successVotes: 0,

      host: false,

      username: '',

      missionOutcome: []
            
    };
   
  this.screenDispatch = {

    PlayerEnterNameScreen: ()=> {
      return (
        <PlayerEnterNameScreen
        socket={this.socket}
        />
    )},

    GameOwnerEnterNameScreen: ()=> {

      return (
        <GameOwnerEnterNameScreen
        socket={this.socket}
        />
    )},

    AwaitAssassinScreen: ()=> {

      return (
        <AwaitAssassinScreen
        role={this.state.role}
        missionHistory={this.state.missionHistory}
        spyCount={this.state.spyCount}
        socket={this.socket}
        roomname={this.state.accessCode}
        />
      )},

    AwaitMissionOutcomeScreen: ()=> {

      return (
        <AwaitMissionOutcomeScreen
        role={this.state.role}
        missionHistory={this.state.missionHistory}
        socket={this.socket}
        roomname={this.state.accessCode}
        host={this.state.host}
        />
      )},


    DiscussMissionPlayersScreen: ()=> {
      return (
        <DiscussMissionPlayersScreen
        missionSize={this.state.missionSize}
        role={this.state.role}
        socket={this.socket}
        roomname={this.state.accessCode}
        history={this.state.missionOutcome}
        />
      )},


    EnterMissionPlayersScreen: ()=> {

      return (
        <EnterMissionPlayersScreen
        missionSize={this.state.missionSize}
        role={this.state.role}
        history={this.state.missionOutcome}
        socket={this.socket}
        players={this.state.players}
        roomname={this.state.accessCode}
        />

      )},


    GameOutcomeScreen: ()=> {

      return (

        <GameOutcomeScreen
        role={this.state.role}
        missionHistory={this.state.missionHistory}
        socket={this.socket}
        roomname={this.state.accessCode}
        />
      )},

    GameOwnerWaitingForPlayersScreen: ()=> {

      return (
        <GameOwnerWaitingForPlayersScreen
        accessCode={this.state.accessCode}
        players={this.state.players}
        socket={this.socket}
        roomname={this.state.accessCode}
        />
      )},


    MerlinChoiceScreen: ()=> {

      return (
        <MerlinChoiceScreen
        players={this.state.players}
        role={this.state.role}
        missionHistory={this.state.missionHistory}
        spyCount={this.state.spyCount}
        socket={this.socket}
        roomname={this.state.accessCode}
        />
      )},


    MissionOutcomeScreen: ()=> {

      return (

        <MissionOutcomeScreen
        role={this.state.role}
        history={this.state.missionOutcome}
        failVotes={this.state.failVotes}
        successVotes={this.state.successVotes}
        socket={this.socket}
        roomname={this.state.accessCode}
        nextPage={this.nextPage}
        host = {this.state.host}
        />
      )},


    MissionVoteScreen: ()=> {

      return (
        <MissionVoteScreen
        players={this.players}
        role={this.state.role}
        history={this.state.missionOutcome}
        socket={this.socket}
        roomname={this.state.accessCode}
        missionPlayers = {this.state.missionPlayers}
        />
      )},

    PlayerWaitingForPlayersScreen: ()=> {

      return (
        <PlayerWaitingForPlayersScreen
        players={this.state.players}
        socket={this.socket}
        roomname={this.state.accessCode}
        />
      )},


    WelcomeScreen: ()=> {

      return (
        <WelcomeScreen
        socket={this.socket}
        />
      )}
    }
  }  

  nextPage(pageID) {
    this.setState({pageID})
  }

  render () {
    return (
        <div>
        {this.screenDispatch[this.state.pageID]()}
      </div>)
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
