'use strict'

var express = require("express");

var Controllers = {
  Artist: require("./artist"),
  User: require("./user")
}


module.exports = Controllers;
