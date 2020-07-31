import { useRef } from "react";
import { useEffect } from "react";

export default function SearchBox({
  text,
  onChange,
}: {
  text: string;
  onChange: (text: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      // focus and click required to trigger keyboard on mobile
      ref.current.focus();
      ref.current.click();
    }
  }, [ref]);

  const hasContent = text.length > 0;

  return (
    <div>
      <style jsx={true}>{`
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
          color: #ffffff;
          transition: ease-in-out, 0.35s ease-in-out;
          border: none;
          box-shadow: 2px 1px 3px gray;
          font: font-family: "Roboto", sans-serif;
          font-size: 13pt;
          font-weight: none;
          background: #ee6e73 url(${
            hasContent
              ? "/icons/back_chevron_feature.svg"
              : "/icons/search_icon_color_feature.svg"
          }) no-repeat
            scroll 20px 22px;
        }

        .search_input:focus {
          color: #000000;
          background: #ffffff url(${
            hasContent
              ? "/icons/back_chevron_black.svg"
              : "/icons/search_icon_color_black.svg"
          }) no-repeat scroll 20px 22px};
        }

        .search_input:focus ::placeholder {
          color: #999999;
        }

        .search_input ::placeholder {
          color: #eebdbf;
        }

        .search_input::-webkit-search-cancel-button {
          -webkit-appearance: none;
        }
      `}</style>
      <div>
        <a
          className="back_button"
          href="#"
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
          className="search_input"
          placeholder="Search gifs"
          type="search"
          value={text}
          onChange={(e) => onChange(e.target.value)}
          ref={ref}
        />
      </div>
    </div>
  );
}
