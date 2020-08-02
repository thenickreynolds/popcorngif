import Head from "next/head";
import { useState } from "react";
import Footer from "../components/footer";
import Placeholder from "../components/placeholder";
import SearchBox from "../components/searchBox";
import dynamic from "next/dynamic";

const AnalyticsPageLogger = dynamic(() =>
  import("../components/analyticsPageLogger")
);
const ToastContainer = dynamic(() => import("../components/toastContainer"));
const SearchHandler = dynamic(() => import("../components/searchHandler"));

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

  const searchTerm = searchValue.trim();
  const hasSearchTerm = searchTerm.length > 0;

  const placeholderClick = () => {
    setSearchValue("popcorn");
  };

  return (
    <div className="container">
      <style jsx={true}>{`
        .container {
          min-height: 100vh;
          padding: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: stretch;
          width: 100%;
        }

        .main {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          align-items: center;
        }

        .contents {
          flex-grow: 1;
          width: 100%;
        }
      `}</style>
      <Head>
        <title>Popcorn GIF Search</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        <meta
          name="Description"
          content="Seach GIFs fast! Zero ads, super fast results, click and drag into emails or one click download/copy markdown for your blog or GitHub comments!"
        />

        <script
          type="text/javascript"
          src="https://platform-api.sharethis.com/js/sharethis.js#property=5f25b2550b3e120012853e49&product=inline-share-buttons"
          async={true}
        />
      </Head>

      <AnalyticsPageLogger />

      <header>
        <SearchBox text={searchValue} onChange={setSearchValue} />
      </header>

      <ToastContainer />

      <main className="main">
        {hasSearchTerm ? (
          <SearchHandler term={searchTerm} />
        ) : (
          <Placeholder onClick={placeholderClick} />
        )}
      </main>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}
