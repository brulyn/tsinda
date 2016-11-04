
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Materials = require('mongoose').model('Material');
var ObjectId = mongoose.Types.ObjectId();

var schema = new Schema({
    title: {type:String, trim:true},
    material: {
        type: Schema.ObjectId,
        ref: 'Material'
    },
    done: {type: Boolean}
});

module.exports = mongoose.model('Chapter', schema);