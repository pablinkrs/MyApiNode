'use strict'

var path = require("path");
var fs = require("fs");
var pagition = require("mongoose-pagination");

var models = require("../model/master");
var Album = models.Album;

var AlbumController = {
  getAll: function (req, res){
    var page = req.body.page ? req.body.page : 1;
    var artistId = req.body.artist;
    var itemsPP = 2;
    var find = Album.find().sort("title");
    if(artistId){
      find = Album.find({artist: artistId}).sort("year");
    }
    find.populate({path: "artist"}).paginate(page, itemsPP, (err, albums, total) => {
      if(err){
        res.status(500).send("error al guardar");
      } else{
        if(!artists){
          res.status(404).send("no se ha guardado guardar");
        } else {
          res.status(200).send({albums: albums, total:total});
        }
      }
    });
  },
  getOne: function(req, res){
    var albumId = req.body.id;

    Album.findById(albumId).populate({path: "artist"}).exec((err, object) => {
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
    var album = new Album();

    var params = req.body;
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.artist = params.artist;
    album.image = "null";

    album.save((err, saved) => {
      if(err){
        res.status(500).send("error al guardar");
      } else {
        if(!saved){
          res.status(404).send("no se ha guardado guardar");
        } else {
          res.status(200).send({album: saved});
        }
      }
    })
  },
  update: function (req, res){
    var update = req.body;
    var albumId = update.id;

    Album.findByIdAndUpdate(albumId,update,(err, updated) => {
      if(err){
        res.status(500).send("error al guardar");
      } else{
        if(!updated){
          res.status(404).send("no se ha guardado guardar");
        } else {
          res.status(200).send({album: updated});
        }
      }
    });
  },
  delete: function(req, res){
    var albumId = req.body.id;

    Album.findByIdAndRemove(albumId,(err, album) => {
      if(err){
        res.status(500).send("error al guardar");
      } else{
        if(!album){
          res.status(404).send("no se ha guardado guardar");
        } else {
          models.Song.find({album: album._id}).remove((err, song) => {
            if(err){
              res.status(500).send("error al guardar");
            } else{
              if(!song){
                res.status(404).send("no se ha guardado guardar");
              } else {
                res.status(200).send({album: album});
              }
            }
          });
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

module.exports = AlbumController
