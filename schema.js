const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Recipe {
    _id: ID!
    name: String!
    category: String!
    description: String!
    instructions: String!
    created: String
    likes: Int
    userName: String
  }

  type User {
    _id: ID!
    userName: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
  }

  type Token {
    token: String!
  }

  type Query {
    getRecipes: [Recipe!]!
    getUsers: [User!]!
    getCurrentUser: User!
  }

  type Mutation {
    addRecipe(
      name: String!
      category: String!
      description: String!
      instructions: String!
      userName: String
    ): Recipe

    signupUser(userName: String!, email: String!, password: String!): Token

    signinUser(email: String!, password: String!): Token
  }
`;

module.exports = typeDefs;
