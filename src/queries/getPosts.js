import gql from "graphql-tag";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
    }
  }
`;

export default GET_POSTS;
