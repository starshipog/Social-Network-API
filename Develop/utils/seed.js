const connection = require('../config/connection');
const { Thoughts, User } = require('../models');
const { getRandomName, getRandomReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  let thoughtsCheck = await connection.db.listCollections({ name: 'thoughtss' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thoughtss');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }


  const users = [];

  for (let i = 0; i < 20; i++) {

    const reactions = getRandomReactions(4);

    const fullName = getRandomName();
    // const first = fullName.split(' ')[0];
    // const last = fullName.split(' ')[1];
    // const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    users.push({
      fullName,
      reactions,
    });
  }

  await User.collection.insertMany(users);

  await Thoughts.collection.insertOne({
    thoughtsName: 'Great day',
    inPerson: false,
    users: [...users],
  });

  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
