import React, { useState } from "react";
import { IPaginatorInfo, ShortUrl } from "../../types/urls";
import { useQuery } from "@apollo/client";
import { GET_SHORT_URLS } from "../../graphql/url.query";
import Spinner from "../Spinner";
import LinkView from "../LinkView";
import Pagination from "../Pagination";

interface ILinkListProps {
  links?: ShortUrl[];
  pagination?: IPaginatorInfo;
}

const LinkList = (props: ILinkListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useQuery(GET_SHORT_URLS, {
    variables: {
      page: currentPage,
    },
  });

  const onPaginate = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  if (error) {
    return <span>{error.message}</span>;
  }

  return (
    <>
      {loading ? (
        <Spinner size="small" />
      ) : (
        <>
          {data.short_urls.data.map((item: ShortUrl, i: number) => (
            <LinkView
              key={item.id}
              index={item.id}
              url={item.url}
              shortUrl={item.short_url}
              clicks={item.clicks}
              isEven={Boolean(i % 2)}
            />
          ))}
          <Pagination
            totalPages={data.short_urls.paginatorInfo.lastPage}
            onClick={onPaginate}
            currentPage={currentPage}
          />
        </>
      )}
    </>
  );
};

export default LinkList;