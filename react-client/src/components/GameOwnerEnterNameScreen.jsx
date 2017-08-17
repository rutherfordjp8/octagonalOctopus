import React from 'react';
import GameOwnerWaitingForPlayersScreen from './GameOwnerWaitingForPlayersScreen.jsx';

class GameOwnerEnterNameScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nameFormValue: '',
      pageID: 'now'
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.gettingHostUsername = this.gettingHostUsername.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
  }
  componentDidMount(){
    this.props.socket.on('sendingback', (data)=>{
      this.setState({pageID: 'later'});
    })
  }

  handleNameChange(event) {
    this.setState({nameFormValue: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  gettingHostUsername(event){
    this.props.hostsubmit({username: this.state.nameFormValue});
  }

  sendMsg(){
    this.props.socket.emit('testhost', {username: this.state.nameFormValue});
  }
  now(){
    return(
    <div>

        <h2> Please Enter your Name </h2>

        
        <form onSubmit={this.handleSubmit} >
        <input
      type="text"
      name="Name"
      value={this.state.nameFormValue}
      onChange={this.handleNameChange}
        />

        <input type="submit" value="Submit" onClick={this.sendMsg}/>
        </form>

        <button onClick={this.props.backButtonClickHandler}>
        {'Back'}
        </button>

     </div>
     )
  }

  later(){
    return(
    <div>
    <GameOwnerWaitingForPlayersScreen />
    </div>
    )
  }


  render() {

    return (
      <div>
      {this[this.state.pageID]()}

     </div>
    )}
}

export default GameOwnerEnterNameScreen;
