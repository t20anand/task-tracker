const express = require('express');
const ApiRoute = express.Router();
const TaskController = require('../../controllers/TaskController');
const PriorityController = require('../../controllers/PriorityController');
const AuthController = require('../../controllers/AuthController');
const passport = require('passport')

// const PriorityRequestValidator = require('../../requests/PriorityRequest');

// ApiRoute.post('/priority', [PriorityRequestValidator], PriorityController.create);


ApiRoute.post('/priority', passport.authenticate('accessToken', { session: false }), PriorityController.create);
ApiRoute.get('/priority', passport.authenticate('accessToken', { session: false }), PriorityController.findAll);
ApiRoute.get('/priority/:id', passport.authenticate('accessToken', { session: false }), PriorityController.findById);
ApiRoute.put('/priority/:id', passport.authenticate('accessToken', { session: false }), PriorityController.update);
ApiRoute.delete('/priority/:id', passport.authenticate('accessToken', { session: false }), PriorityController.delete);

ApiRoute.post('/task', passport.authenticate('accessToken', { session: false }), TaskController.create)
ApiRoute.get('/task', passport.authenticate('accessToken', { session: false }), TaskController.findAll);
ApiRoute.get('/task/:id', passport.authenticate('accessToken', { session: false }), TaskController.findById);
ApiRoute.put('/task/:id', passport.authenticate('accessToken', { session: false }), TaskController.update);
ApiRoute.patch('/task/complete/:id', passport.authenticate('accessToken', { session: false }), TaskController.completeTask);
ApiRoute.delete('/task/:id', passport.authenticate('accessToken', { session: false }), TaskController.delete);

ApiRoute.post('/auth/register', AuthController.register)
ApiRoute.post('/auth/login', AuthController.login)
ApiRoute.post('/auth/change-password', passport.authenticate('accessToken', { session: false }), AuthController.changePassword)
ApiRoute.post('/auth/refresh-token', passport.authenticate('refreshToken', { session: false }), AuthController.refreshToken)
ApiRoute.get('/auth/logout', AuthController.logout)


module.exports = ApiRoute;