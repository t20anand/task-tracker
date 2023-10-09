const PriorityModel = require("../models/PriorityModel");


const PriorityService = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
PriorityService.create = async (data, createdBy) => {
    return await PriorityModel({
        title: data.title,
        rank: data.rank,
        createdBy: createdBy,
    }).save();
}


/**
 * 
 * @param {*} priorityId 
 * @param {*} data 
 * @returns 
 */
PriorityService.update = async (priorityId, data) => {
    return await PriorityModel.findByIdAndUpdate(priorityId, {
        title: data.title,
        rank: data.rank,
        updatedAt: Date.now(),
    }, { new: true });
}


/**
 * 
 * @param {*} priorityId 
 * @returns 
 */
PriorityService.findById = async (priorityId) => {
    return await PriorityModel.findById(priorityId);
}


/**
 * 
 * @param {*} query 
 * @returns 
 */
PriorityService.findAll = async (query, user) => {
    const filterQuery = await buildFilterQuery(query, user);
    console.log('findall', filterQuery);

    return await PriorityModel.find(filterQuery)
        .sort({ rank: 1 });
}


/**
 * 
 * @param {*} priorityId 
 * @returns 
 */
PriorityService.delete = async (priorityId) => {
    return await PriorityModel.findByIdAndUpdate(priorityId, {
        deletedAt: Date.now(),
    }, { new: true });
}



module.exports = PriorityService;


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