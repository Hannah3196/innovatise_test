var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    }
});
module.exports = mongoose.model('Users', UserSchema);