var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var schema = new Schema({
    desc: { type: String, trim: true },
    n_questions: { Number },
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String,
    answer5: String,
    answer6: String,
    answer7: String,
    answer8: String,
    answer9: String,
    answer10: String
    
});

module.exports = mongoose.model('Test', schema);