import Head from "next/head";
import { useState } from "react";
import Footer from "../components/footer";
import Placeholder from "../components/placeholder";
import SearchBox from "../components/searchbox";
import SearchHandler from "../components/searchHandler";

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
      </Head>

      <header>
        <SearchBox text={searchValue} onChange={setSearchValue} />
      </header>
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
