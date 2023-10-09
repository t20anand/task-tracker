require('dotenv').config();

const config = {};

/**
 * Api Rate Limit Configuration
 */
config.api = {};
config.api.duration = process.env.API_LIMIT_DURATION ?? 600000; //In milliseconds (1 min = 60000 millisec)
config.api.limit = process.env.API_LIMIT ?? 1000;
config.api.message = process.env.API_LIMIT_MSG ?? 'Too many attempts!, please try again after an hour';


/**
 * Database Configuration
 */
config.mongoDB = {};
config.mongoDB.url = process.env.MONGODB_URL ?? 'mongodb://root:password@localhost:27017/task?authSource=admin';


/**
 * JWT Configuration
 */
config.jwt = {};
config.jwt.accessTokenKey = 'accessToken';
config.jwt.refreshTokenKey = 'refreshToken';
config.jwt.secretKey = process.env.SECRET_KEY ?? 'secret';
config.jwt.ttl = '15m';
config.jwt.refreshTtl = '24h';


module.exports = config;