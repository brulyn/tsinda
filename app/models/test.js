var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var schema = new Schema({
    code: { type: String, trim: true },
    desc: { type: String, trim: true },
    n_questions: { Number },
    compulsory_for: [String],
    students_perfomance: [
        {
            student_id: ObjectId,
            marks: Number
        }
    ]
});

module.exports = mongoose.model('Test', schema);