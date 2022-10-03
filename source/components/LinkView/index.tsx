import React from "react";

interface ILinkViewProps {
  index: number;
  url: string;
  shortUrl: string;
  clicks: number;
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
      <a
        className="link-view_short-url"
        href={props.shortUrl}
        title={props.shortUrl}
      >
        {props.shortUrl}
      </a>
      <span title={`${props.clicks}`} className="link-view_clicks">
        {props.clicks}
      </span>
    </div>
  );
};

export default LinkView;
