const User = require('../Models/user');
const UserDb = require('./utils')(User);

module.exports = UserDb;