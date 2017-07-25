'use strict'

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "pablo2389";


exports.createToken = function(user){
  var payload = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix
  };

  return jwt.encode(payload, secret);
};

exports.ensureAuth = function(req, res, next){
  if(!req.headers.authorization){
    return res.status(403);
  }

  var token = req.headers.authorization.replace(/["']+/g,"");
  try {
    var payload = jwt.decode(token,secret);

    if(payload.exp <= moment().unix()){
      return res.status(401);
    }

  } catch (e) {
    console.log(e);
    return res.status(404);
  }

  req.user = payload;

  next();
};
