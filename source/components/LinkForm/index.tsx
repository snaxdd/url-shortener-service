import React, { FormEvent, useCallback } from "react";
import Button from "../Button";
import isEmpty from "validator/lib/isEmpty";
import { useMutation } from "@apollo/client";
import { CREATE_SHORT_URL } from "../../graphql/url.mutation";
import { useAppDispatch } from "../../hooks/redux";
import { setMyLink } from "../../store/features/url.slice";

interface ILinkForm {
  error?: string;
  onInput: (event: FormEvent<HTMLInputElement>) => void;
  value: string;
  classNames?: string;
}

const LinkForm = (props: ILinkForm) => {
  const dispatch = useAppDispatch();
  const [createShortUrl, { loading }] = useMutation(CREATE_SHORT_URL);

  const onCreateUrl = useCallback(async () => {
    const result = await createShortUrl({
      variables: {
        url: props.value,
      },
    });

    dispatch(setMyLink(result.data.shorten_url.short_url));
  }, [props.value]);

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
          isDisabled={isEmpty(props.value) || !isEmpty(props.error)}
        />
      </div>
      {props.error && <span className="link-form_error">{props.error}</span>}
    </div>
  );
};

export default React.memo(LinkForm);
