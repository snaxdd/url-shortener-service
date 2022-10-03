import React, { FormEvent, useCallback, useEffect } from "react";
import Header from "./components/Header";
import LinkForm from "./components/LinkForm";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import {
  setError,
  setUrl,
  setLinks,
  setCurrentPage,
  setTotalPages,
} from "./store/features/urlShortener.slice";
import validator from "validator";
import { useQuery } from "@apollo/client";
import { GET_SHORT_URLS } from "./graphql/url.query";
import LinkView from "./components/LinkView";
import { ShortUrl } from "./types/urls";
import Pagination from "./components/Pagination";

const App = () => {
  const urlShortener = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  const { loading, error, data } = useQuery(GET_SHORT_URLS, {
    variables: {
      page: urlShortener.currentPage,
    },
  });

  useEffect(() => {
    window.onbeforeunload = function () {
      sessionStorage.setItem("href", window.location.href);
    };
  }, []);

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
    const value = event.currentTarget.value;
    const error = validator.isURL(value) ? "" : "Введите корректный url";

    dispatch(setUrl(value));
    dispatch(setError(error));
  }, []);

  const onPaginate = (currentPage: number) => {
    dispatch(setCurrentPage(currentPage));
  };

  return (
    <>
      <Header />
      <main className="layout">
        <div className="layout_left">
          <LinkForm
            error={urlShortener.error}
            onInput={onInput}
            value={urlShortener.url}
          />
        </div>
        <div className="layout_right">
          <span className="layout_right-title">Список ссылок</span>
          {urlShortener.links.map((urlItem, i) => (
            <LinkView
              key={urlItem.id}
              index={urlItem.id}
              url={urlItem.url}
              shortUrl={urlItem.short_url}
              clicks={urlItem.clicks}
              isEven={Boolean(i % 2)}
            />
          ))}
          <Pagination
            totalPages={urlShortener.totalPages}
            onClick={onPaginate}
          />
        </div>
      </main>
    </>
  );
};

export default App;
