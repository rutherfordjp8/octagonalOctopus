var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var games = mongoose.Schema({
  token: String,
  players: String,
  results: String  
});

var Game = mongoose.model('Game', games);

var selectGame = function(token, callback) {
  Game.find({token});
};

var createGame = function(token, players, results, callback) {
};

var updateResults = function (results, callback) {
};


module.exports.selectGame = selectGame;