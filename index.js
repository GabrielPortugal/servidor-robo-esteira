const express = require("express");
const app = new express();
const routes = require("./routes");
const cors = require('cors');
const validator = require("express-validator");
const server = require('http').Server(app);

// Paho Node.js MQTT Client-Start
var mqtt = require('mqtt')
// servidor MQTT
let serverMqtt = 'mqtt://broker.hivemq.com'
global.clientMqtt  = mqtt.connect(serverMqtt)

clientMqtt.on('connect', function () {
  console.log('---------------------------------');
  console.log('conectado MQTT : ' + serverMqtt);
  console.log('---------------------------------');
  clientMqtt.subscribe('TOPICO_ESCUTA_MUDAR', (err)=> {
    if(err) {
      console.log('erro mqtt', err)
    }
  })
})

clientMqtt.on('message', function (topic, message) {
  if(topic === 'TOPICO_ESCUTA_MUDAR') {
  	let json = JSON.parse(message.toString())
    console.log('escutou', json)
  }
})
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// START
app.use(express.json());
app.use(express.urlencoded());
app.use(validator());
app.use(cors());

app.listen(process.env.PORT || 3000, ()=>{
  routes(app);
  console.log("--> porta 3000");
});
