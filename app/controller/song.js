'use strict'

var path = require("path");
var fs = require("fs");
var pagition = require("mongoose-pagination");

var models = require("../model/master");
var Song = models.Song;

var SongController = {
  getAll: function (req, res){
    var page = req.body.page ? req.body.page : 1;
    var albumId = req.body.album;
    var itemsPP = 2;
    var find = Song.find().sort("title");
    if(artistId){
      find = Song.find({album: albumId}).sort("year");
    }
    find.populate({path: "album"}).paginate(page, itemsPP, (err, songs, total) => {
      if(err){
        res.status(500).send("error al guardar");
      } else{
        if(!artists){
          res.status(404).send("no se ha guardado guardar");
        } else {
          res.status(200).send({songs: songs, total:total});
        }
      }
    });
  },
  getOne: function(req, res){
    var songId = req.body.id;

    Song.findById(songId).populate({path: "album"}).exec((err, object) => {
      if(err){
        res.status(500).send({mensaje: "error al buscar"});
      } else {
        if(!object){
          res.status(404).send({mensaje: "busqueda no encontrada"});
        } else{
          res.status(200).send({album: object});
        }
      }
    });
  },
  create: function (req, res){
    var song = new Song();

    var params = req.body;
    song.name = params.name;
    song.number = params.number;
    song.duration = params.duration;
    song.file = null;
    song.album = params.album;

    song.save((err, saved) => {
      if(err){
        res.status(500).send("error al guardar");
      } else {
        if(!saved){
          res.status(404).send("no se ha guardado guardar");
        } else {
          res.status(200).send({song: saved});
        }
      }
    })
  },
  update: function (req, res){
    var update = req.body;
    var songId = update.id;

    Song.findByIdAndUpdate(songId,update,(err, updated) => {
      if(err){
        res.status(500).send("error al guardar");
      } else{
        if(!updated){
          res.status(404).send("no se ha guardado guardar");
        } else {
          res.status(200).send({song: updated});
        }
      }
    });
  },
  delete: function(req, res){
    var songId = req.body.id;

    Song.findByIdAndRemove(songId,(err, song) => {
      if(err){
        res.status(500).send("error al guardar");
      } else{
        if(!album){
          res.status(404).send("no se ha guardado guardar");
        } else {
          res.status(200).send({song: song});
        }
      }
    });
  },
  image:{
    upload: function (req,res){
      var albumId = req.body.id;

      if(req.files){
        var file_up = req.files.image;

        var alb = {
          image: file_up.path
        };

        Album.findByIdAndUpdate(albumId,alb, (err, img) =>{
          if(!img){
            res.status(404);
          } else {
            res.status(200).send({album: img});
          }
        });
      }
    },
    get: function (req,res){
      var imageFile = req.body.imageFile;
      fs.exists("./public/images/"+imageFile,function(exists){
        if(exists){
          res.sendFile(path.resolve("./public/images/"+imageFile));
        } else {
          res.status(200).send({mensaje: "no existe archivo"});
        }
      });
    }
  }
};

module.exports = SongController
