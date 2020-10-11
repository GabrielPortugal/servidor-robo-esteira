const Module = require("./index.js");

module.exports = function(app){
  app.post('/acordar', function(req, res){
  	var module = new Module();
  	module.acordar(req, res);
  });
  
  app.post('/balanca', function(req, res){
  	var module = new Module();
  	module.balanca(req, res);
  });
};