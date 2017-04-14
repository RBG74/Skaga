var mongoose = require('mongoose');
var Schema = mongoose.Schema;

alcoholicSchema = new Schema({ 
    name: { type: String, required: true }, 
    drinksPaid: { type: Number, default: 0 },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Alcoholic', alcoholicSchema);