import React from "react";
import Header from "./components/Header";
import LinkView from "./components/LinkView";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <LinkView
          index={99}
          url="https://google.com"
          shortUrl="https://google.com"
          transitions={999999}
        />
        <LinkView
          index={98}
          url="https://google.com"
          shortUrl="https://google.com"
          transitions={999999}
          isEven
        />
        <LinkView
          index={97}
          url="https://google.com"
          shortUrl="https://google.com"
          transitions={999999}
        />
      </main>
    </>
  );
};

export default App;
