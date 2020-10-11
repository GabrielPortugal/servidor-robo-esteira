var routes = function(app){

	require("./modules/sistema/routes.js")(app);

	// rota para molde
	app.get("/start", (req, res)=>{
		console.log('*****************');
		console.log('teste conexão pela rota /start');		
		res.status(200).json({msg:"start",id:1});		
		console.log('OKOK');
		console.log('*****************');
	});
};

module.exports = routes;
