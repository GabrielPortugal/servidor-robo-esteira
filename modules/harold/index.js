module.exports = class module{

	constructor() {
  }

  // pegar cartão via código
  // ARDUINO
  // arduino tem que passar o id da maquina
  postCtrlTv(req,res) {
    console.log("*********************");
    console.log("Comando Harold CtrlTV");
    console.log('body',req.body);

    let date = new Date();
    let time = date.getTime();

    let dataBacana = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    dataBacana = dataBacana+' '+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    console.log('hora do envio',dataBacana);

    let body = req.body;

    let topic = "Harold2019CtrlTvBtn";
    clientMqtt.publish(topic, body.code);

    res.status(200).json({msg: "enviou para o Harold"});
  }
}
