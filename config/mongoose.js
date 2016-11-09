var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);

    require('../app/models/user');
    require('../app/models/material');
    require('../app/models/test');
    require('../app/models/chapter');
    require('../app/models/content');
    require('../app/models/prog');
    return db;
};