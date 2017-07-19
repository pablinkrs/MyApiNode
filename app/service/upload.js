'use strict'

var multipart = require("connect-multiparty");

exports.uploadFiles = function(){
  var uploadFiles = {
    avatar: multipart({uploadDir: "./public/images"})
  };
  return uploadFiles;
};
