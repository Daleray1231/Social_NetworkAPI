const mongoose = require('mongoose');
const { User, Thought } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB');

const userData = [
  {
    username: 'Mickey',
    email: 'mickey@disney.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'Minnie',
    email: 'minnie@disney.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'Donald',
    email: 'donald@disney.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'Goofy',
    email: 'goofy@disney.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'Pluto',
    email: 'pluto@disney.com',
    thoughts: [],
    friends: [],
  },
];

const thoughtData = [
  {
    thoughtText: 'Oh boy!',
    username: 'Mickey',
    reactions: [],
  },
  {
    thoughtText: 'Laughter is timeless.',
    username: 'Minnie',
    reactions: [],
  },
  {
    thoughtText: 'Quack!',
    username: 'Donald',
    reactions: [],
  },
  {
    thoughtText: 'Gawrsh!',
    username: 'Goofy',
    reactions: [],
  },
  {
    thoughtText: 'Woof woof!',
    username: 'Pluto',
    reactions: [],
  },
];

const seedDatabase = async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});

  const insertedUsers = await User.insertMany(userData);
  const userMap = insertedUsers.reduce((map, user) => {
    map[user.username] = user._id;
    return map;
  }, {});

  const mickeyFriends = [userMap['Minnie'], userMap['Goofy']];
  const minnieFriends = [userMap['Mickey'], userMap['Pluto']];

  await User.findByIdAndUpdate(userMap['Mickey'], { $addToSet: { friends: { $each: mickeyFriends } } });
  await User.findByIdAndUpdate(userMap['Minnie'], { $addToSet: { friends: { $each: minnieFriends } } });

  const thoughts = thoughtData.map(thought => {
    if (userMap[thought.username]) {
      thought = { ...thought, user: userMap[thought.username] };
    }
    return thought;
  });

  await Thought.insertMany(thoughts);

  console.log('Database seeded!');
  process.exit(0);
};

seedDatabase();