import useEnvironment from "../utils/useEnvironment";
import Consts from "../utils/consts";

export default function Footer() {
  const environment = useEnvironment();

  return (
    <div className="container">
      <style jsx={true}>{`
        .container {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: stretch;
          color: #ffffff;
          font-size: 10pt;
        }

        .footer_row {
          display: flex;
          flex-direction: row;
          align-content: stretch;
          padding: 14px;
          background-color: #df696e;
        }

        .footer_item {
          flex-grow: 1;
        }

        .footer_item > a {
          color: #ffffff;
        }

        .footer_right {
          text-align: right;
        }

        .tenor_logo {
          height: 12px;
        }
      `}</style>
      <div className="footer_row">
        <div className="footer_item">
          {environment === "extension" ? (
            <a href={Consts.WEBSITE_URL}>Check out our new website!</a>
          ) : (
            <a href={Consts.EXTENSION_URL}>
              Try our Chrome extension and keep GIFs one click (or hotkey) away!
            </a>
          )}
        </div>
        <div className="footer_item footer_right">
          <a href="https://tenor.com/">
            Powered by{" "}
            <img className="tenor_logo" src="/tenor.svg" alt="Logo for Tenor" />
          </a>
        </div>
      </div>
    </div>
  );
}
