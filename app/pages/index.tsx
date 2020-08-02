import Head from "next/head";
import { useState } from "react";
import Footer from "../components/footer";
import SearchBox from "../components/searchBox";
import dynamic from "next/dynamic";
import SearchHandler from "../components/searchHandler";

const AnalyticsPageLogger = dynamic(() =>
  import("../components/analyticsPageLogger")
);
const ToastContainer = dynamic(() => import("../components/toastContainer"));

const DESCRIPTION =
  "Seach GIFs fast! Zero ads, super fast results, click and drag into emails or one click download/copy markdown for your blog or GitHub comments!";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

  const searchTerm = searchValue.trim();

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

        <meta property="og:title" content="Popcorn GIF Search" />
        <meta property="og:url" content="https://popcorngifseach.com" />
        <meta
          property="og:image"
          content="https://popcorngifsearch.com/icon.png"
        />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:site_name" content="Popcorn GIF Search" />
        <meta name="Description" content={DESCRIPTION} />
      </Head>

      <AnalyticsPageLogger />

      <header>
        <SearchBox text={searchValue} onChange={setSearchValue} />
      </header>

      <ToastContainer />

      <main className="main">
        <SearchHandler
          term={searchTerm}
          onForceSearch={(term) => setSearchValue(term)}
        />
      </main>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}
