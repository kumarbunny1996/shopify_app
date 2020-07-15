const User = require('../Models/user');
const UserDb = require('../Utils/utils')(User);

module.exports = UserDb;