'use strict'

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var routes = require("./routes");

app.secret = "pablo2389";
app.filtro = "/api";

app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));
app.use(bodyParser.json());

app.use(app.filtro,routes);

module.exports = app;
