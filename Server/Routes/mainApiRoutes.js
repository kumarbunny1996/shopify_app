const bodyParser = require('body-parser');
const registerRoutes = require('./registerRoute');
const loginRoutes = require('./loginRoute');
const usersRoutes = require('./usersRoutes');

const init = (app) => {
    app.use(bodyParser.json());
    //api routes to app
    app.use('/api/users/register', registerRoutes);
    app.use('/api/users/login', loginRoutes);
    //users api authorize to access
    app.use('/api/users', usersRoutes);
}

module.exports = init;