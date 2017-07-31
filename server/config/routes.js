'use strict'

var express = require("express");

var controllers = require("../app/controller/master");

var api = express.Router();
var jwt = require("../app/service/jwt");
var mdFile = require("../app/service/upload");

var files = mdFile.uploadFiles();

api.post("/listUser",jwt.ensureAuth,controllers.User.getAll);
api.post("/oneUser/:id",jwt.ensureAuth,controllers.User.getOne);
api.post("/createUser",controllers.User.create);
api.post("/updateUser/",jwt.ensureAuth,controllers.User.update);
api.post("/login",controllers.User.session.login);
api.post("/uploadAvatar",[jwt.ensureAuth, files.avatar],controllers.User.avatar.upload);
api.post("/getavatar",controllers.User.avatar.get);

api.post("/listArtist/:page?",jwt.ensureAuth, controllers.Artist.getAll);
api.post("/oneArtist/:id",jwt.ensureAuth, controllers.Artist.getOne);
api.post("/createArtist",jwt.ensureAuth, controllers.Artist.create);
api.post("/uploadImgArtist",[jwt.ensureAuth, files.avatar],controllers.Artist.image.upload);
api.post("/deleteArtist",jwt.ensureAuth, controllers.Artist.delete);
api.post("/getImgArtist",controllers.Artist.image.get);

api.post("/createAlbum",jwt.ensureAuth, controllers.Album.create);

module.exports = api;
