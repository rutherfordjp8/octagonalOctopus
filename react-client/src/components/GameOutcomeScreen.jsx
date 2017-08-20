import React from 'react';
var _ = require('lodash');

import MissionHistory from './MissionHistory.jsx';


class GameOutcomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.merlinchoice, '******* merlin choice');
    console.log(this.props.gameresult, '****** game result');
    var result;
      if(this.props.merlinchoice === null) {
        if(this.props.gameresult) {
          result = ( <p>GOOD GUYS WIN!</p>)
        } else {
          result = <p>SPIES WIN!!</p>
        }
      } else if (this.props.merlinchoice === true) {
        result = <p>SPIES WIN!!</p>
      } else {
        result = <p>GOOD GUYS WIN!!</p>
      }


    return (

      <div>

        <h5> Game Outcome  </h5>

        <MissionHistory missionHistory={this.props.history}/>

        <div>{result}</div>


       <ul>
        {_.map(this.props.playermap, (role, user)=>{
          return (<li>{user} - {role}</li>)
        })
       }
       </ul>

      

        <button onClick={this.props.againButtonClickHandler}>
        {'Play Again'}
        </button>

      </div>
      )}
}

export default GameOutcomeScreen;
