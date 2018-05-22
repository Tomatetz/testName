var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({ 
    id: Number,
    status: String,
    timestamp: Number,
    changed: false,
    editable: false,
    isExpanded: false,
    personal: {
      name: String,
      phone: String
    },
    notes: Array
});

module.exports = mongoose.model('User', UserSchema);