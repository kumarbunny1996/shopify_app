const bodyParser = require('body-parser');
const registerRoutes = require('./registerRoute');
const loginRoutes = require('./loginRoute');
const usersRoutes = require('./usersRoutes');
const sellersRoutes = require('./sellersRoutes');

const init = (app) => {
    app.use(bodyParser.json({ limit: "50mb" }));
    //api routes to app
    app.use('/api/users/register', registerRoutes);
    app.use('/api/users/login', loginRoutes);
    //users api authorize to access
    app.use('/api/users', usersRoutes);
    //sellers apis
    app.use('/api/sellers', sellersRoutes);
}

module.exports = init;