const express = require("express");
const app = new express();
const routes = require("./routes");
const cors = require('cors');
const validator = require("express-validator");
const server = require('http').Server(app);
const multer = require('multer');

//heroku logs -t --app your-app-name
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
// var serviceAccount = require("./meugas-firebase");
// global.Firebase = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://meugas-app.firebaseio.com"
// });
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// Paho Node.js MQTT Client-Start
var mqtt = require('mqtt')
// global.clientMqtt  = mqtt.connect('http://mqtt.eclipse.org:1883')
global.clientMqtt  = mqtt.connect('http://mqtt.internetecoisas.com.br:1883')

clientMqtt.on('connect', function () {
  console.log('---------------------------------');
  console.log('conectado ao servidor iot.eclipse');
  console.log('---------------------------------');
  clientMqtt.subscribe('d6-harold-robo-escuta', (err)=> {
    if(err) {
      console.log('erro mqtt', err)
    }
  })
})

clientMqtt.on('message', function (topic, message) {
  if(topic === 'd6-harold-robo-escuta') {
  	let json = JSON.parse(message.toString())
  	let date = new Date()
    let time = date.getTime()
    json.time = time
    console.log('***************************')
    console.log('***************************')
    console.log('chegou do D6')
    console.log(json)
    console.log('***************************')
    console.log('***************************')
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
  console.log("--> logado na porta 3000");
  console.log("Começando o backend Robo Harold (D6)");
  console.log("***********************************");
});
