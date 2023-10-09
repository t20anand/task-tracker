const jwt = require('jsonwebtoken');
const config = require('../config/config');

const setAccessTokensAndCookies = (res, user) => {
    const accessToken = jwt.sign({ sub: user._id }, config.jwt.secretKey, { expiresIn: config.jwt.ttl });
    const refreshToken = jwt.sign({ sub: user._id }, config.jwt.secretKey, { expiresIn: config.jwt.refreshTtl });

    res.cookie(config.jwt.accessTokenKey, accessToken, {
        maxAge: 300000, //5 min
        httpOnly: true,
    })

    res.cookie(config.jwt.refreshTokenKey, refreshToken, {
        maxAge: 8.64e7, // 24 hr
        httpOnly: true,
    });
}

const expireAccessTokensAndCookies = (res) => {
    res.clearCookie(config.jwt.accessTokenKey)

    res.clearCookie(config.jwt.refreshTokenKey);
}


const generateAccessToken = (user) => {
    const accessToken = jwt.sign({ sub: user._id }, config.jwt.secretKey, { expiresIn: config.jwt.ttl });
    return accessToken;
}

const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign({ sub: user._id }, config.jwt.secretKey, { expiresIn: config.jwt.refreshTtl });
    return refreshToken;
}

module.exports = {
    setAccessTokensAndCookies,
    expireAccessTokensAndCookies,
    generateAccessToken,
    generateRefreshToken,
};