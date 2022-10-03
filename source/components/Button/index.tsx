import React from "react";

interface IButtonProps {
  text: string;
  classNames?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

const Button = (props: IButtonProps) => {
  return (
    <button
      className={`button ${props.classNames || ""}`}
      disabled={props.isDisabled}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
