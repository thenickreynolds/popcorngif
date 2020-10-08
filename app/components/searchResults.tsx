import { Result } from "../types/tenorTypes";
import SearchResult from "./searchResult";
import useGifSizer from "../utils/useGifSizer";

export default function SearchResults({
  term,
  results,
}: {
  term: string;
  results: Result[];
}) {
  const gifSize = useGifSizer();

  const columns: Result[][] = [];

  // TODO change so we add to the shortest one so far
  for (let i = 0; i < results.length; i++) {
    const column = i % gifSize.numColumns;
    if (columns[column] === undefined) columns[column] = [];
    columns[column].push(results[i]);
  }

  return (
    <>
      <style jsx={true}>{`
        .results_container {
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          padding-right: ${gifSize.spacing}px;
          padding-top: ${gifSize.spacing}px;
          width: 100%;
        }

        .gif_column {
          display: flex;
          flex-direction: column;
          margin-left: ${gifSize.spacing}px;
        }
      `}</style>
      <div className="results_container">
        {columns.map((column, i) => {
          return (
            <div key={`column_${i}`} className="gif_column">
              {column.map((result) => (
                <SearchResult key={result.id} term={term} result={result} />
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}
