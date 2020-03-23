var routes = function(app){

	require("./modules/estacao/routes.js")(app);

	// rota para molde
	app.get("/start", (req, res)=>{
		console.log('*****************');
		console.log('teste conexão pela rota /start');

		// Firebase.database()
		// .ref(`/cards`)
		// .once('value', (res)=> {
		// 	res = res.val();
		// 	for(let i in res) {
		// 		console.log(res[i]);
		// 	}
		// });
		
		res.status(200).json({msg:"start",id:1});
		
		console.log('OKOK');
		console.log('*****************');
	});
};

module.exports = routes;
