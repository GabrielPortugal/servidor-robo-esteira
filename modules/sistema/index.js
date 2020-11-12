module.exports = class module {

  constructor() {
  }

  sistemaLigado(req, res) {
    console.log("*********************");
    console.log("Sistema Ligado");

    let dt = new Date();

    let hour = dt.getHours()
    if(hour <= 0) {
      hour = 24
    }
    hour = hour - 3

    let created_at = `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()} - ${hour}:${dt.getMinutes()}:${dt.getSeconds()}`;
    let created_at_time = dt.getTime();

    let ref = `/teste/botija/-MGjXT_YtK0i6AG9BLjh`
    Firebase.database().ref(ref + '/sistemaLigado')
      .push({
        created_at: created_at,
        created_at_time: created_at_time,
        msg: "Sistema Ligado"
      }, (err) => {
      });

    res.status(200).json({
      status: 200,
      time: created_at,
      msg: "Sistema ligado"
    });
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

        let dt = new Date();
        let created_at = `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()} - ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
        let created_at_time = dt.getTime();

        let tmp = (body.peso * 100) / snap.pesoAtual
        let tmpp = 100 - tmp
        if (tmpp <= 1) {
          res.status(200).json({
            status: 200,
            time: created_at,
            msg: "valor baixo de modificação"
          })
          return
        }

        let consumo = snap.pesoAtual - body.peso

        let novoPeso = parseInt(body.peso).toFixed()
        let novaPorcentagem = ((novoPeso * 100) / snap.botija).toFixed()
        let consumoPorcentagem = (snap.porcentagemAtual - novaPorcentagem).toFixed()

        if(isNaN(novaPorcentagem)) {
          novaPorcentagem = 0
        }

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
