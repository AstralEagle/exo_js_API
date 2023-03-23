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
  isFinish: {
    type: Boolean,
    default: false,
  },
  dateEnd: {
    type: Date,
    require: true,
  },
  listID: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
}, {
  timestamps: true,
});

const ToDo = model('ToDo', todoSchema);

module.exports = ToDo;
