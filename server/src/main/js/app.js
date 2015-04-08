var restify = require('restify');

var server = restify.createServer({
  name: 'Degree',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

var db = require('./libs/db')(onDbConnected, onDbConnectionError);

require('./api/degrees')(server);
require('./api/courses')(server);
require('./api/topics')(server);

server.get(/\/?.*/, restify.serveStatic({
  directory: __dirname + '/../../../../client/src/',
  default: 'index.html'
}));

function onDbConnectionError() {
  console.log('Can\'nt start the server due to DB connection error.');
}

function onDbConnected(){
  server.listen(8080, function onListening() {
    console.log('%s listening at %s', server.name, server.url);
  });
}