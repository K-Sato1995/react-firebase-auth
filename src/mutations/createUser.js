import gql from "graphql-tag";

const CREATE_USER = gql`
  mutation createUser($name: String!, $role: Int!, $uid: String!) {
    createUser(input: { name: $name, role: $role, uid: $uid }) {
      name
      role
      uid
    }
  }
`;

export default CREATE_USER;
