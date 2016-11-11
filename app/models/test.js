var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var schema = new Schema({
    desc: { type: String, trim: true },
    n_questions: { Number },
    answers:[{
        
    }]
    
});

module.exports = mongoose.model('Test', schema);