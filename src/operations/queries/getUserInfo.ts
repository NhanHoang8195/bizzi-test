import { gql } from "@apollo/client";

export const GET_USER_INFO = gql`
  query GetUserInfo {
    user @client {
      email,
      familyName,
      givenName,
      googleId,
      imageUrl,
      name,
      tokenId,
    }
  }
`