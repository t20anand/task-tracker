const { TASK_STATUS } = require("../config/constants");
const TaskService = require("../services/TaskService");
const asyncErrorHandler = require('./../utils/asyncErrorHandler');
const CustomError = require('./../utils/CustomError');

const TaskController = {
    create: asyncErrorHandler(async (req, res) => {
        const { user, body } = req;
        const task = await TaskService.create(body, user._id);

        res.status(201).json({
            status: 'success',
            data: {
                task
            }
        })
    }),

    update: asyncErrorHandler(async (req, res, next) => {
        const { body, params } = req;
        const taskId = params.id;

        const updatedTask = await TaskService.update(taskId, body);

        if (!updatedTask) {
            const error = new CustomError('Task with that ID is not found!', 404);
            return next(error);
        }

        res.status(200).json({
            status: "success",
            data: {
                updatedTask
            }
        });
    }),

    completeTask: asyncErrorHandler(async (req, res, next) => {
        const taskId = req.params.id;
        const status = TASK_STATUS.completed;

        const updatedTask = await TaskService.updateStatus(taskId, status);

        if (!updatedTask) {
            const error = new CustomError('Task with that ID is not found!', 404);
            return next(error);
        }

        res.status(200).json({
            status: "success",
            data: {
                updatedTask
            }
        });
    }),

    findAll: asyncErrorHandler(async (req, res) => {
        const taskList = await TaskService.findAll(req.query, req.user);

        res.status(200).json({
            status: 'success',
            length: taskList.length,
            data: {
                taskList
            }
        });
    }),

    findById: asyncErrorHandler(async (req, res, next) => {
        const taskId = req.params.id;

        const task = await TaskService.findById(taskId);
        if (!task) {
            const error = new CustomError('Task with that ID is not found!', 404);
            return next(error);
        }

        res.status(200).json({
            status: 'success',
            data: {
                task
            }
        });
    }),

    delete: async (req, res, next) => {
        const taskId = req.params.id;

        const task = await TaskService.delete(taskId);
        if (!task) {
            const error = new CustomError('Task with that ID is not found!', 404);
            return next(error);
        }

        res.status(200).json({
            status: 'success',
            data: null
        });
    }
}

module.exports = TaskController;

