import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)