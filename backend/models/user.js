const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

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
  location: { type: String },
  bio: { type: String },
  img_url: { type: String, default: faker.image.urlLoremFlickr() },
  avatar_url: { type: String, default: faker.image.avatar() },
  follower_id: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  follows_id: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  posts_id: [{ type: Schema.Types.ObjectId, ref: 'post' }],
  comments_id: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
  reg_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', UserSchema);
