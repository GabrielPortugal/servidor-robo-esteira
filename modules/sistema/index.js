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

    let ref = `/teste/botija/-MGjXT_YtK0i6AG9BLjh`
    Firebase.database()
      .ref(ref)
      .once('value', (snap) => {
        snap = snap.val();
        console.log(snap);
        // verificar variação do peso

        let dt = new Date();
        let created_at = `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()} - ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
        let created_at_time = dt.getTime();

        let consumo = snap.pesoAtual - body.peso

        let novoPeso = parseInt(body.peso).toFixed()
        let novaPorcentagem = ((novoPeso * 100) / snap.botija).toFixed()
        let consumoPorcentagem = (snap.porcentagemAtual - novaPorcentagem).toFixed()

        Firebase.database().ref(ref)
          .update({
            pesoAtual: novoPeso,
            porcentagemAtual: novaPorcentagem
          }, (err) => {
          });

        Firebase.database().ref(ref + '/consumo')
          .push({
            created_at: created_at,
            created_at_time: created_at_time,
            consumo: consumo,
            porcentagemConsumida: consumoPorcentagem,
            pesoAtual: novoPeso,
            porcentagemAtual: novaPorcentagem
          }, (err) => {
          });

        res.status(200).json({
          status: 200,
          time: created_at,
          msg: "valor do gás anotado"
        });
        return;
      })
  }

}
