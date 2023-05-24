const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id })

                return user
            }
            throw new AuthenticationError("User Not Logged In!")
        }
    },
    Mutation: {
        createUser: async (parents, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user }
        },

        login: async (parent, { email, password }) => {

        },
        saveBook: async (parent, { bookData }, context) => {

        },
        deleteBook: async (parent, { bookId }, context) => {

        }
    },
};

module.exports = resolvers;
