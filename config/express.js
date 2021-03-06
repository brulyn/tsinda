var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    flash = require('connect-flash'),
    bcrypt = require('bcrypt-nodejs'),
    exphbs = require('express3-handlebars'),
    passport = require('passport'),
    favicon = require('serve-favicon');
    
module.exports = function () {
    var app = express();
    app.use(favicon(__dirname + '/../public/images/t_logo.jpg'));
    if (process.env.NODE_ENV == 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV == 'production') {
        app.use(compress());
    }
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    /*
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    */
    var store = new MongoDBStore(
      {
        uri: config.db,
        collection: 'mySessions'
      });
    store.on('error', function(error) {
      assert.ifError(error);
      assert.ok(false);
    });
 
    app.use(require('express-session')({
      secret: config.sessionSecret,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
      },
      store: store,
      // Boilerplate options, see: 
      // * https://www.npmjs.com/package/express-session#resave 
      // * https://www.npmjs.com/package/express-session#saveuninitialized 
      resave: true,
      saveUninitialized: true
    }));

    // view engine setup
    app.set('views', __dirname + '/../app/views');
    
    app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: __dirname + '/../app/views/layouts' }));
    app.set('view engine', 'handlebars');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/index.js')(app);
    require('../app/routes/users.js')(app);
    require('../app/routes/materials.js')(app);
    require('../app/routes/tests.js')(app);
    require('../app/routes/admin/index.js')(app);

    app.locals.materials = [];
    app.locals.chapters = [];
    app.locals.content_index = 0;
    app.locals.material_id = "";
    app.locals.number_material = 0;
    app.locals.number_chapters = 0;
    
    app.use(express.static(__dirname + '/../public'));
    return app;
};