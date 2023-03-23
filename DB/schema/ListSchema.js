const { Schema, model } = require('mongoose');

const listSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const List = model('List', listSchema);

module.exports = List;
