var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var schema = new Schema({
    user_id: {type: ObjectId},
    user_progress: {type:Number, default:0}
});

module.exports = mongoose.model('Pro', schema);