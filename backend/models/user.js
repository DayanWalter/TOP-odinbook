const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_name: {
    type: String,
    required: true,
    minLength: [1, 'Username must have at least 1 character'],
    maxLength: 30,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 30,
    unique: true,
  },
  password: { type: String, required: true },
  img_url: { type: String, default: 'http://www.example.com/' },
  follower_id: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  follows_id: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  posts_id: [{ type: Schema.Types.ObjectId, ref: 'post' }],
  comments_id: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
  reg_date: { type: Date, default: Date.now },
});
UserSchema.virtual('formatted_reg_date').get(function () {
  // DD.MM.YYYY
  console.log(this.reg_date);
  return this.reg_date.toLocaleDateString('de-DE');
});

module.exports = mongoose.model('user', UserSchema);
