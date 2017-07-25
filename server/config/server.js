'use strict'

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var routes = require("./routes");

app.secret = "pablo2389";
app.filtro = "/api";

app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Authorization, X-API-KEY, Origin, X-Requested-with, Content-Type, Accept, Access-Control-Allow-Request-Method");
  res.header("Access-Control-Allow-Mothods","POST");
  res.header("Allow","POST");

  next();
});

app.use(app.filtro,routes);

module.exports = app;
