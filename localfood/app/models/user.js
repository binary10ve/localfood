const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
Schema = mongoose.Schema;

var  passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
    username: String,
    password: String,
    isVerified: Boolean,
    namak: String,
    pot : String,
    last: Date,
    attempts: Number
});

User.plugin(passportLocalMongoose,{
    saltField : 'namak',
    hashField : 'pot'
});

User.statics.findOneOrCreate = function findOneOrCreate(condition, doc, callback) {
    const self = this;
    self.findOne(condition, (err, result) => {
        return result
            ? callback(err, result)
            : self.create(doc, (err, result) => {
            return callback(err, result,true);
});
});
};

module.exports = mongoose.model('User', User);