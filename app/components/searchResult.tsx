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
import GifResourceUtils from "../utils/gifResourceUtils";
import Image from "next/image";
import MarkdownAction from "../public/icons/markdown_logo.svg";
import LinkAction from "../public/icons/link-black-18dp.svg";
import SaveAction from "../public/icons/save-black-18dp.svg";
import ShareAction from "../public/icons/share-24px.svg";

function logShare(id: string, shareType: string) {
  GALogger.gifAction(shareType);
  axios.get(SearchTenor.shareUrl(id));
}

function Action({
  icon,
  text,
  height,
  width,
  onClick,
}: {
  icon: any;
  text: string;
  height: number;
  width: number;
  onClick: () => void;
}) {
  return (
    <>
      <style jsx={true}>{`
        .action {
          padding-left: 5px;
        }

        .action_icon {
          height: ${height}px;
          width: ${width}px;
        }
      `}</style>
      <div className="action">
        <Tooltip text={text}>
          <a
            href="#"
            onClick={(e) => {
              onClick();
              e.preventDefault();
            }}
          >
            <Image
              className="action_icon"
              src={icon}
              alt={text}
              width={width}
              height={height}
            />
          </a>
        </Tooltip>
      </div>
    </>
  );
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
  const media = GifResourceUtils.getMedia(result);
  const url = media.url;

  const ratio =
    GifResourceUtils.getHeight(media) / GifResourceUtils.getWidth(media);
  const height = gifSize.width * ratio;

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
          height: ${height}px;
          box-shadow: 1px 1px 3px gray;
          overflow: hidden;
        }

        .gif {
          background-color: #cccccc;
          height: 100%;
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
          padding: 5px 10px 0px 5px;
        }
      `}</style>

      <img
        src={url}
        className="gif"
        onDragStart={() => logShare(result.id, "drag")}
      />

      <div className="action_container">
        <div className="action_buttons">
          <Action
            text="Copy markdown"
            icon={MarkdownAction}
            height={25}
            width={40}
            onClick={() => {
              Clipboard.write(markdown);
              toaster.info("Markdown copied");
              logShare(result.id, "copy_markdown");
            }}
          />
          <Action
            text="Copy link"
            icon={LinkAction}
            height={25}
            width={25}
            onClick={() => {
              Clipboard.write(url);
              toaster.info("Link copied");
              logShare(result.id, "copy_url");
            }}
          />
          {Download.isSupported() ? (
            <Action
              text="Download"
              icon={SaveAction}
              height={25}
              width={25}
              onClick={() => {
                Download.download(url, term + ".gif");
                toaster.info("Downloading...");
                logShare(result.id, "download");
              }}
            />
          ) : null}
          {isShareSupported ? (
            <Action
              text="Share"
              icon={ShareAction}
              height={25}
              width={25}
              onClick={() => {
                share({ text: `Shared via Popcorn GIF Search`, url });
                logShare(result.id, "share");
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
