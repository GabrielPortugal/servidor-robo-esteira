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
var serviceAccount = require("./meugas-firebase");
global.Firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://meugas-app.firebaseio.com"
});
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
  console.log("Começando o backend MeuGas");
  console.log("***********************************");
});
