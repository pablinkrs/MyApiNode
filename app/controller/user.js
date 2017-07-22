'use strict'

var fs = require("fs");
var path = require("path");
var bcrypt = require("bcrypt-nodejs");
var moment = require("moment");
var jwt = require("../service/jwt");

var User = require("../model/master").User;

var UserController = {
  getAll: function (req,res){
    var page = req.params.page ? req.params.page : 1;
    var itemsPP = 2;
    User.find().sort("name").paginate(page, itemsPP, (err, users, total) => {
      if(err){
        res.status(500).send("error al guardar");
      } else{
        if(!users){
          res.status(404).send("no se ha guardado guardar");
        } else {
            res.status(200).send({users: users, total:total});
        }
      }
    });
  },
  getOne: function (req,res){
    var userId = req.params.id;
    User.findById(userId,(err, user) => {
      if(err){
        res.status(500).send({mensaje: "error al buscar"});
      } else {
        if(!object){
            res.status(404).send({mensaje: "busqueda no encontrada"});
        } else{
          res.status(200).send({user: user});
        }
      }
    });
  },
  create: function (req,res){
    var user = new User();

    var params = req.body;

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = "basic";
    user.image = "null";

    if(params.password){
      bcrypt.hash(params.password,null, null,function(err, hash){
        user.password = hash;

        user.save((err,res)=>{
          if(err){} else{
            console.log("todo genial");
          }
        });
      });
    } else {
      res.status(500);
    }
  },
  update: function (req,res){
    var userId = req.params.id;
    var userNew = req.body;

    User.findByIdAndUpdate(userId,userNew, (err,user) => {
      if(err){
        res.status(500);
      } else {
        if(!user){
          res.status(404);
        } else {
          res.status(200).send({user: user});
        }
      }
    });
  },
  session:{
    login: function (req,res){
      var params = req.body;

      var email = params.email;
      var password = params.password;

      User.findOne({email: email}, (err,user) => {
        if(err){
          res.status(500).send("error bd");
        } else {
          if(!user){
            res.status(404).send("error busqueda");
          } else {
            bcrypt.compare(password,user.password,function(err, check){
              if(check){
                if(params.gethash){
                  res.status(200).send({token: jwt.createToken(user)});
                } else {
                  res.status(200).send({user});
                }
              } else {
                res.status(404).send("error password");
              }
            });
          }
        }
      });
    },
    logout: function(req,res){}
  },
  avatar:{
    upload: function (req,res){
      var userId = req.params.id;

      if(req.files){
        var file_up = req.files.image;

        var usr = {
          image: file_up.path
        };

        User.findByIdAndUpdate(userId,usr, (err, img) =>{
          if(!img){
            res.status(404);
          } else {
            res.status(200).send({user: img});
          }
        });

        console.log(file_up);
      }
    },
    get: function (req,res){
      var imageFile = req.params.imageFile;
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






module.exports = UserController;
