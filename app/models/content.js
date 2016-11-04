var mongoose = require('mongoose');
var Chapters = require('mongoose').model('Chapter');
var Schema = mongoose.Schema;


var schema = new Schema({
    title: {type:String, trim:true},
    chapter: {
        type: Schema.ObjectId,
        ref: 'Chapter'
    },
    body: {type: String},
    content_index: Number,
    done: {type: Boolean}
});

module.exports = mongoose.model('Content', schema);