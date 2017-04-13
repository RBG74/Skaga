var mongoose = require('mongoose');
var Schema = mongoose.Schema;

logSchema = new Schema({ 
    route: { type: String, required: true }, 
    timestamp: { type: Date, default: new Date() },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Log', logSchema);