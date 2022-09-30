import React from "react";

interface IButtonProps {
  text: string;
  classNames?: string;
  isDisabled?: boolean;
}

const Button = (props: IButtonProps) => {
  return (
    <button
      className={`button ${props.classNames || ""}`}
      disabled={props.isDisabled}
    >
      {props.text}
    </button>
  );
};

export default Button;
