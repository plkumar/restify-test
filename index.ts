/// <reference path="typings/tsd.d.ts" />

import restify = require('restify');

var server:restify.Server = restify.createServer({
  name: 'restify-test'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.urlEncodedBodyParser());

server.use(function slowHandler(req, res, next) {
  setTimeout(function() {
    return next();
  }, 250);
});

server.get({path: '/hello/:name', name: 'GetFoo'}, function respond(req, res, next) {
  res.send({
    hello: req.params.name
  });
  return next();
});

server.get(/\/static\/?.*/, restify.serveStatic({
  directory: __dirname + '/public',
  default: 'index.html'
}));

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
