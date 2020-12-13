module.exports = (app) => {
    const User = require('../controllers/user.controller.js');

    // Create a new records
    app.post('/users', User.create);
}