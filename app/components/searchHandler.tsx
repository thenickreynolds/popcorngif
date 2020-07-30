import { useEffect, useState } from "react";
import axios from "axios";
import SearchTenor from "../utils/searchTenor";
import { Result, TenorSearchResult } from "../types/tenorTypes";
import useThrottle from "../utils/useThrottle";
import SearchResults from "./searchResults";
import LoadingSpinner from "./loadingSpinner";

const CancelToken = axios.CancelToken;

export default function SearchHandler({ term }: { term: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const throttledTerm = useThrottle(term, 300);

  const hasSearchTerm = throttledTerm.length > 0;

  useEffect(() => {
    setError(false);
    setResults([]);
    setIsLoading(false);

    if (!hasSearchTerm) {
      return;
    }

    setIsLoading(true);
    const source = CancelToken.source();
    const url = SearchTenor.getUrl(throttledTerm);
    axios
      .get<TenorSearchResult>(url, { cancelToken: source.token })
      .then((response) => {
        setResults(response.data.results);
      })
      .catch((e) => {
        console.log(`Hit error requesting data: ${JSON.stringify(e)}`);
        setError(true);
      })

      .finally(() => setIsLoading(false));

    return () => {
      source.cancel("Cleaning up request");
    };
  }, [throttledTerm]);

  if (!hasSearchTerm) {
    return <></>;
  }

  if (isLoading) {
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
