import { InlineShareButtons } from "sharethis-reactjs";

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
          filter: grayscale(50%);
        }

        .footer_item > a {
          color: #ffffff;
        }

        .footer_right {
          flex-direction: row-reverse;
        }

        .share_text {
          margin-left: 5px;
        }

        .tenor_logo {
          height: 12px;
        }
      `}</style>
      <div className="footer_row">
        <div className="footer_item">
          <InlineShareButtons
            config={{
              alignment: "left",
              color: "social",
              enabled: true,
              font_size: 16,
              labels: null,
              language: "en",
              networks: ["facebook", "twitter", "reddit", "sharethis"],
              padding: 12,
              radius: 4,
              show_total: false,
              size: 25,
              url: "https://popcorngifsearch.com",
            }}
          />
          <div className="share_text">share with your friends</div>
        </div>
        <div className="footer_item footer_right">
          <a href="https://tenor.com/">
            Powered by{" "}
            <img className="tenor_logo" src="/tenor.svg" alt="Logo for Tenor" />
          </a>
        </div>
      </div>
    </>
  );
}
