const mongoose = require('mongoose');
const { Member, Post } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/communityDB');

const memberData = [
  {
    username: 'JohnDoe',
    email: 'john@example.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'JaneSmith',
    email: 'jane@example.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'AlexJohnson',
    email: 'alex@example.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'EmilyBrown',
    email: 'emily@example.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'MichaelClark',
    email: 'michael@example.com',
    thoughts: [],
    friends: [],
  },
];

const postData = [
  {
    thoughtText: 'Life is what happens when you’re busy making other plans.',
    username: 'JohnDoe',
    reactions: [],
  },
  {
    thoughtText: 'The only limit to our realization of tomorrow will be our doubts of today.',
    username: 'JaneSmith',
    reactions: [],
  },
  {
    thoughtText: 'Every accomplishment starts with the decision to try.',
    username: 'AlexJohnson',
    reactions: [],
  },
  {
    thoughtText: 'In the middle of difficulty lies opportunity.',
    username: 'EmilyBrown',
    reactions: [],
  },
  {
    thoughtText: 'Strive not to be a success, but rather to be of value.',
    username: 'MichaelClark',
    reactions: [],
  },
];

const seedDatabase = async () => {
  await Member.deleteMany({});
  await Post.deleteMany({});

  const insertedMembers = await Member.insertMany(memberData);
  
  const memberMap = insertedMembers.reduce((map, member) => {
    map[member.username] = member._id;
    return map;
  }, {});

  const johnFriends = [memberMap['JaneSmith'], memberMap['EmilyBrown']];
  const janeFriends = [memberMap['JohnDoe'], memberMap['MichaelClark']];

  await Member.findByIdAndUpdate(memberMap['JohnDoe'], { $addToSet: { friends: { $each: johnFriends } } });
  await Member.findByIdAndUpdate(memberMap['JaneSmith'], { $addToSet: { friends: { $each: janeFriends } } });

  const posts = postData.map(post => {
    if (memberMap[post.username]) {
      post = { ...post, user: memberMap[post.username] };
    }
    return post;
  });

  await Post.insertMany(posts);

  console.log('Database seeded!');
  process.exit(0);
};

seedDatabase();