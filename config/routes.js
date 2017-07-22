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
api.put("/updateUser/:id",jwt.ensureAuth,controllers.User.update);
api.post("/login",controllers.User.session.login);
api.post("/logout",controllers.User.session.logout);
api.post("/avatar/:id",[jwt.ensureAuth, files.avatar],controllers.User.avatar.upload);
api.post("/getavatar/:imageFile",controllers.User.avatar.get);

api.post("/oneArtist/:id",jwt.ensureAuth, controllers.Artist.getOne);
api.post("/createArtist",jwt.ensureAuth, controllers.Artist.create);
api.post("/listArtist/:page?",jwt.ensureAuth, controllers.Artist.getAll);

module.exports = api;
