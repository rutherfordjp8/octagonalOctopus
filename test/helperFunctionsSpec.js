const assert = require('assert');
const expect = require('chai').expect;

const helperFunctions = require('../server/helper-functions.js');
const db = require('../database-mongo/index.js');

describe('missionResults', function() {
  it('should return false if a mission fails', function(done){
    let playerCount = 5,
        missionNum = 2,
        failVotes = 2;

    let missionOutcome = helperFunctions.missionResult(playerCount, missionNum, failVotes);
    assert.equal(missionOutcome, false);
    done();
  })

  it('should return true if a mission passes', function(done){
    let playerCount = 5,
        roundNum = 2,
        failVotes = 0;

    let missionOutcome = helperFunctions.missionResult(playerCount, roundNum, failVotes);
    assert.equal(missionOutcome, true);
    done();
  })
})

describe('generateRoles', function() {
  it('should generate roles for each user', function(done){
    let users = ['Abhi', 'Brian', 'Yang', 'Patrick', '5thPerson'];

    let generatedRoles = helperFunctions.generateRoles(users);

    assert.equal(users.length, Object.keys(generatedRoles).length);
    done();
  })
})

describe('merlinGuessResult', function() {
  it('should return true if merlin guess is correct', function(done){
    db.createGame('12345', 'hostName', 'aaaaa', function(){
      db.addRoles('12345', {'user': 'Merlin'}, () =>{
        let merlinGuess = helperFunctions.merlinGuessResult('12345','user');
        assert.equal(merlinGuess, true);
        done();
      })
    })
  })
})

describe('gameOutcome', function() {
  it('should return true if spies lost', function(done){
    let missions = [true, true, true, false, false];
    let results = helperFunctions.gameOutcome(missions);

    assert.equal(results, true);
    done();
  })
  it('should return false if spies won', function(done){
    let missions = [true, true, false, false, false];
    let results = helperFunctions.gameOutcome(missions);

    assert.equal(results, false);
    done();
  })
})
// test('should return false if a mission fails', () => {
//   let playerCount = 5,
//           roundNum = 2,
//           failVotes = 2;
//   expect(helperFunctions.missionResult(playerCount, roundNum, failVotes)).toBe(false);
// });
