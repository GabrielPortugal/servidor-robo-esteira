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

    let body = req.body

    let json = {
      enchendo: true,
      qtde: body.ml,
      user: body.user
    }
    
    // .set(json,(err)=>{ //caso queira colocar com uma chave própria
    Firebase.database().ref(`estacao/${body.estacao}/cmd`)
    .update(json,(err)=>{
      console.log('subiu para fire', json)
      if(err) {
        console.log('***************');
        console.log('***************');
        console.log('ERROR');
        console.log(err);
        console.log('***************');
        console.log('***************');
      }

      let topic = "gakla-envia-estacaodionisio";
      clientMqtt.publish(topic, JSON.stringify(body));

      let date = new Date();
      let time = date.getTime();
      res.status(200).json({
        status:200,
        time: time,
        msg: "vamos encher a taca",
        json: json
      });
    });
  }

}
