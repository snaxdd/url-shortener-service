import React from "react";
import Button from "../Button";

const LinkForm = () => {
  return (
    <div className="link-form">
      <span className="link-form_title">Введите ссылку</span>
      <div className="link-form_input-wrapper">
        <input type="text" className="link-form_input" />
        <Button text="Сократить" />
      </div>
    </div>
  );
};

export default LinkForm;
