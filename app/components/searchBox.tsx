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
          visibility: ${hasContent ? "visible" : "collapse"};
          opacity: ${hasContent ? 1 : 0};
          transition: ease-in-out, 0.35s ease-in-out;
          width: 40px;
          height: 45px;
          top: 6px;
          left: 8px;
        }

        .search_input {
          width: 100%;
          outline: none;
          padding: 22px 10px 16px 52px;
          color: #ffffff;
          transition: ease-in-out, 0.35s ease-in-out;
          border: none;
          box-shadow: 2px 1px 3px gray;
          font-size: 12pt;
          font-weight: none;
          background: #ee6e73 url(/icons/search_icon_color_feature.svg) no-repeat
            scroll 20px 20px;
        }

        .search_input:focus {
          color: #000000;
          background: #ffffff url(${
            hasContent
              ? "/icons/keyboard_arrow_left-24px.svg"
              : "/icons/search_icon_color_black.svg"
          }) no-repeat scroll 20px 20px};
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
