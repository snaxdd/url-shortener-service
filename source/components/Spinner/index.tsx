import React from "react";

type TSpinnerSize = "small" | "medium" | "large";

interface ISpinner {
  size?: TSpinnerSize;
}

const Spinner = (props: ISpinner) => {
  return <div className={`spinner spinner--${props.size || "medium"}`}></div>;
};

export default Spinner;
