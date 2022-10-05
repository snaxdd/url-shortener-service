import React, { FormEvent, useCallback, useEffect } from "react";
import Header from "./components/Header";
import LinkForm from "./components/LinkForm";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { setError, setUrl, updateLinkClicks } from "./store/features/url.slice";
import validator from "validator";
import LinkView from "./components/LinkView";
import LinkList from "./components/LinkList";
import { NEW_CLICK_EVENT } from "./constants/wsEvents";
import { SHORT_URL_CHANNEL } from "./constants/wsChannels";
import { apolloClient } from "./index";
import { ShortUrl } from "./types/urls";
import { UPDATE_LINK_CLICKS } from "./graphql/url.query";
import { Simulate } from "react-dom/test-utils";

const App = () => {
  const urlState = useAppSelector((state) => state.url);
  const dispatch = useAppDispatch();

  const onInput = useCallback((event: FormEvent<HTMLInputElement>) => {
    const value: string = event.currentTarget.value;
    const error: string = validator.isURL(value)
      ? ""
      : "Введите корректный url";

    dispatch(setUrl(value));
    dispatch(setError(error));
  }, []);

  const updateLinks = (event: any) => {
    apolloClient.writeQuery({
      query: UPDATE_LINK_CLICKS,
      data: {
        short_urls: {
          __typename: "ShortUrl",
          id: event.short_url.id,
          clicks: event.short_url.clicks,
        },
      },
      variables: {
        id: event.short_url.id,
      },
    });
  };

  useEffect(() => {
    window.Echo.channel(SHORT_URL_CHANNEL).listen(
      NEW_CLICK_EVENT,
      (event: any) => {
        dispatch(updateLinkClicks(event.short_url));
        updateLinks(event);
      }
    );

    return () => {
      window.Echo.leave(SHORT_URL_CHANNEL);
    };
  }, []);

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
          <span className="layout_right-title">Мои ссылки</span>
          {!urlState.myLinks.length ? (
            <span>Список пуст...</span>
          ) : (
            urlState.myLinks.map((urlItem, i) => (
              <LinkView
                key={urlItem.id}
                index={urlItem.id}
                url={urlItem.url}
                shortUrl={urlItem.short_url}
                clicks={Number(urlItem.clicks)}
                isEven={Boolean(i % 2)}
              />
            ))
          )}
        </div>
        <div className="layout_right">
          <span className="layout_right-title">Список ссылок</span>
          <LinkList />
        </div>
      </main>
    </>
  );
};

export default App;
