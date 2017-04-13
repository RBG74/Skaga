var mongoose = require('mongoose');
var Schema = mongoose.Schema;

logSchema = new Schema({ 
    route: { type: String, required: true }, 
    user: { type: Schema.Types.ObjectId, ref: 'User' }, 
    timestamp: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Log', logSchema);