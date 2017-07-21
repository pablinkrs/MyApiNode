'use strict'

var fs = require("fs");
var path = require("path");
var bcrypt = require("bcrypt-nodejs");
var moment = require("moment");
var User = require("../model/user");
var jwt = require("../service/jwt");

function index (req,res){
  res.status(200).send({mensaje: "hola k ace"});
}
function create (req,res){
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
}
function login(req,res){
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
}
function update(req,res){
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
}
function avatar(req,res){
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
}
function getImageFile(req,res){
  var imageFile = req.params.imageFile;
  fs.exists("./public/images/"+imageFile,function(exists){
    if(exists){
      res.sendFile(path.resolve("./public/images/"+imageFile));
    } else {
      res.status(200).send({mensaje: "no existe archivo"});
    }
  });
}
module.exports = {
  index,
  create,
  login,
  update,
  avatar,
  getImageFile
};
