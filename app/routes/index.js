module.exports = function (app) {
    var index = require('../controllers/index.server.controller');
    var users = require('../controllers/users.server.controller');
    app.get('/', index.render);
};