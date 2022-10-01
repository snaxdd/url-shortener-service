import React, { MouseEvent, useState } from "react";

interface IPaginationProps {
  totalPages: number;
  onClick: (pageIndex: number) => void;
}

const SHOW_BUTTONS = 3;

const Pagination = (props: IPaginationProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [buttonCounter, setButtonCounter] = useState(1);

  const getValuesFromAttr = (event: MouseEvent<HTMLElement>) => ({
    selectedIndex: Number(event.currentTarget.getAttribute("data-index")),
    isLast: event.currentTarget.getAttribute("data-last") === "true",
    isFirst: event.currentTarget.getAttribute("data-first") === "true",
    isLastButton:
      event.currentTarget.getAttribute("data-last-button") === "true",
  });

  const onClick = (event: MouseEvent<HTMLElement>) => {
    const { isFirst, isLast, isLastButton, selectedIndex } =
      getValuesFromAttr(event);

    props.onClick(selectedIndex);
    setCurrentIndex(selectedIndex);

    setButtonCounter((prevState) => {
      if (isFirst && buttonCounter !== 1) {
        return prevState - 1;
      }

      if (isLast && !(currentIndex >= props.totalPages - SHOW_BUTTONS)) {
        return prevState + 1;
      }

      if (isLastButton) {
        return props.totalPages - 4;
      }

      return prevState;
    });
  };

  return (
    <div className="pagination">
      {Array.from(Array(SHOW_BUTTONS).keys()).map((value, i, arr) => {
        return (
          <button
            key={value}
            data-index={value + buttonCounter}
            data-last={i === arr.length - 1}
            data-first={!i}
            onClick={onClick}
            className={`pagination_button ${
              currentIndex === i + 1 ? " pagination_button--active" : ""
            }`}
          >
            {value + buttonCounter}
          </button>
        );
      })}
      {currentIndex >= props.totalPages - SHOW_BUTTONS ? (
        <button
          className="pagination_button"
          data-index={props.totalPages - 1}
          onClick={onClick}
        >
          {props.totalPages - 1}
        </button>
      ) : (
        <span className="pagination_spacer">...</span>
      )}
      <button
        className="pagination_button"
        data-index={props.totalPages}
        data-last-button={true}
        onClick={onClick}
      >
        {props.totalPages}
      </button>
    </div>
  );
};

export default Pagination;