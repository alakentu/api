const UserModel = require('../models/user.model');
const cacheUtil = require('../utils/cache.util');

exports.createUser = (user) => {
    return UserModel.create(user);
}

/**
 * Finds a user by their username in the UserModel.
 *
 * @param {string} username - The username of the user to find.
 * @return {Promise<UserModel>} - Returns a promise that resolves to the user with the specified username, or null if not found.
 */
exports.findUserByUsername = (username) => {
    return UserModel.findOne({
        where: {
            username: username
        }
    })
}

/**
 * Finds a user by email.
 *
 * @param {string} email - The email of the user to find.
 * @return {Promise<UserModel|null>} A promise that resolves with the user object if found, or null if not found.
 */
exports.findUserByEmail = (email) => {
    return UserModel.findOne({
        where: {
            email: email
        }
    })
}

/**
 * Finds a user by their ID.
 *
 * @param {number} id - The ID of the user.
 * @return {Promise<UserModel>} - A promise that resolves to the user model if found, or null if not found.
 */
exports.findUserById = (id) => {
    return UserModel.findByPk(id);
}

exports.logoutUser = (token, exp) => {
    const now = new Date();
    const expire = new Date(exp * 1000);
    const milliseconds = expire.getTime() - now.getTime();
    /* ----------------------------- BlackList Token ---------------------------- */
    return cacheUtil.set(token, token, milliseconds);
}