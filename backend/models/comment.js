const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author_id: { type: Schema.Types.ObjectId, ref: 'user' },
  content: { type: String },
  likes_id: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  post_id: { type: Schema.Types.ObjectId, ref: 'post' },
  posting_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('comment', CommentSchema);
