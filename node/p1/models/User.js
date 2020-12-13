const mongoose = require('mongoose');
const passportLocaMongoose = require('passport-local-mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    name:String,
    email:String
});


userSchema.plugin(passportLocaMongoose, { usernameField:'email' });


module.exports=mongoose.model('user', userSchema);