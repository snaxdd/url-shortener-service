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
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
    }
  }
`;
