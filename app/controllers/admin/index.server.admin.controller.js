var passport = require('passport'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Material = require('mongoose').model('Material'),
    Chapter = require('mongoose').model('Chapter'),
    Content = require('mongoose').model('Content'),
    users = require('../users.server.controller');

exports.render = function (req, res) {
    var mat = [];
    var chap = [];
    Material.find({}, function (err, doc) {
        for (var i = 0; i < doc.length; i++) {
            mat.push(doc[i]);
        }
    });
    Chapter.find({}, function (err, doc) {
        for (var i = 0; i < doc.length; i++) {
            chap.push(doc[i]);
        }
    });
    res.render(
        'admin/index', {
            title: 'Tsinda Platform',
            layout: false,
            materials: mat,
            chapters: chap
        }
    );
};

exports.saveContent = function (req, res) {
    /*
    var content = new Contents({
        title: req.body.title,
        chapter: req.body.chapter,
        body: req.body.body,
        done: false
    });
    content.save(function(err, content) {
        res.redirect('/materials');
    })
    */

    //Materials are preloaded with the app.
    //First thing to do is to create chapter per chapter-title given by users.
    //Each chapter will have more than one 'content'. Then we have to create content of this chapter.

    Chapter.findOne({
        title: req.body.chapter,
        material: req.body.material
    }, function (err, chapter_found) {
        if (chapter_found === null) {
            var chapter = new Chapter({
                title: req.body.chapter,
                material: req.body.material,
                done: false
            });
            chapter.save(function (err, chapter) {
                var content = new Content({
                    title: req.body.content_title,
                    chapter: chapter._id,
                    body: req.body.content,
                    content_index: req.body.content_index
                });
                content.save(function (err, content) {
                    res.redirect('/admin');
                })
            });
        } else {
            //The chapter already exists
            var content = new Content({
                title: req.body.content_title,
                chapter: chapter_found._id,
                body: req.body.content,
                content_index: req.body.content_index
            });
            content.save(function (err, content) {
                res.redirect('/admin');
            })
        }
    });


};
