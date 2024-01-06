const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author_id: { type: Schema.Types.ObjectId, ref: 'user' },
  content: { type: String },
  likes_id: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  comments_id: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
  posting_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('post', PostSchema);
