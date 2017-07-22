'use strict'

var express = require("express");

var Controllers = {
  Artist: require("./artist"),
  User: require("./user"),
  Album: require("./album")
};


module.exports = Controllers;
