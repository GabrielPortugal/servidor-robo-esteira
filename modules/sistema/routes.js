const Module = require("./index.js");

module.exports = function(app){
  app.post('/acordar', function(req, res){
  	var module = new Module();
  	module.acordar(req, res);
  });
  
  app.post('/receberComando', function(req, res){
  	var module = new Module();
  	module.receberComando(req, res);
  });
};