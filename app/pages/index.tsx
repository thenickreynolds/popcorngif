import Head from "next/head";
import Script from "next/script";
import {useRouter, usePathname, useSearchParams } from "next/navigation";
import Footer from "../components/footer";
import SearchBox from "../components/searchBox";
import SearchHandler from "../components/searchHandler";
import ToastContainer from "../components/toastContainer";

const DESCRIPTION =
  "Seach GIFs fast! Zero ads, super fast results, click and drag into emails or one click download/copy markdown for your blog or GitHub comments!";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  const setSearchValue = (text: string) => {
      if (text == "") {
          router.push(pathname)
          return
      }
      const params = new URLSearchParams();
      params.set("search", text);
      router.push(pathname + "?" + params.toString());
  }

  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search") ?? "";
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
          max-width: 100%;
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
        <link
          rel="manifest"
          href="/favicon/site.webmanifest"
          crossOrigin="anonymous"
        />

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

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-38XW9XL27D"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-38XW9XL27D');
          `,
        }}
      />

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
