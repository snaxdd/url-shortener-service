import React, { FormEvent, useCallback } from "react";
import Button from "../Button";
import isEmpty from "validator/lib/isEmpty";
import { gql, useMutation } from "@apollo/client";
import { CREATE_SHORT_URL } from "../../graphql/url.mutation";

interface ILinkForm {
  error?: string;
  onInput: (event: FormEvent<HTMLInputElement>) => void;
  value: string;
}

const LinkForm = (props: ILinkForm) => {
  const [createShortUrl, { data }] = useMutation(CREATE_SHORT_URL);
  const onCreateUrl = useCallback(() => {
    createShortUrl({
      variables: {
        url: props.value,
      },
    });
  }, [props.value]);

  return (
    <div className="link-form">
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
          isDisabled={isEmpty(props.value) || !isEmpty(props.error)}
        />
      </div>
      {props.error && <span className="link-form_error">{props.error}</span>}
    </div>
  );
};

export default React.memo(LinkForm);
