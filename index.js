const express = require("express");
const app = new express();
const routes = require("./routes");
const cors = require('cors');
const validator = require("express-validator");
const server = require('http').Server(app);
const multer = require('multer');

global.mailer = require('nodemailer');

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
var admin = require("firebase-admin");
var serviceAccount = require("./biritas-7b300-firebase-adminsdk-iyqu4-ef6722e084");
global.Firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://biritas-7b300.firebaseio.com"
});

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
/**
 * 
 */
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

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
/**
 * Paho Node.js MQTT Client-Starting
 */
 var mqtt = require('mqtt')
 global.clientMqtt  = mqtt.connect('http://mqtt.eclipse.org:1883')
 
 clientMqtt.on('connect', function () {
 	console.log('conectado ao servidor iot.eclipse');
 	clientMqtt.subscribe('Harold2019TempUmi', function (err) {
 	})
 })
 
 clientMqtt.on('message', function (topic, message) {
  // message is Buffer
  if(topic === 'Harold2019TempUmi') {
  	let json = JSON.parse(message.toString())
  	let date = new Date()
    let time = date.getTime()
  	json.time = time
  	console.log(json)

    if(json.msg) {
      Firebase.database()
      .ref(`comando-tv`)
      .push(json,(err)=>{
        if(err) {
          console.log('error ao cadastar firebase/comando-tv', err);
        }
      }); 
    }
    else {
      Firebase.database()
      .ref(`tempumi`)
      .push(json,(err)=>{
        if(err) {
          console.log('error ao cadastar firebase/tempumi', err);
        }
      });      
    }
  }
})
 ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
