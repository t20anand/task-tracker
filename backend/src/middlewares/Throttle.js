const config = require('../config/config');
const rateLimit = require('express-rate-limit');

/**
 * Create an instance of IP rate-limiting middleware.
 * 
 * @param {Object} options - An object containing optional configuration parameters.
 * @param {number|null} options.limit - The maximum number of requests allowed per window (default from config).
 * @param {number|null} options.duration - The duration of the rate limiting window in seconds (default from config).
 * @param {string|null} options.message - The message to send when the rate limit is exceeded (default from config).
 * @returns  - The middleware that rate-limits clients based on configuration.
 */
const throttle = (throttleOptions = {}) => {
    const { limit, duration, message } = throttleOptions;

    const options = {
        limit: limit ?? config.api.limit,
        duration: (duration) ? duration * 1000 : config.api.duration,
        message: message ?? config.api.message,
    }

    return rateLimit({
        windowMs: options.duration, //  The rate limiting window duration in milliseconds.
        limit: options.limit, // The maximum number of requests allowed per window.
        message: options.message, // The message to send when rate limit is exceeded.
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers.
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    });
}

module.exports = throttle;