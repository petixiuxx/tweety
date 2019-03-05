import gql from "graphql-tag";

export const SIGN_UP_MUTATION = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      id
      username
      email
      role
      token
    }
  }
`;
