const passport = require('passport');
const UserService = require('../services/UserService');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/CustomError');
const { setAccessTokensAndCookies, expireAccessTokensAndCookies, generateAccessToken, generateRefreshToken } = require('../utils/tokensAndCookiesHandler');

const AuthController = {
    register: asyncErrorHandler(async (req, res) => {
        const user = await UserService.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                user
            }
        })
    }),

    login: asyncErrorHandler(async (req, res, next) => {
        const { username, password } = req.body;

        const user = await UserService.findByEmail(username);

        if (!user) {
            const error = new CustomError('Invalid username or password!', 404);
            return next(error);
        }

        const isValidPassword = await user.isValidPassword(password);

        if (!isValidPassword) {
            const error = new CustomError('Invalid username or password!', 404);
            return next(error);
        }

        // TODO
        // setAccessTokensAndCookies(res, user)

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(200).json({
            status: 'success',
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken,
            }
        })
    }),

    changePassword: asyncErrorHandler(async (req, res, next) => {
        const { user, body } = req;
        const { password } = body

        const updatedUser = await UserService.updatePassword(user._id, password);

        if (!updatedUser) {
            const error = new CustomError('User not found!', 404);
            return next(error);
        }

        // TODO
        // expireAccessTokensAndCookies(res);

        res.status(200).json({
            status: 'success',
        })
    }),

    refreshToken: asyncErrorHandler(async (req, res, next) => {
        const { user } = req;

        // TODO
        // setAccessTokensAndCookies(res, user)

        const accessToken = generateAccessToken(user);

        res.status(200).json({
            status: 'success',
            data: {
                accessToken: accessToken
            }
        })
    }),

    logout: asyncErrorHandler(async (req, res, next) => {
        // TODO
        // expireAccessTokensAndCookies(res);

        res.status(200).json({
            status: 'success',
        })
    })
}

module.exports = AuthController;