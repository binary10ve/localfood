var LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  settings = require('./settings'),
    User = require('../app/models/user'),
    passport = require('passport');


var opts = {};

opts.secretOrKey = settings.privateKey;


module.exports = function (passport, config) {
//passport.use(new LocalStrategy({
//    usernameField: 'username',
//    passwordField: 'password'
//  },
//  function(username, password, done) {
//    User.findOne({ where : { username: username }})
//    .then(function (user) {
//      if (!user || !user.authenticate(password)) {
//        return done(null, false, { message: 'Incorrect username or Password.' });
//      }
//      return done(null, user);
//    })
//    .catch(function(err){
//      if (err) { return done(err); }
//    })
//  }
//));
    passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());


//
//passport.use(new FacebookStrategy({
//        clientID: '1682681685349453'
//      , clientSecret: '3946b0b791b493e6667d078ae08cbb86'
//      , callbackURL: 'http://localhost:3000/api/v1//auth/facebook/callback'
//    },
//    function(accessToken, refreshToken, profile, done) {
//      console.log("accessToken",accessToken, profile)
//      User.findOne({ 'facebook.id': profile.id }, function (err, user) {
//        if (err) { return done(err) }
//        if (!user) {
//          user = new User({
//              name: profile.displayName
//            , email: profile.emails[0].value
//            , username: profile.username
//            , provider: 'facebook'
//            , facebook: profile._json
//            , avatar: "http://graph.facebook.com/"+profile.id+"/picture?type=square"
//          })
//          user.save(function (err) {
//            if (err) console.log(err)
//            return done(err, user)
//          })
//        }
//        else {
//          return done(err, user)
//        }
//      })
//    }
//  ))
//
//passport.use(new GoogleStrategy({
//      clientID: config.google.clientID,
//      clientSecret: config.google.clientSecret,
//      callbackURL: config.google.callbackURL
//    },
//    function(accessToken, refreshToken, profile, done) {
//      User.findOne({ 'google.id': profile.id }, function (err, user) {
//        if (!user) {
//          // make a new google profile without key start with $
//          var new_profile = {}
//          new_profile.id = profile.id
//          new_profile.displayName = profile.displayName
//          new_profile.emails = profile.emails
//          user = new User({
//              name: profile.displayName
//            , email: profile.emails[0].value
//            , username: profile.username
//            , provider: 'google'
//            , google: new_profile._json
//          })
//          user.save(function (err) {
//            if (err) console.log(err)
//            return done(err, user)
//          })
//        } else {
//          return done(err, user)
//        }
//      })
//    }
//  ));

}