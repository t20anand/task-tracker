const UserModel = require("../models/UserModel");

const UserService = {};

/**
 * 
 * @param {*} data 
 * @returns 
 */
UserService.create = async (data) => {
    return await UserModel({
        name: data.name,
        email: data.email,
        password: data.password,
    }).save();
}


/**
 * 
 * @param {*} userId 
 * @param {*} data 
 * @returns 
 */
UserService.update = async (userId, data) => {
    return await UserModel.findByIdAndUpdate(userId, {
        name: data.name,
        email: data.email,
        updatedAt: Date.now(),
    }, { new: true });
}


/**
 * 
 * @param {*} userId 
 * @param {*} newPassword 
 * @returns 
 */
UserService.updatePassword = async (userId, newPassword) => {
    return await UserModel.findByIdAndUpdate(userId, {
        password: newPassword,
        updatedAt: Date.now(),
    }, { new: true });
}


/**
 * 
 * @param {*} userId 
 * @returns 
 */
UserService.findById = async (userId) => {
    return await UserModel.findById(userId);
}

/**
 * 
 * @param {*} email 
 * @returns 
 */
UserService.findByEmail = async (email) => {
    return await UserModel.findOne({ email: email });
}


/**
 * 
 * @param {*} query 
 * @returns 
 */
UserService.findAll = async (query) => {
    const filterQuery = await buildFilterQuery(query);
    return await UserModel.find(filterQuery).sort({ createdAt: 1 });
}


/**
 * 
 * @param {*} userId 
 * @returns 
 */
UserService.delete = async (userId) => {
    return await UserModel.findByIdAndUpdate(userId, {
        deletedAt: Date.now(),
    }, { new: true });
}



module.exports = UserService;


/**
 * Build the filter query objects
 *
 * @param {*} query
 * @returns
 */
const buildFilterQuery = (query) => {
    let filter = { deletedAt: null };

    if (!query) return filter;

    if (query.project) {
        filter.Project = query.project;
    }
    return filter;
};