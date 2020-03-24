const express = require("express");
const app = new express();
const routes = require("./routes");
const cors = require('cors');
const validator = require("express-validator");
const server = require('http').Server(app);
const multer = require('multer');

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// NODEMAILER
global.mailer = require('nodemailer');

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// FIREBASE
var admin = require("firebase-admin");
var serviceAccount = require("./biritas-7b300-firebase-adminsdk-iyqu4-ef6722e084");
global.Firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://biritas-7b300.firebaseio.com"
});

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// Paho Node.js MQTT Client-Start
var mqtt = require('mqtt')
global.clientMqtt  = mqtt.connect('http://mqtt.eclipse.org:1883')

clientMqtt.on('connect', function () {
  console.log('---------------------------------');
  console.log('conectado ao servidor iot.eclipse');
  console.log('---------------------------------');
  clientMqtt.subscribe('gakla-escuta-estacaodionisio', (err)=> {
    if(err) {
      console.log('erro mqtt', err)
    }
  })
})

clientMqtt.on('message', function (topic, message) {
  if(topic === 'gakla-escuta-estacaodionisio') {
  	let json = JSON.parse(message.toString())
  	let date = new Date()
    let time = date.getTime()
    json.time = time
    console.log(json)
  }
})
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// START
app.use(express.json());
app.use(express.urlencoded());
app.use(validator());
app.use(cors({}));

app.listen(process.env.PORT || 3000, ()=>{
  routes(app);
  console.log("--> logado na porta 3000");
  console.log("Começando o backend Estação Dionisio");
  console.log("***********************************");
});
