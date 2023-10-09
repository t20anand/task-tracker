const PriorityService = require('../services/PriorityService');
const asyncErrorHandler = require('./../utils/asyncErrorHandler');
const CustomError = require('./../utils/CustomError');

const PriorityController = {
    create: asyncErrorHandler(async (req, res) => {
        const { user, body } = req;
        const priority = await PriorityService.create(body, user._id);

        res.status(201).json({
            status: 'success',
            data: {
                priority
            }
        })
    }),

    update: asyncErrorHandler(async (req, res, next) => {
        const { body, params } = req;
        const priorityId = params.id;

        const updatedPriority = await PriorityService.update(priorityId, body);

        if (!updatedPriority) {
            const error = new CustomError('Priority with that ID is not found!', 404);
            return next(error);
        }

        res.status(200).json({
            status: "success",
            data: {
                updatedPriority
            }
        });
    }),

    findAll: asyncErrorHandler(async (req, res) => {
        const priorityList = await PriorityService.findAll(req.query, req.user);

        res.status(200).json({
            status: 'success',
            length: priorityList.length,
            data: {
                priorityList
            }
        });
    }),

    findById: asyncErrorHandler(async (req, res, next) => {
        const priorityId = req.params.id;

        const priority = await PriorityService.findById(priorityId);
        if (!priority) {
            const error = new CustomError('Priority with that ID is not found!', 404);
            return next(error);
        }

        res.status(200).json({
            status: 'success',
            data: {
                priority
            }
        });
    }),



    delete: asyncErrorHandler(async (req, res, next) => {
        const priorityId = req.params.id;

        const priority = await PriorityService.delete(priorityId, req);
        if (!priority) {
            const error = new CustomError('Priority with that ID is not found!', 404);
            return next(error);
        }

        res.status(200).json({
            status: 'success',
            data: null
        });
    })
}

module.exports = PriorityController;