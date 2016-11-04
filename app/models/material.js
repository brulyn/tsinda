var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var schema = new Schema({
    title: {type:String, trim:true},
    desc: {type:String, trim:true},
    img_url: {type:String, trim:true},
    url:{type:String, trim:true},
    n_students: { Number },
    compulsory_for: [String], // List of Divisions to which this material is compulsory
    student_progress: {
        student_id: { type:ObjectId },
        progress: { type:Number }
    } // List of students' ids along with their progress in percentage about this material
});

module.exports = mongoose.model('Material', schema);