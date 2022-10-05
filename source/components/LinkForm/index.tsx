import React, { FormEvent, useCallback, useEffect, useState } from "react";
import Button from "../Button";
import isEmpty from "validator/lib/isEmpty";
import { useMutation } from "@apollo/client";
import { CREATE_SHORT_URL } from "../../graphql/url.mutation";
import { useAppDispatch } from "../../hooks/redux";
import { setMyLink, setUrl } from "../../store/features/url.slice";

interface ILinkForm {
  error?: string;
  onInput: (event: FormEvent<HTMLInputElement>) => void;
  value: string;
  classNames?: string;
}

const LinkForm = (props: ILinkForm) => {
  const [errMessage, setErrMessage] = useState(props.error);
  const dispatch = useAppDispatch();
  const [createShortUrl, { loading, error }] = useMutation(CREATE_SHORT_URL);

  const onCreateUrl = useCallback(async () => {
    const result = await createShortUrl({
      variables: {
        url: props.value,
      },
    });

    dispatch(setMyLink(result.data.shorten_url.short_url));
    dispatch(setUrl(""));
  }, [props.value]);

  useEffect(() => {
    if (error) {
      setErrMessage(error.message);
    } else if (props.error) {
      setErrMessage(props.error);
    } else {
      setErrMessage("");
    }
  }, [error, props.error]);

  return (
    <div className={`link-form ${props.classNames}`}>
      <span className="link-form_title">Введите ссылку</span>
      <div className="link-form_input-wrapper">
        <input
          type="text"
          className="link-form_input"
          onInput={props.onInput}
          value={props.value}
        />
        <Button
          onClick={onCreateUrl}
          text="Сократить"
          classNames="link-form_button"
          isDisabled={isEmpty(props.value) || !isEmpty(props.error) || loading}
        />
      </div>
      {errMessage && <span className="error">{errMessage}</span>}
    </div>
  );
};

export default React.memo(LinkForm);
