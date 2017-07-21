'use strict'

var path = require("path");
var fs = require("fs");

var Artist = require("../model/artist");
var Album = require("../model/album");
var Song = require("../model/song");

function getArtist(req, res){
  res.status(200).send({mensaje: "Metod getArtist"});
}

module.exports = {
  getArtist
}
