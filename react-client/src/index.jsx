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

    this.socket = openSocket();
    //new game created by host

    this.socket.on('newgame', (data)=>{
      this.setState({roomname: data.roomname,
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
                    pageID: 'PlayerWaitingForPlayersScreen'
                    });
    });

    //host presses start and moves to page where he can enter the names
    this.socket.on('hoststart', (data)=>{
      var arr = Object.keys(data.playerroles);
      this.setState({role: arr[0],
                      username: data.playerroles.role,
                      pageID: 'EnterMissionPlayersScreen'});
    });

    //players should be moved to the next page after host starts
    this.socket.on('playerstart', (data)=>{

      var arr = Object.keys(data.playerroles);

      this.setState({role: arr[0],
                      username: data.playerroles.role,
                      pageID: 'DiscussMissionPlayersScreen'});
    });

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
                      missionOutcome: this.state.missionOutcome.concat([history]),
                      pageID: 'MissionOutcomeScreen'});
    });

    this.socket.on('pressedleave', (data)=>{
      this.setState({pageID: 'WelcomeScreen'});
    });
    
    this.state = {

      pageID: 'MerlinChoiceScreen',

      players: ['abhi', 'yang', 'rutherford', 'patricks bf'],
      role: '',

      spyCount: 3,

      accessCode: '',

      missionHistory: [true, false, true, null, null],

      missionPlayers: ['abhi', 'yang', 'rutherford', 'patricks bf'],  

      missionSize: 3,

      failVotes: 0,

      successVotes: 0,

      roomname: '',

      host: false,

      username: '',

      missionOutcome: [['2 pass and 1 fail']]
            
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
        roomname={this.state.roomname}
        />
      )},

    AwaitMissionOutcomeScreen: ()=> {

      return (
        <AwaitMissionOutcomeScreen
        role={this.state.role}
        missionHistory={this.state.missionHistory}
        socket={this.socket}
        roomname={this.state.roomname}
        />
      )},


    DiscussMissionPlayersScreen: ()=> {
      return (
        <DiscussMissionPlayersScreen
        missionSize={this.state.missionSize}
        role={this.state.role}
        socket={this.socket}
        roomname={this.state.roomname}
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
        roomname={this.state.roomname}
        />

      )},


    GameOutcomeScreen: ()=> {

      return (

        <GameOutcomeScreen
        role={this.state.role}
        missionHistory={this.state.missionHistory}
        socket={this.socket}
        roomname={this.state.roomname}
        />
      )},

    GameOwnerWaitingForPlayersScreen: ()=> {

      return (
        <GameOwnerWaitingForPlayersScreen
        accessCode={this.state.accessCode}
        players={this.state.players}
        socket={this.socket}
        roomname={this.state.roomname}
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
        roomname={this.state.roomname}
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
        roomname={this.state.roomname}
        />
      )},


    MissionVoteScreen: ()=> {

      return (
        <MissionVoteScreen
        players={this.players}
        role={this.state.role}
        history={this.state.missionOutcome}
        socket={this.socket}
        roomname={this.state.roomname}
        missionPlayers = {this.state.missionPlayers}
        />
      )},

    PlayerWaitingForPlayersScreen: ()=> {

      return (
        <PlayerWaitingForPlayersScreen
        players={this.state.players}
        socket={this.socket}
        roomname={this.state.roomname}
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


  render () {
    return (
        <div>
        {this.screenDispatch[this.state.pageID]()}
      </div>)
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
