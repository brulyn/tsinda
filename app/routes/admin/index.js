module.exports = function (app) {
    var index = require('../../controllers/admin/index.server.admin.controller');
    //var users = require('../controllers/users.server.controller');
    app.get('/admin', index.render);
    app.post('/admin/save', index.saveContent);
};