import { useRef } from "react";
import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBox({
  text,
  onChange,
}: {
  text: string;
  onChange: (text: string) => void;
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
  const focused = ref.current != null && ref.current === document.activeElement;

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
          background: #ee6e73;
        }

        .search_input:focus {
          color: #000000;
          background: #ffffff;
        }

        .search_input:focus ::placeholder {
          color: #999999;
        }

        input::placeholder {
          color: #000000;
        }

        .search_input ::placeholder {
          color: #FFFFFF;
        }

        .search_input::-webkit-search-cancel-button {
          -webkit-appearance: none;
        }
      `}</style>

      <form>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pt-1 pointer-events-none">
            <FaSearch />
          </div>
          <input
            type="search"
            id="search_input"
            className="search_input block w-full p-4 pl-10 border-transparent focus:border-transparent focus:ring-0"
            placeholder="Search GIFs"
            value={text}
            onChange={(e) => onChange(e.target.value)}
            autoComplete="off"
            ref={ref}
          />
        </div>
      </form>
    </div>
  );
}
