'use strict'

var mongo = require("mongoose");
var app = require("./config/server")

mongo.Promise = global.Promise;
mongo.connect("mongodb://localhost:27017/pablinkdb",(err,res) => {
  if(err){
    throw err;
  } else {
    app.listen(3000,function(){
      console.log("el servidor esta arriba");
    });
  }
});
