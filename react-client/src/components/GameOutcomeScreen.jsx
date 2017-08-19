import React from 'react';
var _ = require('lodash');

import MissionHistory from './MissionHistory.jsx';


class GameOutcomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var result;
      if(!this.props.merlinchoice) {
        if(this.props.gameresult) {
          result = ( <p>GOOD GUYS WIN!</p>)
        } else {
          result = <p>SPIES WIN!!</p>
        }
      } else {
        result = <p>SPIES WIN!!</p>
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
