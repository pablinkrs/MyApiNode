'use strict'

var express = require("express");
var UserController = require("../app/controller/user");

var api = express.Router();
var jwt = require("../app/service/jwt");
var mdFile = require("../app/service/upload");

var files = mdFile.uploadFiles();

api.get("/probando",jwt.ensureAuth,UserController.index);
api.post("/create",UserController.create);
api.put("/update/:id",jwt.ensureAuth,UserController.update);
api.post("/login",UserController.login);
api.post("/getavatar:imageFile",UserController.getImageFile);
api.post("/avatar/:id",[jwt.ensureAuth, files.avatar],UserController.avatar);

module.exports = api;
