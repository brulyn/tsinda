module.exports = function (app) {
    var materials = require('../controllers/materials.server.controller');
    app.get('/materials', materials.render);

    app.post('/read', materials.renderChapters);

    app.get('/read/:id', materials.renderContent);

    app.get('/done/:id', materials.done);

    app.get('/next/:id', materials.next);

    app.get('/back/:id', materials.back);
};