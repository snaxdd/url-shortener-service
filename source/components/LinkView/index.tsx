import React from "react";

interface ILinkViewProps {
  index: number;
  url: string;
  shortUrl: string;
  transitions: number;
  isEven?: boolean;
}

const LinkView = (props: ILinkViewProps) => {
  return (
    <div className={`link-view ${props.isEven ? " link-view--even" : ""}`}>
      <span title={`${props.index}`} className="link-view_index">
        {props.index}
      </span>
      <a className="link-view_url" href={props.url} title={props.url}>
        {props.url}
      </a>
      <a className="link-view_short-url" href={props.url} title={props.url}>
        {props.url}
      </a>
      <span title={`${props.transitions}`} className="link-view_transitions">
        {props.transitions}
      </span>
    </div>
  );
};

export default LinkView;
