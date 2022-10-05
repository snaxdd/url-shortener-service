import React, { FormEvent, useCallback } from "react";
import Header from "./components/Header";
import LinkForm from "./components/LinkForm";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { setError, setUrl } from "./store/features/url.slice";
import validator from "validator";
import LinkView from "./components/LinkView";
import LinkList from "./components/LinkList";

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
          <LinkList />
        </div>
      </main>
    </>
  );
};

export default App;
