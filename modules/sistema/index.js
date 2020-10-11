module.exports = class module {

  constructor() {
  }

  acordar(req, res) {
    console.log("*********************");
    console.log("Acordar Heroku");
    console.log("https://estacaodionisio-nodejs.herokuapp.com/");
    console.log('body', req.body);

    let date = new Date();
    let time = date.getTime();

    res.status(200).json({
      status: 200,
      time: time,
      msg: "Heroku acordou"
    });
  }

  balanca(req, res) {
    console.log("*********************");
    console.log("POST Balanca");
    console.log('body', req.body);

    let body = req.body
    console.log('nodejs body', body)

    let ref = `/teste/botija`
    Firebase.database()
      .ref(ref)
      .on('value', (snap) => {
        snap = snap.val();
        console.log(snap);
      })

    // Firebase.database().ref(`estacao/${body.estacao}/cmd`)
    // .update(json,(err)=>{
    //   console.log('subiu para fire', json)
    //   if(err) {
    //     console.log('***************');
    //     console.log('***************');
    //     console.log('ERROR');
    //     console.log(err);
    //     console.log('***************');
    //     console.log('***************');
    //   }
    //   let date = new Date();
    //   let time = date.getTime();
    //   res.status(200).json({
    //     status:200,
    //     time: time,
    //     msg: "valor do gás anotado",
    //     json: json
    //   });
    // });
  }

}
