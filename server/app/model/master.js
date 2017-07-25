'use strict'

var express = require("express");

var Modelos = {
  Artist: require("./artist"),
  Album: require("./album"),
  Song: require("./song"),
  User: require("./user")
};

module.exports = Modelos;
