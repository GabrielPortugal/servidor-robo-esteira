const Module = require("./index.js");

module.exports = function(app){
  // rota para pegar cartão via code
  app.post('/ctrltv', function(req, res){
  	var module = new Module();
  	module.postCtrlTv(req, res);
  });

  app.post('/acordar', function(req, res){
  	var module = new Module();
  	module.postCtrlTv(req, res);
  });
};