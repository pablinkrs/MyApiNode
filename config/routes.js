'use strict'

var express = require("express");

var UserController = require("../app/controller/user");
var ArtistController = require("../app/controller/artist");

var api = express.Router();
var jwt = require("../app/service/jwt");
var mdFile = require("../app/service/upload");

var files = mdFile.uploadFiles();

/*  rutas de Usuario */

api.get("/probando",jwt.ensureAuth,UserController.index);
api.post("/create",UserController.create);
api.put("/update/:id",jwt.ensureAuth,UserController.update);
api.post("/login",UserController.login);
api.get("/getavatar/:imageFile",UserController.getImageFile);
api.post("/avatar/:id",[jwt.ensureAuth, files.avatar],UserController.avatar);

/*  rutas de Artista */

api.get("/artist",jwt.ensureAuth, ArtistController.getArtist);

module.exports = api;
