var User = require('../models/user'),
    JSONWebToken = require('jsonwebtoken'),
    passport = require('passport'),
    settings = require('../../config/settings');
    util = require('../helper/util'),
    mailer  = require('../helper/mailer'),
    Facebook = require('facebook-node-sdk'),
    google = require('googleapis'),
    OAuth2 = google.auth.OAuth2;





module.exports.verifyEmail = function(req, res){
   JSONWebToken.verify(req.body.token, settings.privateKey, function(err, decoded) {
          console.log("in verify","decoded,", decoded)
            if(decoded === undefined) return res.status(403).json({message : "Invalid verification link"});
            console.log("decoded",decoded);
            User.find({
                id :decoded.id,
                username : decoded.username
            }, function(err, user){
                if(err){
                    return res.status(500).json(err);
                }
                if(user){
                    User.update({
                        id :decoded.id
                    },{ $set: { isVerified : true }},{}, function(){
                        return res.status(200).json({message :  "Account sucessfully verified"});
                    });

                }else{
                    return res.status(403).json({message : "Invalid verification link"});
                }
            })

        });
};


module.exports.resendVerificationEmail = function(req, res) {
  User.findByUsername(req.body.username,function(err,user){
      if(user){
          if(user.isVerified) return res.status(200).json({message : "Your email address is already verified"});
          var tokenData = {
              username: user.username,
              id : user.id
          };
          var token = JSONWebToken.sign(tokenData, settings.privateKey);
          mailer.sentMailVerificationLink(user,token,req.body.hostURL);
          res.status(200).json({message : "Account verification link is sucessfully sent to your email id"});
      }else{
          res.status(401).json({message : "Invalid username or password"})
      }
  })

};


module.exports.login = function(req, res, next){
  passport.authenticate('local', { sessions: false }, function(err, user, info){
    if(err){
      res.status(500).json(err);
      return next(err);
    }

    if(!user){
      res.status(401).json(info);
      return next(info);
    }

    if(user && !user.isVerified){
      res.status(401).json({message : "User not verified. Please check email"});
      return next(info);
    }

    //user has authenticated correctly thus we create a JWT token
    var token = JSONWebToken.sign({
        id: user.id,
        username: user.username
    }, settings.privateKey);

    console.log(token, settings.privateKey)
    res.json({ token : token });

  })(req, res, next);
};


//module.exports.logout = function(req, res, next){
//
//};

//module.exports.loginWithFacebook = function(req, res, next){
//  facebook = new Facebook({ appID: '1682681685349453', secret: '3946b0b791b493e6667d078ae08cbb86' }).setAccessToken(req.body.accessToken);
//facebook.api('/me?&fb_exchange_token=access_token&access_token=' + req.body.accessToken , function(err, data) {
//  console.log(err,data);
//  if(err){
//    res.json({ error : err });
//  }else{
//      Model.User
//        .findOrCreate({ where : {socialId : data.id,isVerified : true}})
//        .spread(function(user, created) {
//          console.log(user.get({
//            plain: true
//        }))
//           var token = JSONWebToken.sign({
//                        id: user.id,
//                        socialId: user.socialId
//                        }, settings.privateKey);
//           res.json({ token : token });
//        })
//
//  }
//
//});
//};

//
module.exports.forgotPassword = function(req, res){
    User.findByUsername(req.body.username,function(err,user){
        if(user){
            var tokenData = {
                    username: user.username,
                    id: user.id
                },
                token = JSONWebToken.sign(tokenData, settings.privateKey);
            mailer.sentMailForgotPassword(user,token, req.body.hostURL);
            res.status(200).json({message : "Instruction to reset password is sent vial email"})
        }else{
            res.status(401).json({message : "User with this email doesn't exists in the system"});
        }
    })
};
//
//
//
module.exports.resetPassword = function(req, res){
   JSONWebToken.verify(req.body.token, settings.privateKey, function(err, decoded) {
          console.log("in verify","decoded,", decoded)
            if(decoded === undefined) return res.status(403).json({message : "Invalid Reset Password link"})
       User.find({
           id :decoded.id,
           username : decoded.username
       }, function(err,user){
           if(err){
               return res.status(403).json({message : "Invalid Reset Password link"});
           }
           if(user){
               User.update({
                   id :decoded.id
               },{ $set: {  password : util.encrypt(req.body.password)}},{}, function(){
                   return res.status(200).json({message :  "Password Reset Successfully"});
               });

           }
       });

        });
};


module.exports.create = function(req, res, next){
    User.register(new User({username: req.body.username}), req.body.password, function(err) {
        if (err) {
            console.log('error while user register!', err);
            return next(err);
        }

        console.log('user registered!');

        User.findByUsername(req.body.username, function(err, user){
            var tokenData = {
                username: user.username,
                id : user.id
            };
            var token = JSONWebToken.sign(tokenData, settings.privateKey);
            mailer.sentMailVerificationLink(user,token,req.body.hostURL);
            return  res.status(201).json({ token : token});
        })


    });
};
