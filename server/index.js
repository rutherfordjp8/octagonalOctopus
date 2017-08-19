var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');

var helpers = require('./helper-functions');
var database = require('../database-mysql');
io.on('connection', (socket) => {

  socket.on('join', (data) => {
    socket.join(data.roomname);
    database.addPlayer(data.roomname, false, data.username, socket.id, () => {
      database.getAllUsernames(data.roomname, (allplayers) => {
        socket.to(data.roomname).emit('playerjoined', {allplayers})
        var accessCode = data.roomname;
        socket.emit('newplayer', {allplayers, accessCode})
      }); 
    });
  });

  socket.on('create', (data) => {
    var accessCode = helpers.generateToken();
    socket.join(accessCode);
    database.createGame(accessCode, () => {
      var allplayers = [data.username];
      database.addPlayer(accessCode, true, data.username, socket.id, () => {
        socket.emit('newgame', {accessCode, allplayers});
      });
    });
  });
  
  socket.on('disconnect', () => {
    console.log('heard a disconnect');
    database.removePlayer(socket.conn.id, (gameToken) => {
      database.getAllUsernames(gameToken, (allplayers) => {
        io.in(gameToken).emit('newplayer', {allplayers})
      });
    });
  });

  // // const assignRolesandInfo = (data) => {
  // //   database.getAllUsernames(data.roomname, (usernames) => {
  // //     var roles = helpers.generateRoles(usernames);
  // //     var extraInfoAssignment = helpers.extraInfoAssignment(roles);
  // //     database.getAllPlayers(data.roomname, (users) => {
  // //       for (var i = 0; i < users.length; i++) {
  // //         var toEmit = {};
  // //         toEmit[role] = roles[users[i].dataValues.username];
  // //         toEmit[additionalInfo] = extraInfoAssignment[users[i].dataValues.username];
  // //         socket.top(users[i].dataValues.socketid).emit('updateState', toEmit);
  // //       }
  // //     });
  // //   });
  // // };
  
  socket.on('start game', (data) => {
    database.updateVotesAndParticipantNum(data.roomname, () => {
      database.getAllSocketIds(data.roomname, (socketids) => {
        database.votesNeeded(data.roomname, (votesNeeded) => {
          var roles = helpers.generateRoles(socketids);
          socket.emit('hoststart', {role: roles[socket.id], missionSize: votesNeeded});
          for (var i = 0; i < socketids.length; i++) {
            database.assignRole(socketids[i], roles[socketids[i]], () => {
            });
            if (socketids[i] !== socket.id) {
              socket.to(socketids[i]).emit('playerstart', {role: roles[socketids[i]], missionSize: votesNeeded});
            }
          }
        });
      });
    });
  });

  socket.on('missionparticipants', (data) => {
    io.in(data.roomname).emit('nomissionwaiting', {})
    for (var i = 0; i < data.participants.length; i++) {
      database.getSocketId(data.participants[i], data.roomname, (socketid) => {
        if (socketid === socket.id) {
          socket.emit('missionvote', {missionPlayers: data.participants})
        } else {
          socket.to(socketid).emit('missionvote', {missionPlayers: data.participants});
        }
      });
    };
  });

    const computeResult = (data, callback) => {
    database.addVote(data.roomname, data.vote, (votesArray) => {
      database.votesNeeded(data.roomname, (votesNeeded) => {
        if (votesArray.length === votesNeeded) {
          database.votingInfo(data.roomname, (numPlayers, missionNumber) => {
            var finalMissionResult = helpers.missionResult(numPlayers, missionNumber, votesArray); // need a change from helper function
            callback(finalMissionResult, votesArray);
          });
        }
      });
    });
  };

  socket.on('missionvote', (data) => {
    computeResult(data, (finalMissionResult, votesArray) => {
      database.updateResults(data.roomname, finalMissionResult, (results) => {
        if (results.length < 5) {
          database.nextMission(data.roomname, (votesNeeded) => {
            io.in(data.roomname).emit('missionresult', {results: votesArray, missionSize: votesNeeded});
          });
        } else {
          var finalOutcome = helpers.gameOutcome(results);
          if (finalOutcome) {
            io.in(data.roomname).emit('waitmerlinchoice', {});
            database.getMordred(data.roomname, (mordred) => {
              if (mordred.socketid === socket.id) {
                socket.emit('entermerlin', {});
              } else{ 
                  socket.to(mordred.socketid).emit('entermerlin', {}); 
              }
            });
          } else {
            database.getAllPlayers(data.roomname, (users) => {
              var allPlayers = {};
              for (var i = 0; i < users.length; i++) {
                allPlayers[users[i].dataValues.username] = users[i].dataValues.role;
              }
              io.in(data.roomname).emit('finaloutcome', {finalOutcome, allPlayers});
            })
          }
        }
      });
    });
  });

  
  socket.on('merlinselection', (data) => {
    //console.log(data, 'merlin selection socket**********');
    database.getMerlin(data.roomname, (merlin) => {
      var merlinGuessed = (merlin.username === data.choice);
      database.getAllPlayers(data.roomname, (users) => {
        var allPlayers = {};
        for (var i = 0; i < users.length; i++) {
          allPlayers[users[i].dataValues.username] = users[i].dataValues.role;
        }
        io.in(data.roomname).emit('merlinfinaloutcome', {merlinGuessed, allPlayers}); 
      });
    });
  });
});


app.use(express.static(__dirname + '/../react-client/dist'));

var port =  process.env.PORT || 3000;


server.listen(port, () => {
  console.log('listening to port 3000');
});
