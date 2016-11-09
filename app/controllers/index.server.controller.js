var passport = require('passport'),
    Materials = require('mongoose').model('Material'),
    Chapters = require('mongoose').model('Chapter'),
    Users = require('mongoose').model('User'),
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
            var my_materials_ids = [];
            Users.find({ section: req.user.section }).count(function(err, n_us){
                Materials.find( { title: {$in: req.user.my_materials}}, function(err, materials_list){
                    for(var i=0; i<materials_list.length; i++){
                        my_materials_ids.push(materials_list._id);
                    }
                    Chapters.find( {material_id: {$in: my_materials_ids}}).count(function(err, number_chapters){
                        req.app.locals.number_chapters = number_chapters;
                        res.render(
                        'index', {
                            title: 'Tsinda Platform',
                            user: req.user,
                            date: req.user.created.toDateString(),
                            number_materials: n,
                            number_mates: n_us,
                            number_chapters: number_chapters,
                            img_url: (req.user.provider == 'facebook') ? req.user.providerData.picture.data.url :req.user.providerData.image.url
                        });
                    })
                    
                });
                    
            })
            
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