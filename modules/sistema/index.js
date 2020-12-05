module.exports = class module {

  constructor() {
  }

  acordar(req, res) {
    console.log("*********************");
    console.log("Acordar Heroku");
    console.log("COLOCAR URL HEORKU");
    console.log('body', req.body);

    let date = new Date();
    let time = date.getTime();

    res.status(200).json({
      status: 200,
      time: time,
      msg: "Heroku acordou"
    });
  }

}
