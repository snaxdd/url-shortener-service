import { gql } from "@apollo/client";

export const CREATE_SHORT_URL = gql`
  mutation createShortUrl($url: String!) {
    shorten_url(url: $url) {
      short_url {
        id
        url
        short_url
        clicks
      }
    }
  }
`;
