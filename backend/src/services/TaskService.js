const TaskModel = require("../models/TaskModel");

const TaskService = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
TaskService.create = async (data, createdBy) => {
    return await TaskModel({
        title: data.title,
        description: data.description,
        priority: data.priority,
        deadline: data.deadline,
        createdBy: createdBy,
    }).save();
}


/**
 * 
 * @param {*} taskId 
 * @param {*} data 
 * @returns 
 */
TaskService.update = async (taskId, data) => {
    return await TaskModel.findByIdAndUpdate(taskId, {
        title: data.title,
        description: data.description,
        priority: data.priority,
        deadline: data.deadline,
        updatedAt: Date.now(),
    }, { new: true });
}

/**
 * 
 * @param {*} taskId 
 * @param {*} newStatus 
 * @returns 
 */
TaskService.updateStatus = async (taskId, newStatus) => {
    return await TaskModel.findByIdAndUpdate(taskId, {
        status: newStatus,
        updatedAt: Date.now(),
    }, { new: true });
}


/**
 * 
 * @param {*} taskId 
 * @returns 
 */
TaskService.findById = async (taskId) => {
    return await TaskModel.findById(taskId).populate('priority');
}


/**
 * 
 * @param {*} query 
 * @returns 
 */
TaskService.findAll = async (query, user) => {
    const filterQuery = await buildFilterQuery(query, user);

    return await TaskModel.find(filterQuery)
        .populate({ path: 'priority' })
        .sort({ deadline: 1 });
}


/**
 * 
 * @param {*} taskId 
 * @returns 
 */
TaskService.delete = async (taskId) => {
    return await TaskModel.findByIdAndUpdate(taskId, {
        deletedAt: Date.now(),
    }, { new: true });
}



module.exports = TaskService;


/**
 * Build the filter query objects
 *
 * @param {*} query
 * @returns
 */
const buildFilterQuery = (query, user) => {
    let filter = { deletedAt: null, createdBy: user._id };

    let queryString = JSON.stringify(query);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const queryObj = JSON.parse(queryString);

    return { ...queryObj, ...filter }
};