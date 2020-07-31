import { Result } from "../types/tenorTypes";
import Tooltip from "./tooltip";
import Clipboard from "../utils/clipboard";
import useWebShare from "react-use-web-share";
import { useContext } from "react";
import { ToastContext } from "./toastContainer";
import GALogger from "../utils/GALogger";
import axios from "axios";
import SearchTenor from "../utils/searchTenor";
import useGifSizer from "../utils/useGifSizer";

function logShare(id: string, shareType: string) {
  GALogger.gifAction(shareType);
  axios.get(SearchTenor.shareUrl(id));
}

export default function SearchResult({
  term,
  result,
}: {
  term: string;
  result: Result;
}) {
  const toaster = useContext(ToastContext);
  const gifSize = useGifSizer();

  const { isSupported: isShareSupported, share } = useWebShare();
  const url = result.media[0].tinygif.url;
  const markdown = `![${term}](${url})`;

  return (
    <div className="gif_container">
      <style jsx={true}>{`
        .gif_container {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          margin-bottom: ${gifSize.spacing}px;
          background-color: #eeeeee;
          border-radius: 5px;
          width: ${gifSize.width}px;
          box-shadow: 1px 1px 3px gray;
        }

        .gif_box {
          position: relative;
        }

        .gif {
          border-radius: 5px 5px 0px 0px;
          min-height: 100px;
          background-color: #cccccc;
          width: ${gifSize.width}px;
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

      <img
        src={url}
        className="gif"
        onDragStart={() => logShare(result.id, "drag")}
      />

      <div className="action_container">
        <div className="action">
          <Tooltip text="Copy markdown">
            <a
              href="#"
              onClick={(e) => {
                Clipboard.write(markdown);
                toaster.info("Copied to clipboard");
                logShare(result.id, "copy_markdown");
                e.preventDefault();
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
              onClick={(e) => {
                Clipboard.write(url);
                toaster.info("Copied to clipboard");
                logShare(result.id, "copy_url");
                e.preventDefault();
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
        {isShareSupported ? (
          <div className="action">
            <Tooltip text="Share">
              <a
                href="#"
                onClick={(e) => {
                  share({ text: `Shared via Popcorn GIF Search`, url });
                  logShare(result.id, "share");
                  e.preventDefault();
                }}
              >
                <img
                  className="action_icon"
                  src="/icons/share-24px.svg"
                  alt="Copy link"
                />
              </a>
            </Tooltip>
          </div>
        ) : null}
      </div>
    </div>
  );
}
