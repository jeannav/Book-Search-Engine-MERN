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
            // find the user thats trying to login by email
            // if that email isnt linked to a user throw AuthenticationError
            const user = await User.findOne({ email })
            if (!user) {
                throw new AuthenticationError("Credentials dont match!")
            }
            // after finding the email match, check if password entered, matches password for that email
            // if password is wrong, tell them user credential dont match
            const passwordValidity = await user.isCorrectPassword(password)
            if (!passwordValidity) {
                throw new AuthenticationError("Credentials dont match!")
            }
            // create token and return user/token
            const token = signToken(user)
            return { token, user }
        },
        saveBook: async (parent, { bookData }, context) => {

        },
        deleteBook: async (parent, { bookId }, context) => {

        }
    },
};

module.exports = resolvers;
