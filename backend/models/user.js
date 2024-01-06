const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_name: { type: String },
  email: { type: String },
  password: { type: String },
  img_url: { type: String },
  follower_id: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  follows_id: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  posts_id: [{ type: Schema.Types.ObjectId, ref: 'post' }],
  comments_id: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
  reg_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', UserSchema);
