//This module initializes connection to the DB
module.exports = function(connectedCallback, errorCallback) {
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/degree');
  var db = mongoose.connection;
  db.on('error', errorCallback);
  db.once('open', connectedCallback);

  return db;
};
