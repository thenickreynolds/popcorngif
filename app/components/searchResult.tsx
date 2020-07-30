import { Result } from "../types/tenorTypes";
import Tooltip from "./tooltip";
import Clipboard from "../utils/clipboard";

export const GIF_WIDTH_PX = 220;
export const GIF_MARGIN_PX = 10;

export default function SearchResult({
  term,
  result,
}: {
  term: string;
  result: Result;
}) {
  const url = result.media[0].tinygif.url;
  const markdown = `![${term}](${url})`;

  return (
    <div className="gif_container">
      <style jsx={true}>{`
        .gif_container {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          margin-bottom: ${GIF_MARGIN_PX}px;
          background-color: #eeeeee;
          border-radius: 5px;
          width: ${GIF_WIDTH_PX}px;
          transition: ease-in-out, 0.35s ease-in-out;
          box-shadow: 1px 1px 3px gray;
        }

        .gif_box {
          position: relative;
        }

        .gif {
          border-radius: 5px 5px 0px 0px;
          min-height: 100px;
          background-color: #cccccc;
          width: ${GIF_WIDTH_PX}px;
        }

        .action_container {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          padding: 4px 8px 4px 4px;
        }

        .action {
          padding-left: 4px;
        }

        .action_icon {
          height: 18px;
        }
      `}</style>

      <img src={url} className="gif" />

      <div className="action_container">
        <div className="action">
          <Tooltip text="Copy markdown">
            <a
              href="#"
              onClick={() => {
                Clipboard.write(markdown);
              }}
            >
              <img
                className="action_icon"
                src="/icons/github-logo-tiny.svg"
                alt="Copy markdown"
              />
            </a>
          </Tooltip>
        </div>
        <div className="action">
          <Tooltip text="Copy link">
            <a
              href="#"
              onClick={() => {
                Clipboard.write(url);
              }}
            >
              <img
                className="action_icon"
                src="/icons/content_copy-black-18dp.svg"
                alt="Copy link"
              />
            </a>
          </Tooltip>
        </div>
        <div className="action">
          <Tooltip text="Save">
            <a href="#">
              <img
                className="action_icon"
                src="/icons/save-black-18dp.svg"
                alt="Download GIF"
              />
            </a>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
