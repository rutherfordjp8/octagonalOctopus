import React from 'react';

import InfoPanel from './InfoPanel.jsx';
import MissionHistory from './MissionHistory.jsx';

class EnterMissonPlayersScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selected: []};
    this.selectedForMission = this.selectedForMission.bind(this);
    this.sendNames = this.sendNames.bind(this);
  }

  render() {
    return (
      <div>

        <h3> Decide who Goes on the Mission </h3>

        <InfoPanel role={this.props.role}  />
        
        <MissionHistory missionHistory={this.props.history}  />

        <h5>
        Discuss Which {this.props.missionSize} Players to Send on the Mission and enter the results:
        </h5>

        <ul>
        {this.props.players.map((player, index)=>{
          return (<li key={index}>{player} <label><input onClick={this.selectedForMission} type='radio' value={player}/>Select</label></li>)
        })}

        </ul>
        <button onClick={this.sendNames}> Submit Players </button>
      </div>
      )}

  selectedForMission(event) {
    this.setState({selected: this.state.selected.concat([event.target.value])});
  }

  sendNames(){
    this.props.socket.emit('missionparticipants', {participants: this.state.selected, 
                                        roomname: this.props.roomname});
  }
}

export default EnterMissonPlayersScreen;
