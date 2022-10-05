import { gql } from "@apollo/client";

export const GET_SHORT_URLS = gql`
  query getShortUrls($page: Int!) {
    short_urls(page: $page) {
      data {
        id
        url
        short_url
        clicks
      }
      paginatorInfo {
        lastPage
      }
    }
  }
`;

export const UPDATE_LINK_CLICKS = gql`
  query editLink($id: Int!) {
    short_urls(id: $id) {
      id
      clicks
    }
  }
`;
