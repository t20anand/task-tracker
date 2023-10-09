const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserService = require('../services/UserService');
const config = require('../config/config');

const accessTokenValidator = (passport) => {
    // const options = {
    //     secretOrKey: process.env.SECRET_KEY,
    //     // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //     jwtFromRequest: (req) => {
    //         return req.cookies[config.jwt.accessTokenKey];
    //     },
    //     // issuer: process.env.JWT_ISSUER
    // }

    const options = {
        secretOrKey: process.env.SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }

    passport.use(config.jwt.accessTokenKey, new JwtStrategy(options, async (token, done) => {
        const user = await UserService.findById(token.sub);

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
}

const refreshTokenValidator = (passport) => {
    // const options = {
    //     secretOrKey: process.env.SECRET_KEY,
    //     jwtFromRequest: (req) => {
    //         return req.cookies[config.jwt.refreshTokenKey];
    //     },
    // }

    const options = {
        secretOrKey: process.env.SECRET_KEY,
        jwtFromRequest: (req) => {
            return req.body.refreshToken;
        },
    }

    passport.use(config.jwt.refreshTokenKey, new JwtStrategy(options, async (token, done) => {
        const user = await UserService.findById(token.sub);

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
}

module.exports = {
    accessTokenValidator,
    refreshTokenValidator
}