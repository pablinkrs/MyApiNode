'use strict'

var path = require("path");
var fs = require("fs");
var pagition = require("mongoose-pagination");

var models = require("../model/master");
var Artist = models.Artist;

var ArtistController = {
  getAll: function (req, res){
    var page = req.params.page ? req.params.page : 1;
    var itemsPP = 2;
    Artist.find().sort("name").paginate(page, itemsPP, (err, artists, total) => {
      if(err){
        res.status(500).send("error al guardar");
      } else{
        if(!artists){
          res.status(404).send("no se ha guardado guardar");
        } else {
            res.status(200).send({artists: artists, total:total});
        }
      }
    });
  },
  getOne: function(req, res){
    var artistId = req.params.id;

    Artist.findById(artistId,(err, object) => {
      if(err){
        res.status(500).send({mensaje: "error al buscar"});
      } else {
        if(!object){
            res.status(404).send({mensaje: "busqueda no encontrada"});
        } else{
          res.status(200).send({artist: object});
        }
      }
    });
  },
  create: function (req, res){
    var artist = new Artist();

    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = "null";

    artist.save((err, saved) => {
      if(err){
        res.status(500).send("error al guardar");
      } else {
        if(!saved){
          res.status(404).send("no se ha guardado guardar");
        } else {
            res.status(200).send({artist: saved});
        }
      }
    })
  },
  update: function (req, res){
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId,update,(err, updated) => {
      if(err){
        res.status(500).send("error al guardar");
      } else{
        if(!updated){
          res.status(404).send("no se ha guardado guardar");
        } else {
            res.status(200).send({artists: updated});
        }
      }
    });
  },
  delete: function(req, res){
    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId,(err, artist) => {
      if(err){
        res.status(500).send("error al guardar");
      } else{
        if(!artist){
          res.status(404).send("no se ha guardado guardar");
        } else {
          models.Album.find({artist: artist._id}).remove((err, album) => {
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
                        res.status(200).send({artist: artist});
                    }
                  }
                });
              }
            }
          });
        }
      }
    });
  },
  image:{
    upload: function (req,res){
      var artistId = req.body.id;

      if(req.files){
        var file_up = req.files.image;

        var art = {
          image: file_up.path
        };

        Artist.findByIdAndUpdate(artistId,art, (err, img) =>{
          if(!img){
            res.status(404);
          } else {
            res.status(200).send({artist: img});
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

module.exports = ArtistController
