const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String , required: true, unique: true },
    mobile: { type: String, required: true, unique: true }
}, {
    timestamps: true
});
module.exports = mongoose.model('User', UserSchema);