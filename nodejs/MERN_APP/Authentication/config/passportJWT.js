const passport = require('passport');
const Student = require('../model/student');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'mykey';

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {

    try{
        const student = await Student.findById(jwt_payload)
        return done(null, student);
    }catch(err) {
        if (err) {
            return done(err, false);
        } else {
            return done(null, false);
        }
    }
}))

module.exports = passport