var Materials = require('mongoose').model('Material'),
    Contents = require('mongoose').model('Content'),
    Progs = require('mongoose').model('Prog'),
    Chapters = require('mongoose').model('Chapter'),
    mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

exports.render = function (req, res) {
    /*
    if (req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }
    */
    if (req.isAuthenticated()) {
        var materials = [];
        var chnks = [];
        var number_materials = 0;
        Materials.find({ title: { $in: req.user.my_materials } }, function (err, mats) {
            for (var i = 0; i < mats.length; i++) {
                materials.push(mats[i]);
                number_materials++;
            }
            req.app.locals.materials = materials;
            req.app.locals.material_id = "";
            req.app.locals.number_materials = number_materials;
            for (var i = 0; i < materials.length; i = i + 3) {
                chnks[i] = new Array();
                for (var j = i; j < i + 3; j++) {
                    chnks[i].push(materials[j]);
                }
            }
            res.render(
                'materials', {
                    title: 'Materials',
                    user: req.user,
                    date: req.user.created.toDateString(),
                    materials: req.app.locals.materials,
                    chunks: chnks,
                    number_materials: req.app.locals.number_materials,
                    img_url: (req.user.provider == 'facebook') ? req.user.providerData.picture.data.url : req.user.providerData.image.url
                }
            );
        })

    } else {
        res.render(

            'login', {
                title: 'Sign-in Form',
                layout: false
            }
        );
    }
};

exports.renderChapters = function (req, res) {
    if (req.isAuthenticated()) {
        var content_index = 1;
        var content = {
            title: req.body.material_title,
            body: "Enjoy the Course"
        };
        var chapters = [];
        req.app.locals.content_index = 0;
        req.app.locals.material_id = req.body.material_id;
        Chapters.find({ material: req.body.material_id }, function (err, chapter) {
            for (var i = 0; i < chapter.length; i++) {
                chapters.push(chapter[i]);
            }
            req.app.locals.chapters = chapters;
            //req.app.locals.content_index = 1;
            res.render(
                'chapters', {
                    title: 'Chapters',
                    user: req.user,
                    date: req.user.created.toDateString(),
                    chapters: req.app.locals.chapters,
                    content: content,
                    img_url: (req.user.provider == 'facebook') ? req.user.providerData.picture.data.url : req.user.providerData.image.url
                }
            );
        });
    }
};

exports.renderContent = function (req, res) {
    if (req.isAuthenticated()) {
        var content = "";
        var chapters = [];
        req.app.locals.content_index = 1;
        req.app.locals.material_id = req.params.id;
        Chapters.find({ material: req.body.material_id }, function (err, chapter) {
            for (var i = 0; i < chapter.length; i++) {
                chapters.push(chapter[i]);
            }
        });
        Contents.findOne({ chapter: req.params.id, content_index: req.app.locals.content_index }, function (err, cont) {
            res.render(
                'content', {
                    layout: 'read',
                    title: 'Content',
                    user: req.user,
                    date: req.user.created.toDateString(),
                    chapters: req.app.locals.chapters,
                    content: cont,
                    material_id: req.params.id,
                    show_next: true,
                    img_url: (req.user.provider == 'facebook') ? req.user.providerData.picture.data.url : req.user.providerData.image.url
                }
            );
        });
    } else {
        res.render(

            'login', {
                title: 'Sign-in Form',
                layout: false
            }
        );
    }
};

exports.done = function (req, res) {

    Contents.findById(req.params.id, function (err, doc) {
        if (err) {

        } else {
            doc.done = true;
            doc.save(function (err, doc) {
                backURL = req.header('Referer') || '/';
                // do your thang
                res.redirect(backURL);
            })
        }
    });
};

exports.next = function (req, res) {
    if (req.isAuthenticated()) {
        var content = "";
        var chapters = [];
        var contents = [];
        var show_back = false;
        var show_next = true;
        req.app.locals.content_index++;
        if (req.app.locals.content_index > 1) {
            show_back = true;
        }
        Chapters.find({ material: req.body.material_id }, function (err, chapter) {
            for (var i = 0; i < chapter.length; i++) {
                chapters.push(chapter[i]);
            }
        });
        Contents.find({ chapter: req.params.id }, function (err, content) {
            for (var i = 0; i < content.length; i++) {
                contents.push(content[i]);
            }

            Contents.findOne({ chapter: req.params.id, content_index: req.app.locals.content_index }, function (err, cont) {
                
                Prog.findOneAndUpdate(
                    { user_id: req.user._id},
                    { $set: { user_progress: 10}},
                    function(err, user){
                        if (req.app.locals.content_index >= contents.length) {
                            show_next = false;
                        }

                        res.render(
                            'content', {
                                layout: 'read',
                                title: 'Content',
                                user: req.user,
                                date: req.user.created.toDateString(),
                                chapters: req.app.locals.chapters,
                                material_id: req.app.locals.material_id,
                                content: cont,
                                show_back: show_back,
                                show_next: show_next,
                                img_url: (req.user.provider == 'facebook') ? req.user.providerData.picture.data.url : req.user.providerData.image.url
                            }
                        );
                    }
                )

                
            });
        });
        
        
    } else {
        res.render(

            'login', {
                title: 'Sign-in Form',
                layout: false
            }
        );
    }
};

exports.back = function (req, res) {
    if (req.isAuthenticated()) {
        var content = "";
        var chapters = [];
        var contents = [];
        var show_back = false;
        var show_next = true;
        req.app.locals.content_index--;
        if (req.app.locals.content_index > 1) {
            show_back = true;
        }
        Chapters.find({ material: req.body.material_id }, function (err, chapter) {
            for (var i = 0; i < chapter.length; i++) {
                chapters.push(chapter[i]);
            }
        });
        Contents.find({ chapter: req.params.id }, function (err, content) {
            for (var i = 0; i < content.length; i++) {
                contents.push(content[i]);
            }
        });

        Contents.findOne({ chapter: req.params.id, content_index: req.app.locals.content_index }, function (err, cont) {
            console.log(contents.length + "  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$  " + req.app.locals.content_index);
            if (req.app.locals.content_index >= contents.length) {
                show_next = false;
            }
            res.render(
                'content', {
                    layout: 'read',
                    title: 'Content',
                    user: req.user,
                    date: req.user.created.toDateString(),
                    chapters: req.app.locals.chapters,
                    material_id: req.app.locals.material_id,
                    content: cont,
                    show_back: show_back,
                    show_next: show_next,
                    img_url: (req.user.provider == 'facebook') ? req.user.providerData.picture.data.url : req.user.providerData.image.url
                }
            );
        });
    } else {
        res.render(

            'login', {
                title: 'Sign-in Form',
                layout: false
            }
        );
    }
};
