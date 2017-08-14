import React from 'react';

class PlayerEnterNameScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

        <h2> What should the Heading Be? </h2>


      I do not presently know how to deal with the html form

     
<form >
  <input type="text" name="Token" value="Enter Access Token"/>

  <input type="submit" value="Submit"/>
</form> 

      
     
<form >
  <input type="text" name="Name" value="Enter name"/>

  <input type="submit" value="Submit"/>
</form> 

      


        <button onClick={this.props.backButtonClickHandler}>
        {'Back'}
        </button>

        <button onClick={this.props.joinButtonClickHandler}>
        {'Join'}
        </button>


      </div>
      )
  }
}

export default PlayerEnterNameScreen;
