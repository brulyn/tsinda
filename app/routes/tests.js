module.exports = function (app) {
    var tests = require('../controllers/tests.server.controller');
    app.get('/tests', tests.render);
    app.get('/test/:id', tests.renderTest);
};