const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
    item: {type: String, required: true, max: 100},
    done: {type: Boolean, required: true},
});


// Export the model
module.exports = mongoose.model('ToDo', TodoSchema);