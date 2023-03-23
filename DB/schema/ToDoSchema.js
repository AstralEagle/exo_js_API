const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  listID: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
  isFinish: {
    type: Boolean,
    default: false,
  },
  creation: {
    type: Date,
    default: Date.now(),
  },
});

const ToDo = model('ToDo', todoSchema);

module.exports = ToDo;
