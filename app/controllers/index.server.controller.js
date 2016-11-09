var passport = require('passport'),
    Materials = require('mongoose').model('Material'),
    users = require('./users.server.controller');

exports.render = function (req, res) {
    /*
    if (req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }

    */


    if (req.isAuthenticated()) {
        var image_url = "";
        Materials.find({ title: { $in: req.user.my_materials } }).count(function(err, n){
            req.app.locals.number_materials = n;
            res.render(
            'index', {
                title: 'Tsinda Platform',
                user: req.user,
                date: req.user.created.toDateString(),
                number_materials: req.app.locals.number_materials,
                img_url: (req.user.provider == 'facebook') ? req.user.providerData.picture.data.url :req.user.providerData.image.url
            }
        );
        });
        
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