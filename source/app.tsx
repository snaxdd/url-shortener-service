import React, { FormEvent, useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import LinkForm from "./components/LinkForm";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import {
  setError,
  setUrl,
  setLinks,
  setTotalPages,
} from "./store/features/url.slice";
import validator from "validator";
import { useQuery } from "@apollo/client";
import { GET_SHORT_URLS } from "./graphql/url.query";
import LinkView from "./components/LinkView";
import { ShortUrl } from "./types/urls";
import Pagination from "./components/Pagination";
import Spinner from "./components/Spinner";

const App = () => {
  const [page, setPage] = useState(1);
  const urlState = useAppSelector((state) => state.url);
  const dispatch = useAppDispatch();

  const { loading, error, data } = useQuery(GET_SHORT_URLS, {
    variables: {
      page,
    },
  });

  useEffect(() => {
    //dispatch(setError(error?.message));
  }, [error]);

  useEffect(() => {
    const urls: ShortUrl[] = data?.short_urls?.data;
    const totalPages: number = data?.short_urls?.paginatorInfo?.lastPage;

    if (urls) {
      dispatch(setLinks(urls));
      dispatch(setTotalPages(totalPages));
    }
  }, [data]);

  const onInput = useCallback((event: FormEvent<HTMLInputElement>) => {
    const value: string = event.currentTarget.value;
    const error: string = validator.isURL(value)
      ? ""
      : "Введите корректный url";

    dispatch(setUrl(value));
    dispatch(setError(error));
  }, []);

  const onPaginate = (currentPage: number) => {
    setPage(currentPage);
  };

  return (
    <>
      <Header />
      <main className="layout">
        <div className="layout_left">
          <LinkForm
            error={urlState.error}
            onInput={onInput}
            value={urlState.url}
            classNames="layout_link-form"
          />
          {urlState.myLinks.map((urlItem, i) => (
            <LinkView
              key={urlItem.id}
              index={urlItem.id}
              url={urlItem.url}
              shortUrl={urlItem.short_url}
              clicks={urlItem.clicks}
              isEven={Boolean(i % 2)}
            />
          ))}
        </div>
        <div className="layout_right">
          <span className="layout_right-title">Список ссылок</span>
          {loading ? (
            <Spinner size="small" />
          ) : (
            <>
              {urlState.links.map((urlItem, i) => (
                <LinkView
                  key={urlItem.id}
                  index={urlItem.id}
                  url={urlItem.url}
                  shortUrl={urlItem.short_url}
                  clicks={urlItem.clicks}
                  isEven={Boolean(i % 2)}
                />
              ))}
            </>
          )}
          <Pagination totalPages={urlState.totalPages} onClick={onPaginate} />
        </div>
      </main>
    </>
  );
};

export default App;
