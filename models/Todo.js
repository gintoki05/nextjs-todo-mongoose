import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  todoText: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
