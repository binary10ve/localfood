
var express = require('express'),
    app = express(),
    mailer = require('express-mailer'),
    settings = require('../../config/settings');

    app.set('views', __dirname + '/../views');
    app.set('view engine', 'jade');

// create reusable transport method (opens pool of SMTP connections)
mailer.extend(app, {
  from: 'snapav.clarice@gmail.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'snapav.clarice@gmail.com',
    pass: 'clt_sav_2014'
  }
});

exports.sentMailVerificationLink = function(user, token, url) {
    console.log("token",token);
     app.mailer.send('../views/mailer/signup', {
        to: user.username, // REQUIRED. This can be a comma delimited string just like a normal email to field.
        subject: "Welcome to Foodie", // REQUIRED.
        user : user,
        verifyEmailUrl : url + '/?' + 'token=' + token // All additional properties are also passed to the template as local variables.
        }, function (err) {
        if (err) {
      // handle error
            console.log(err);
            return;
        }
        });
};

exports.sentMailForgotPassword = function(user, token, url) {
    console.log("token",token);
    app.mailer.send('../views/mailer/forgotPassword', {
        to: user.username, // REQUIRED. This can be a comma delimited string just like a normal email to field.
        subject: "Welcome to Foodie", // REQUIRED.
        user : user,
        forgotPasswordUrl : url + '/?' + 'token=' + token // All additional properties are also passed to the template as local variables.
        }, function (err) {
        if (err) {
      // handle error
            console.log(err);
            return;
        }
        });
};


exports.sendErrorStackTrace = function(error,req) {

     app.mailer.send('../views/mailer/error', {
        to: 'saneilnaik11@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.
        subject: "Foodie Error Alert!!", // REQUIRED.
        error : error,
        req : req
        }, function (err) {
        if (err) {
      // handle error
            console.log(err);
            return;
        }
        });
};
