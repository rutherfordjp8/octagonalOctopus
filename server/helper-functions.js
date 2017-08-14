var _ = require('underscore');
var db = require('../database-mongo');

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

module.exports.missionResult = (playerCount, roundNum, numFailures) => {
  // depending on number of players and round, returns
  // if mission passed (true) or not (false)

  // if numFailures is equal or greater to what is needed to fail for
  // the given amount of players return true, otherwise false.
  return numFailures >= numFailuresNeeded[playerCount][roundNum];
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
  for (let i = 0; i < usernames.length; i++) {
    //add username as key and role as value
    userRoles.usernames[i] = shuffleRoles[i];
  }
  return userRoles;
};

module.exports.merlinGuessResult = (merlinGuess) => {
  // query database for real merlin
  // return true or false
};

module.exports.gameOutcome = (missionResults) => {
  // given mission results array, determine if good people won (true)

  const neededFailures = 3;

  // Filter out all false values. Take then length and
  // if it is greater than neededFailures return false (spies win).
  if (missionRessults.filter(e => !e).length >= neededFailures) { return false; }
};

module.exports.extraInfoAssignment = (userRoleMapping) => {
  // accepts an object with user to role mapping then
  // returns object of username as key and special roles they know (object) as value
}

module.exports.generateToken = () => {
  // generates and returns a random token.
  // used as the key to enter a room.

  // list containing numbers and characters for the random string
  var stringArray = ['0','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','k',
                    'o','p','q','r','s','t','u','v','w','x','y','z'];

  var token = '';
  // build a string with random characters with length of 6
	for (let i = 1; i < 6; i++) {
		let randomNum = Math.ceil(Math.random() * stringArray.length) - 1;
		token = token + stringArray[randomNum];
	};

  return token;
}
