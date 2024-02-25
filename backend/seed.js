const faker = require('@faker-js/faker');
const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');

async function seedData() {
  // Connection URL
  const uri =
    'mongodb+srv://dayanwalter:bePBGumgE1JDxor4@cluster0.sqbj7pm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const seed_count = 2;
  mongoose.set('strictQuery', false);
  mongoose
    .connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to db');
    })
    .catch((err) => {
      console.log('error', err);
    });

  let userData = [];
  let postsData = [];

  for (let i = 0; i < seed_count; i++) {
    const user_name = faker.faker.person.firstName();
    const email = faker.faker.internet.email();
    const password = faker.faker.internet.password();
    const location = faker.faker.location.city();
    const bio = faker.faker.person.bio();
    const img_url = faker.faker.image.url();
    const avatar_url = faker.faker.image.avatar();
    const reg_date = faker.faker.date.past();
    const user = new User({
      user_name,
      email,
      password,
      location,
      bio,
      img_url,
      avatar_url,
      reg_date,
    });

    userData.push(user);

    for (let j = 0; j < seed_count; j++) {
      const content = faker.faker.hacker.phrase();
      const posting_date = faker.faker.date.past();
      const author_id = user._id;

      const post = new Post({ author_id, content, posting_date });
      postsData.push(post);

      // Push post _id to user's posts_id array
      user.posts_id.push(post._id);
    }
  }

  const seedDB = async () => {
    await User.insertMany(userData);
    await Post.insertMany(postsData);
  };

  seedDB().then(() => {
    mongoose.connection.close();
    console.log('seed success');
  });
}

seedData();
