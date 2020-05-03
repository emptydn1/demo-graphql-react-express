import { gql } from "apollo-boost";

export const GET_RECIPES = gql`
  {
    getRecipes {
      _id
      name
      category
      description
      instructions
      created
      likes
      userName
    }
  }
`;

//user queries
export const GET_CURRENT_USER = gql`
  {
    getCurrentUser {
      userName
      joinDate
      email
    }
  }
`;

//user mutations
export const SIGNUP_USER = gql`
  mutation($userName: String!, $email: String!, $password: String!) {
    signupUser(userName: $userName, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
    }
  }
`;
