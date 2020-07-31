import { useEffect, useState } from "react";
import axios from "axios";
import SearchTenor from "../utils/searchTenor";
import { Result, TenorSearchResult } from "../types/tenorTypes";
import useThrottle from "../utils/useThrottle";
import LoadingSpinner from "./loadingSpinner";
import SearchResults from "./searchResults";
import GALogger from "../utils/GALogger";

const CancelToken = axios.CancelToken;
const requestCancelledError = "Cancelling request";

export default function SearchHandler({ term }: { term: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const throttledTerm = useThrottle(term, 600);

  const hasSearchTerm = throttledTerm.length > 0;

  useEffect(() => {
    setError(false);
    setResults([]);
    setIsLoading(false);

    if (!hasSearchTerm) {
      return;
    }

    GALogger.search();
    console.log("searching: " + throttledTerm);

    setIsLoading(true);
    const source = CancelToken.source();
    const url = SearchTenor.searchUrl(throttledTerm);
    axios
      .get<TenorSearchResult>(url, { cancelToken: source.token })
      .then((response) => {
        setResults(response.data.results);
      })
      .catch((e) => {
        if (requestCancelledError === requestCancelledError) return;

        console.log(`Hit error requesting data: ${JSON.stringify(e)}`);
        GALogger.error("Search", e);
        setError(true);
      })
      .finally(() => setIsLoading(false));

    return () => {
      source.cancel(requestCancelledError);
    };
  }, [throttledTerm]);

  if (!hasSearchTerm || isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>An error was hit, please try again</div>;
  }

  if (results.length === 0) {
    return <div>No results :(</div>;
  }

  return <SearchResults results={results} term={throttledTerm} />;
}
