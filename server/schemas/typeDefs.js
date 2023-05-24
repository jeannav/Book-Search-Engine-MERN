const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
   }

   type Book {
    authors: [String]
    description: String
    bookId: ID!
    image: String
    link: String
    title: String!
   }

   type Query {
    me: User
    }

   type Mutation {
    createUser()
    login()
    saveBook()
    deleteBook()
   }
`;

// module.exports = typeDefs;
