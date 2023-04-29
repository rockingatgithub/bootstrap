const passport = require('passport')
const Student = require('../model/student')
const passportLocal = require('passport-local').Strategy

const verifyFunction = async function ( roll, passowrd, done) {
    const student = await Student.findOne({ roll: roll })
    if(student){
        return done(null, student);
    }
    return done(null, false);
}

passport.use(new passportLocal({ usernameField: 'roll', passwordField: 'name'  }, verifyFunction))

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async function(id, done) {

    // console.log("desreailized",id)
    const student = await Student.findById(id)
    return done(null, student);
    
  });

module.exports = passport