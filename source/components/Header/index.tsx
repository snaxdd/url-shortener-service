import React from "react";

const Header = () => {
  return (
    <header className="header">
      <span className="header_text">Url shortener service</span>
    </header>
  );
};

export default React.memo(Header);
