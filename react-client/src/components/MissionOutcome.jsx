import React from 'react';

class MissionOutcome extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {


    return (
      <div>

        <h5> Mission Outcome  </h5>

         <Stats /> <Timer />

         <NextButton />
         // Unclear from discussion if Buttons should be components
      </div>
      )
  }
}

export default MissionOutcome;
