const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async () => {
      return User.find({});
    },
    matchups: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },
  },
  Mutation:  {
  createUser: async (parents, args) => {
    const user = await User.create(args);
    const token = signToken(user);

    return {token, user}
  },

    login: async (parent, {email, password}) => {

    },
    saveBook: async (parent, {bookData}, context) => {

    },
    deleteBook: async (parent, {bookId}, context) => {
        
    }
   
   // createMatchup: async (parent, args) => {
   //   const matchup = await Matchup.create(args);
   //   return matchup;
   // },
   // createVote: async (parent, { _id, techNum }) => {
   //   const vote = await Matchup.findOneAndUpdate(
   //     { _id },
   //     { $inc: { [`tech${techNum}_votes`]: 1 } },
   //     { new: true }
   //   );
   //   return vote;
   // },
  },
};

module.exports = resolvers;
