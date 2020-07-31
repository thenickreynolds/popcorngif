export default function SearchBox({
  text,
  onChange,
}: {
  text: string;
  onChange: (text: string) => void;
}) {
  return (
    <div>
      <style jsx={true}>{`
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
          background: #ee6e73 url(/search_icon_color_feature.svg) no-repeat
            scroll 20px 22px;
        }

        .search_input:focus {
          color: #000000;
          background: #ffffff url(/search_icon_color_black.svg) no-repeat scroll
            20px 22px;
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
        <input
          className="search_input"
          placeholder="Search gifs"
          type="search"
          value={text}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
