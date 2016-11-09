var User = require('mongoose').model('User'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Material = require('mongoose').model('Material'),
    Prog = require('mongoose').model('Prog'),
    passport = require('passport');
var getErrorMessage = function (err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].
                message;
        }
    }
    return message;
};
exports.renderSignin = function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Sign-in Form',
            layout: false,
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};
exports.renderSignup = function (req, res, next) {
    if (!req.user) {
        res.render('signup', {
            title: 'Sign-up Form',
            layout: false,
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};
exports.signup = function (req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;
        user.provider = 'local';
        user.save(function (err) {
            if (err) {
                var message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/signup');
            }
            req.login(user, function (err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};
exports.signout = function (req, res) {
    req.logout();
    res.redirect('/signin');
};

exports.saveOAuthUserProfile = function (req, profile, done) {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function (err, user) {
        if (err) {
            return done(err);
        } else {
            if (!user) {
                var possibleUsername = profile.username ||
                    ((profile.email) ? profile.email.split('@')[0] : '');
                User.findUniqueUsername(possibleUsername, null,
                    function (availableUsername) {
                        profile.username = availableUsername;
                        user = new User(profile);
                        user.save(function (err) {
                            if (err) {
                                var message = _this.getErrorMessage(err);
                                req.flash('error', message);
                                return res.redirect('/signup');
                            }
                            return done(err, user);
                        });
                    });
            } else {
                return done(err, user);
            }
        }
    });
};

exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
    next();
};

exports.myMaterials = function (req, res, next) {
    User.find({ my_materials: 1 }, function (err, docs) {
        console.log('my materials are ' + docs);
    });
};

/*
exports.updateMyProfile1 = function (req, res, next) {
    User.findOne({ username: req.user.username }, function (err, user) {
        var section = req.body.division + req.body.year_studies;
        var my_materials = [];
        Material.find({ compulsory_for: { $in: ["", section] } }, function (err, material) {
            for (var i = 0; i < material.length; i++) {
                //user.my_materials.insert(material[i]);
                my_materials.push(material[i]);
            }
        });
        user.school = req.body.school;
        user.section = section;
        user.division = req.body.division;
        user.year_studies = req.body.year_studies;
        user.my_materials = my_materials;
        for(var i=0; i<my_materials.length; i++){
            //user.my_materials.push(my_materials[i].title);
        }


            user.save(function (err) {
                if (err) {
                    console.log("My Materials   !!!!!!!!!!!!!!!!!!!!!");

                } else {
                    console.log("Sucessfully saved!!!!!!!!!!!!!!!!!!!!!"+ my_materials[0].title);
                    res.redirect('/');
                }
            });
    });
};
*/

exports.updateMyProfile = function (req, res, next) {
    var section = req.body.division + req.body.year_studies;
    var my_m = [];
    var id_materials = [];
    var title_materials = [];  

    Material.find({ compulsory_for: { $in: ["", section] } }, function (err, material) {
        for (var i = 0; i < material.length; i++) {
            //user.my_materials.insert(material[i]);
            my_m.push(material[i]);
            id_materials.push(my_m[i]._id);
            title_materials.push(my_m[i].title);            
        }

        User.update(
            {username: req.user.username},
            {
                $unset: {my_materials:1}
            },
            function(err, d){
                User.findOneAndUpdate(
                    {username: req.user.username },
                    {  
                        $addToSet: {my_materials: {$each: title_materials} },
                        $set: {
                            school: req.body.school,
                            division: req.body.division,
                            year_studies: req.body.year_studies,
                            section: section
                        }
                    },
                    { upsert:true },
                    function(err, affct){
                        if(err){
                            console.log(err);
                        }

                        //console.log("!!!!!!!!!!!!!!!!!" + id_materials);
                        res.redirect('/');
                    }
                );
            }
        );
    });     
};



exports.renderUpdate = function (req, res, next) {
    Prog.findOne({_id: req.user._id},function(err, user){
        if(!user){
            var progress = new Prog({
                user_id: req.user._id,
                user_progress: 0
            })
            progress.save(function(err, user){
                res.render('update', {
                    title: 'Update Profile',
                    user: req.user,
                    date: req.user.created.toDateString(),
                    img_url: (req.user.provider == 'facebook') ? req.user.providerData.picture.data.url : req.user.providerData.image.url,
                    messages: req.flash('error')
                });
            })
        }else{
            res.render('update', {
                title: 'Update Profile',
                user: req.user,
                date: req.user.created.toDateString(),
                img_url: (req.user.provider == 'facebook') ? req.user.providerData.picture.data.url : req.user.providerData.image.url,
                messages: req.flash('error')
            });
        }
    })
    
}