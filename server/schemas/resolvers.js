const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id }).select('-__v -password');

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
            // make sure that context.user extists
            if (context.user) {
                // find User to update savedBook arrary in
                const user = await User.findByIdAndUpdate(
                    {
                        _id: context.user._id
                    },
                    {
                        $push: { savedBooks: bookData }
                    },
                    {
                        new: true
                    });
                return user
            }
            // regardles throw error, unless they ARE logged in
            throw new AuthenticationError("User Not Logged In!")
        },
        removeBook: async (parent, { bookId }, context) => {
            // make sure that context.user extists
            if (context.user) {
                // find User to update savedBook arrary in
                const user = await User.findByIdAndUpdate(
                    {
                        _id: context.user._id
                    },
                    {
                        $pull: { savedBooks: { bookId } }
                    },
                    {
                        new: true
                    });
                return user
            }
            // regardles throw error, unless they ARE logged in
            throw new AuthenticationError("User Not Logged In!")
        }
    },
};

module.exports = resolvers;