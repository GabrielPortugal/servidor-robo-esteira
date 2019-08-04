const express = require("express");
const app = new express();
const routes = require("./routes");
const cors = require('cors');
const validator = require("express-validator");
const server = require('http').Server(app);
const multer = require('multer');

global.mailer = require('nodemailer');

var admin = require("firebase-admin");
var serviceAccount = require("./mecaheartstation-firebase-adminsdk-9f0lo-cb1704ed2b");
global.Firebase = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://mecaheartstation.firebaseio.com"
});

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
 	console.log("Começando o backend do Harold");
 	console.log("***********************************");
 });

/**
 * Paho Node.js MQTT Client-Starting
 */
 var mqtt = require('mqtt')
global.clientMqtt  = mqtt.connect('http://iot.eclipse.org:1883')
 
 clientMqtt.on('connect', function () {
 	console.log('conectado ao servidor iot.eclipse');
 	clientMqtt.subscribe('MQTTRecebeGaklaMano', function (err) {
 		// if (!err) {
 		// 	clientMqtt.publish('presence', 'Hello mqtt')
 		// }
 	})
 })
 
 clientMqtt.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic, message.toString())
  // clientMqtt.end()
})
