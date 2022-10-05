import React, { MouseEvent, useState } from "react";

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  onClick: (pageIndex: number) => void;
}

const SHOW_BUTTONS = 3;

const Pagination = (props: IPaginationProps) => {
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

    setButtonCounter((prevState) => {
      if (isFirst && buttonCounter !== 1) {
        return prevState - 1;
      }

      if (isLast && !(props.currentPage >= props.totalPages - SHOW_BUTTONS)) {
        return prevState + 1;
      }

      if (isLastButton) {
        return props.totalPages - 4;
      }

      return prevState;
    });
  };

  if (props.totalPages <= 5) {
    return (
      <>
        {Array.from(Array(props.totalPages).keys()).map((value, i, arr) => {
          return (
            <button
              key={value}
              data-index={value + buttonCounter}
              data-last={i === arr.length - 1}
              data-first={!i}
              onClick={onClick}
              className={`pagination_button ${
                props.currentPage === buttonCounter + value
                  ? " pagination_button--active"
                  : ""
              }`}
            >
              <span className="pagination_button-number">
                {value + buttonCounter}
              </span>
            </button>
          );
        })}
      </>
    );
  }

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
              props.currentPage === buttonCounter + value
                ? " pagination_button--active"
                : ""
            }`}
          >
            <span className="pagination_button-number">
              {value + buttonCounter}
            </span>
          </button>
        );
      })}
      {props.currentPage >= props.totalPages - SHOW_BUTTONS ? (
        <button
          className={`pagination_button ${
            props.currentPage === props.totalPages - 1
              ? " pagination_button--active"
              : ""
          }`}
          data-index={props.totalPages - 1}
          onClick={onClick}
        >
          <span className="pagination_button-number">
            {props.totalPages - 1}
          </span>
        </button>
      ) : (
        <span className="pagination_spacer">...</span>
      )}
      <button
        className={`pagination_button pagination_button--last ${
          props.currentPage === props.totalPages
            ? " pagination_button--active"
            : ""
        }`}
        data-index={props.totalPages}
        data-last-button={true}
        onClick={onClick}
      >
        <span className="pagination_button-number">{props.totalPages}</span>
      </button>
    </div>
  );
};

export default Pagination;
