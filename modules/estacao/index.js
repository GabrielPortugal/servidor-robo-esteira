module.exports = class module{

	constructor() {
  }

  acordar(req,res) {
    console.log("*********************");
    console.log("Acordar Heroku");
    console.log("https://estacaodionisio-nodejs.herokuapp.com/");
    console.log('body',req.body);

    let date = new Date();
    let time = date.getTime();

    res.status(200).json({
      status:200,
      time: time,
      msg: "Heroku acordou"});
  }

  encherTaca(req, res) {
    console.log("*********************");
    console.log("POST Encher a Tacça");
    console.log('body',req.body);

    let json = {
      enchendo: true,
      qtde: 150
    }
    
    // .set(json,(err)=>{ //caso queira colocar com uma chave própria
    Firebase.database()
    .ref(`estacao/${req.body.estacao}/cmd`)
    .update(json,(err)=>{
      if(err) {
        console.log(err);
      }
      let date = new Date();
      let time = date.getTime();
      res.status(200).json({
        status:200,
        time: time,
        msg: "vamos encher a taca",
        json: json});
    });
  }

}
