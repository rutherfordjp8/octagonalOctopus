var _ = require('underscore');

// key represents number of players.
// values represent the different roles that will be played
const roles = {
  5: ['Mordred', 'Merlin', 'Loyal Servant', 'Loyal Servant', 'Minion of Mordred'],
  6: ['Mordred', 'Merlin', 'Loyal Servant', 'Loyal Servant', 'Minion of Mordred', 'Loyal Servant'],
  7: ['Mordred', 'Merlin', 'Loyal Servant', 'Loyal Servant', 'Minion of Mordred', 'Percival', 'Morgana'],
  8: ['Mordred', 'Merlin', 'Loyal Servant', 'Loyal Servant', 'Minion of Mordred', 'Percival', 'Morgana', 'Loyal Servant'],
  9: ['Mordred', 'Merlin', 'Loyal Servant', 'Loyal Servant', 'Minion of Mordred', 'Percival', 'Morgana', 'Loyal Servant', 'Oberon'],
  10: ['Mordred', 'Merlin', 'Loyal Servant', 'Loyal Servant', 'Minion of Mordred', 'Percival', 'Morgana', 'Loyal Servant', 'Oberon', 'Loyal Servant'],
}

// key represents number of players.
// values represent number of players that
// will go on a mission. The index
// represents what mission it is.
const numPeopleOnMission = {
  5: [2,3,2,3,3],
  6: [2,3,4,3,4],
  7: [2,3,3,4,4],
  8: [3,4,4,5,5],
  9: [3,4,4,5,5],
  10: [3,4,4,5,5]
}

// key represents number of players.
// values represent how many votes it will
// take to fail a mission. The index
// represents what mission it is.
const numFailuresNeeded = {
  5: [1,1,1,1,1],
  6: [1,1,1,1,1],
  7: [1,1,1,2,1],
  8: [1,1,1,2,1],
  9: [1,1,1,2,1],
  10: [1,1,1,2,1]
}

module.exports.missionResult = (playerCount, roundNum, ) => {
  // depending on number of players and round, returns
  // if mission passed (true) or not (false)
};

module.exports.generateRoles = (usernames) => {
  // given array of usernames generate object mapping username
  // to roles

  // output array of users roles
  var userRoles = {}
  // get the length of the usernames.
  var key = Object.keys(usernames).length;
  // shuffle the roles
  var shuffleRoles = _.shuffle(roles(key));

  // iterate through usernames
  for (let usernameKey in usernames) {
    //add username as key and value as role
    let i = 0;
    userRoles.usernameKey = shuffleRoles[i];
    i++;
  }

  return userRoles;
};

module.exports.merlinGuessResult = (merlinGuess) => {
  // query database for real merlin
  // return true or false
};

module.exports.gameOutcome = (missionResults) => {
  // given mission results array, determine if good people won (true)
};

module.exports.extraInfoAssignment = (userRoleMapping) => {
  // returns object of username as key and special roles they know (object) as value
}
