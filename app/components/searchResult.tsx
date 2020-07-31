import { Result } from "../types/tenorTypes";
import Clipboard from "../utils/clipboard";
import useWebShare from "react-use-web-share";
import { useContext, useState } from "react";
import { ToastContext } from "./toastContainer";
import GALogger from "../utils/GALogger";
import axios from "axios";
import SearchTenor from "../utils/searchTenor";
import useGifSizer from "../utils/useGifSizer";
import Download from "../utils/download";
import Tooltip from "./tooltip";

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
  const [showControls, setShowControls] = useState(false);

  const forceControlsOn = false;

  const { isSupported: isShareSupported, share } = useWebShare();
  const url = result.media[0].tinygif.url;
  const markdown = `![${term}](${url})`;

  return (
    <div
      className="gif_container"
      onMouseOver={() => forceControlsOn || setShowControls(true)}
      onMouseOut={() => forceControlsOn || setShowControls(false)}
      onFocus={() => forceControlsOn || setShowControls(true)}
      onBlur={() => forceControlsOn || setShowControls(false)}
    >
      <style jsx={true}>{`
        .gif_container {
          display: flex;
          flex-direction: column;
          margin-bottom: ${gifSize.spacing}px;
          background-color: #eeeeee;
          border-radius: 5px;
          width: ${gifSize.width}px;
          box-shadow: 1px 1px 3px gray;
          overflow: hidden;
        }

        .gif {
          min-height: 100px;
          background-color: #cccccc;
          width: 100%;
        }

        .action_container {
          width: inherit;
          position: absolute;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          opacity: ${showControls || forceControlsOn ? 1 : 0.25};
          transition: ease-in-out, 0.15s ease-in-out;
          padding: 10px;
        }

        .action_buttons {
          background-color: #ffffff;
          box-shadow: 0px 0px 4px gray;
          display: flex;
          flex-direction: row;
          justify-content: center;
          border-radius: 500px;
          padding: 5px 10px 2px 5px;
        }

        .action {
          padding-left: 5px;
        }

        .action_icon {
          height: 25px;
        }
      `}</style>

      <img
        src={url}
        className="gif"
        onDragStart={() => logShare(result.id, "drag")}
      />

      <div className="action_container">
        <div className="action_buttons">
          <div className="action">
            <Tooltip text="Copy markdown">
              <a
                href="#"
                onClick={(e) => {
                  Clipboard.write(markdown);
                  toaster.info("Markdown copied");
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
                  toaster.info("Link copied");
                  logShare(result.id, "copy_url");
                  e.preventDefault();
                }}
              >
                <img
                  className="action_icon"
                  src="/icons/link-black-18dp.svg"
                  alt="Copy link"
                />
              </a>
            </Tooltip>
          </div>
          {Download.isSupported() ? (
            <div className="action">
              <Tooltip text="Download">
                <a
                  href="#"
                  onClick={(e) => {
                    Download.download(url, term + ".gif");
                    toaster.info("Downloading...");
                    logShare(result.id, "download");
                    e.preventDefault();
                  }}
                >
                  <img
                    className="action_icon"
                    src="/icons/save-black-18dp.svg"
                    alt="Download"
                  />
                </a>
              </Tooltip>
            </div>
          ) : null}
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
    </div>
  );
}
