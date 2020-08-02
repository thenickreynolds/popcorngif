import dynamic from "next/dynamic";
import ExternalLink from "./externalLink";
import ShareButtons from "./shareButtons";

export default function Footer() {
  return (
    <>
      <style jsx={true}>{`
        .footer_row {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          color: #ffffff;
          font-size: 10pt;
          background-color: #df696e;
        }

        .footer_item {
          display: flex;
          flex-direction: row;
          flex-grow: 1;
          padding: 8px;
          align-items: center;
        }

        .share_buttons {
          filter: grayscale(70%);
        }

        .footer_link {
          color: #ffffff;
        }

        .footer_right {
          flex-direction: row-reverse;
        }

        .share_text {
          margin-right: 10px;
        }

        .tenor_logo {
          height: 12px;
        }
      `}</style>
      <div className="footer_row">
        <div className="footer_item">
          <div className="share_text">Share the ❤️</div>
          <div className="share_buttons">
            <ShareButtons />
          </div>
        </div>
        <div className="footer_item footer_right">
          <ExternalLink href="https://tenor.com/">
            <div className="footer_link">
              Powered by{" "}
              <img
                className="tenor_logo"
                src="/tenor.svg"
                alt="Logo for Tenor"
              />
            </div>
          </ExternalLink>
        </div>
      </div>
    </>
  );
}
