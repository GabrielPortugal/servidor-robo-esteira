// heroku logs --app d6-robo --tail

module.exports = class module {

  constructor() {
  }

  acordar(req, res) {
    console.log("*********************");
    console.log("Acordar servidor");
    this.resSucesso(res, 'Heroku acordou');
  }

  receberComando(req, res) {
    console.log("*********************");
    console.log("Receber comando");
    console.log('body', req.body);
    let body = req.body

    if (body.comando) {
      this.enviarComandoAndar(body.comando)
    }
    else if (body.musica) {
      this.enviarComandoMusica(body.musica)
    }

    this.resSucesso(res, 'Comando recebido');
  }
  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////
  enviarComandoMusica(index) {
    let topic = "TOPICO_ENVIA_MUDAR";
    console.log('musica', index)
    let obj = {
      musica: null
    }
    switch (index) {
      case 1:
        console.log('Comunicador');
        obj.musica = 1
        break;
      case 2:
        console.log('Cantina');
        obj.musica = 2
        break;
      case 3:
        console.log('Piratas');
        obj.musica = 3
        break;
      case 4:
        console.log('Império');
        obj.musica = 4
        break;
      case 5:
        console.log('StarWars');
        obj.musica = 5
        break;
      case 6:
        console.log('Chefão');
        obj.musica = 6
        break;
      case 7:
        console.log('Sonic');
        obj.musica = 7
        break;
      case 8:
        console.log('Tetris');
        obj.musica = 8
        break;
      case 9:
        console.log('Panera rosa');
        obj.musica = 9
        break;
      case 10:
        console.log('Take');
        obj.musica = 10
        break;
    }
    console.log('enviar mqtt musica', JSON.stringify(obj));
    clientMqtt.publish(topic, JSON.stringify(obj));
  }
  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////
  enviarComandoAndar(index) {
    let topic = "TOPICO_ENVIA_MUDAR";
    console.log('andar', index)
    let obj = {
      comando: null
    }
    switch (index) {
      case 1:
        console.log('cima');
        obj.comando = 1;
        break;
      case 2:
        console.log('esquerda');
        obj.comando = 2;
        break;
      case 3:
        console.log('meio');
        obj.comando = 3;
        break;
      case 4:
        console.log('direita');
        obj.comando = 4;
        break;
      case 5:
        console.log('baixo');
        obj.comando = 5;
        break;
      case 6:
        console.log('para tudo');
        obj.comando = 6;
        break;
    }
    console.log('enviar mqtt comando', JSON.stringify(obj));
    clientMqtt.publish(topic, JSON.stringify(obj));
  }
  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////
  resSucesso(res, msg) {
    let date = new Date();
    let time = date.getTime();
    res.status(200).json({
      status: 200,
      time: time,
      msg: msg
    });
  }

}
