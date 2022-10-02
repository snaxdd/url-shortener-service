import React, { FormEvent, useCallback, useEffect } from "react";
import Header from "./components/Header";
import LinkForm from "./components/LinkForm";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { setError, setUrl } from "./store/features/urlShortener.slice";
import validator from "validator";

const App = () => {
  const urlShortener = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.onbeforeunload = function () {
      sessionStorage.setItem("href", window.location.href);
    };
  }, []);

  const onInput = useCallback((event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const error = validator.isURL(value) ? "" : "Введите корректный url";

    dispatch(setUrl(value));
    dispatch(setError(error));
  }, []);

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
          <span>{urlShortener.url}</span>
        </div>
      </main>
    </>
  );
};

export default App;
