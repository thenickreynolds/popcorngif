import { useRef } from "react";
import { useEffect } from "react";
import classNames from 'classnames/bind';
import Consts from "../utils/consts";

export default function SearchBox({
  text,
  onChange,
  restingStateSearchBarYOffset,
}: {
  text: string;
  onChange: (text: string) => void;
  restingStateSearchBarYOffset: number;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // timeout required to enable focus in extension (due to iframe?)
    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
        // focus and click required to trigger keyboard on mobile
        ref.current.click();
      }
    }, 200);
  }, [ref]);

  const hasContent = text.length > 0;

  return (
    <div>
      <style jsx={true}>{`
        .search_container {
          display: flex;
          justify-content: center;
        }

        .back_button {
          position: absolute;
          width 42px;
          height: 42px;
          top: 8px;
          left: 6px;
        }

        .search_input {
          width: 100%;
          outline: none;
          padding: 19px 5px 16px 52px;
          color: #000000;
          transition: ease-in-out, 0.25s ease-in-out;
          border: 1px solid #dfe1e5;
          ${Consts.CSS_BORDER_RADIUS}
          font: font-family: "Roboto", sans-serif;
          font-size: 13pt;
          font-weight: none;
          background: #ffffff url(${
            hasContent
              ? "/icons/back_chevron_black.svg"
              : "/icons/search_icon_color_black.svg"
          }) no-repeat scroll 20px 22px};
        }

        .search_input:focus {
          ${Consts.CSS_SHADOW}
        }

        .search_input_default_state {
          max-width: 300px;
          margin: 0px 40px 0px 40px;
          transform: translate(0px, ${restingStateSearchBarYOffset}px);
        }

        .search_input ::placeholder {
          color: #999999;
        }

        .search_input::-webkit-search-cancel-button {
          -webkit-appearance: none;
        }
      `}</style>
      <div className="search_container">
        <a
          className="back_button"
          href="#"
          aria-label="clear search"
          onClick={(e) => {
            onChange("");
            e.preventDefault();
            if (ref.current) {
              // focus and click required to trigger keyboard on mobile
              ref.current.focus();
              ref.current.click();
            }
          }}
        />
        <input
          id="search"
          className={classNames({
            search_input: true,
            search_input_default_state: !hasContent
          })}
          aria-label="Search Popcorn GIF"
          placeholder="Search Popcorn GIF"
          type="search"
          value={text}
          onChange={(e) => {
            onChange(e.target.value);
            e.target.focus();
          }}
          autoComplete="off"
          ref={ref}
        />
      </div>
    </div>
  );
}
