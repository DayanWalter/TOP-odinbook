// require the necessary libraries
const faker = require('@faker-js/faker');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/user');
const Post = require('./models/post');

async function seedData() {
  // Connection URL
  const uri =
    // process.env.DEV_DB_URL ||
    'mongodb+srv://bitfeather-db-user:bitfeather-db-user@cluster0.02rkyfs.mongodb.net/bitfeather-db?retryWrites=true&w=majority';
  const seed_count = Math.floor(Math.random() * 20) + 1;
  const user_count = Math.floor(Math.random() * 20) + 1;
  const post_count = Math.floor(Math.random() * 20) + 1;

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
  // create 5000 fake data
  for (let i = 0; i < seed_count; i++) {
    for (let j = 0; j < user_count; j++) {
      const firstName = faker.faker.person.firstName();
      const lastName = faker.faker.person.lastName();
      const user_name = faker.faker.internet.displayName({
        firstName,
        lastName,
      });
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
      for (let k = 0; k < post_count; k++) {
        const content = faker.faker.hacker.phrase();
        const posting_date = faker.faker.date.past();
        const author_id = user._id;

        const post = new Post({ author_id, content, posting_date });
        postsData.push(post);

        // Push post _id to user's posts_id array
        user.posts_id.push(post._id);
      }
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

// // require the necessary libraries
// const faker = require('@faker-js/faker');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const User = require('./models/user');
// const Post = require('./models/post');

// async function seedData() {
//   // Connection URL
//   const uri =
//     'mongodb+srv://bitfeather-db-user:bitfeather-db-user@cluster0.02rkyfs.mongodb.net/bitfeather-db?retryWrites=true&w=majority';
//   const seed_count = Math.floor(Math.random() * 20) + 1;
//   const user_count = Math.floor(Math.random() * 20) + 1;
//   const post_count = Math.floor(Math.random() * 20) + 1;

//   try {
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to db');

//     let userData = [];
//     let postsData = [];

//     // create fake data
//     for (let i = 0; i < seed_count; i++) {
//       const userPromises = [];

//       for (let j = 0; j < user_count; j++) {
//         const firstName = faker.person.firstName();
//         const lastName = faker.person.lastName();
//         const user_name = faker.internet.displayName({
//           firstName,
//           lastName,
//         });
//         const email = faker.internet.email();
//         const password = faker.internet.password();
//         const location = faker.location.city();
//         const bio = faker.person.bio();
//         const img_url = faker.image.url();
//         const avatar_url = faker.image.avatar();
//         const reg_date = faker.date.past();

//         const user = new User({
//           user_name,
//           email,
//           password,
//           location,
//           bio,
//           img_url,
//           avatar_url,
//           reg_date,
//         });

//         userData.push(user);
//         userPromises.push(user.save());

//         for (let k = 0; k < post_count; k++) {
//           const content = faker.hacker.phrase();
//           const posting_date = faker.date.past();

//           const post = new Post({ author_id: user._id, content, posting_date });
//           postsData.push(post);
//         }
//       }

//       await Promise.all(userPromises);
//     }

//     await Post.insertMany(postsData);
//     console.log('Seed success');
//   } catch (error) {
//     console.error('Seed error:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// seedData();
