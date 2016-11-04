var passport = require('passport'),
    users = require('./users.server.controller');

exports.render = function (req, res) {
    /*
    if (req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }

    */
    if (req.isAuthenticated()) {
        var image_url = "";
        res.render(
            'index', {
                title: 'Tsinda Platform',
                user: req.user,
                date: req.user.created.toDateString(),
                img_url: (req.user.provider == 'facebook') ? req.user.providerData.picture.data.url :req.user.providerData.image.url
            }
        );
        users.myMaterials();
    } else {

        res.render(

            'login', {
                title: 'Sign-in Form',
                layout: false
            }
        );

    }

};