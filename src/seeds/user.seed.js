require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../api/models/users');

const users = [
  {
    email: 'jane.doe@example.com',
    username: 'janedoe',
    password: '123456',
    birthYear: 1990,
    role: 'admin',
    profileImage: 'jane.jpg'
  },
  {
    email: 'john.smith@example.com',
    username: 'johnsmith',
    password: 'abcdef',
    birthYear: 1985,
    role: 'user',
    profileImage: 'john.jpg'
  },
  {
    email: 'alice.wang@example.com',
    username: 'alicewang',
    password: 'qwerty',
    birthYear: 1995,
    role: 'guest',
    profileImage: 'alice.jpg'
  },
  {
    email: 'bob.jones@example.com',
    username: 'bobjones',
    password: 'zxcvbn',
    birthYear: 1992,
    role: 'user',
    profileImage: 'bob.jpg'
  },
  {
    email: 'clara.lopez@example.com',
    username: 'claralopez',
    password: 'asdfgh',
    birthYear: 1988,
    role: 'admin',
    profileImage: 'clara.jpg'
  },
  {
    email: 'david.lee@example.com',
    username: 'davidlee',
    password: 'mnbvcx',
    birthYear: 1997,
    role: 'user',
    profileImage: 'david.jpg'
  },
  {
    email: 'emma.wilson@example.com',
    username: 'emmawilson',
    password: 'poiuyt',
    birthYear: 1993,
    role: 'user',
    profileImage: 'emma.jpg'
  },
  {
    email: 'frank.harris@example.com',
    username: 'frankharris',
    password: 'lkjhgf',
    birthYear: 1986,
    role: 'admin',
    profileImage: 'frank.jpg'
  },
  {
    email: 'grace.kim@example.com',
    username: 'gracekim',
    password: 'tyuiop',
    birthYear: 1994,
    role: 'user',
    profileImage: 'grace.jpg'
  },
  {
    email: 'harry.potter@example.com',
    username: 'harrypotter',
    password: 'magic',
    birthYear: 1980,
    role: 'user',
    profileImage: 'harry.jpg'
  },
  {
    email: 'isabel.sanchez@example.com',
    username: 'isabelsanchez',
    password: 'sol123',
    birthYear: 1991,
    role: 'admin',
    profileImage: 'isabel.jpg'
  },
  {
    email: 'jack.brown@example.com',
    username: 'jackbrown',
    password: 'brownie',
    birthYear: 1989,
    role: 'user',
    profileImage: 'jack.jpg'
  },
  {
    email: 'kate.green@example.com',
    username: 'kategreen',
    password: 'greentea',
    birthYear: 1996,
    role: 'user',
    profileImage: 'kate.jpg'
  },
  {
    email: 'leo.martin@example.com',
    username: 'leomartin',
    password: 'martini',
    birthYear: 1987,
    role: 'admin',
    profileImage: 'leo.jpg'
  },
  {
    email: 'mia.smith@example.com',
    username: 'miasmith',
    password: 'smithy',
    birthYear: 1998,
    role: 'user',
    profileImage: 'mia.jpg'
  }
];

const userDocuments = users.map((user) => {
  const newUser = new User(user);
  newUser.password = bcrypt.hashSync(newUser.password, 10);
  return newUser;
});

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    const allUsers = await User.find();

    if (allUsers.length) {
      await User.collection.drop();
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await User.insertMany(userDocuments);
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());
