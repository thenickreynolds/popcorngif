export default function Footer() {
  return (
    <div className="container">
      <style jsx={true}>{`
        .container {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: stretch;
          color: #ffffff;
          font-size: 8pt;
        }

        .footer_row {
          display: flex;
          flex-direction: row;
          align-content: stretch;
          padding: 14px;
        }

        .footer_row_top {
          background-color: #ee6e73;
        }

        .footer_row_bottom {
          background-color: #df696e;
        }

        .footer_item {
          flex-grow: 1;
        }

        .footer_right {
          text-align: right;
        }

        .tenor_logo {
          height: 12px;
        }
      `}</style>
      <div className="footer_row footer_row_top">
        <div className="footer_item">
          <a href="http://nickreynolds.net/">created by nick reynolds</a>
        </div>
        <div className="footer_item footer_right">
          <a href="https://tenor.com/">
            via{" "}
            <img className="tenor_logo" src="/tenor.svg" alt="Logo for Tenor" />
          </a>
        </div>
      </div>
      <div className="footer_row footer_row_bottom">
        <div className="footer_item">
          <a
            href="https://github.com/thenickreynolds/popcorngif"
            target="_blank"
          >
            see on github
          </a>
        </div>
        <div className="footer_item footer_right">
          <a
            href="https://chrome.google.com/webstore/detail/gif-search/hhbinbjmknpkmebphiohakpakndjhpoe?hl=en"
            target="_blank"
          >
            extension store
          </a>
        </div>
      </div>
    </div>
  );
}
