import { gql } from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
   login(email: $email, password: $password) {
      token
      user{
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation login($username: String! $email: String!, $password: String!) {
    login(username: $username, email: $email, password: $password) {
       token
       user{
         _id
         username
       }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $authors: [String]!, $description: String!, $bookId: String!, $image: String!, $link: String!, $title: String!) {
    saveBook( userId: $userId, authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
        _id
        username
        email
        bookCount
        savedBooks {
            authors
            description
            bookId
            image
            link
            title
        }
    }
  }
`;

export const REMOVE_BOOK = gql`
mutation removeBook($userId: String!, $bookId: String!) {
    removeBook(userId: $userId, bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
            authors
            description
            bookId
            image
            link
            title
        }
    }
  }
`;


