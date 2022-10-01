import React from "react";
import Header from "./components/Header";
import Pagination from "./components/Pagination";

const App = () => {
  const onClick = (pageIndex: number) => {
    console.log("page index: ", pageIndex);
  };

  return (
    <>
      <Header />
      <main>
        <Pagination totalPages={100} onClick={onClick} />
      </main>
    </>
  );
};

export default App;
