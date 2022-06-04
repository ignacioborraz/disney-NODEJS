const passport = require('passport') 
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt

const db = require("../models")
const Usuario = db.Usuario

module.exports = passport.use(
    new jwtStrategy(
        {jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY},
        (jwt_payload,done) => {
            Usuario.findOne({_id:jwt_payload.id})
            .then(user => {
                console.log(user)
                if (user) {
                    return done(null, user)
                }
                else if (err) {
                    console.log(err)
                    return done(err, false);
                }
                else{
                    return done(null, false)
                }
                })
            .catch(err => {
                console.log(err)
                return done(err,false)
            })
        }
    )
)
