import { Result } from "../types/tenorTypes";
import SearchResult from "./searchResult";
import useGifSizer from "../utils/useGifSizer";
import GifResourceUtils from "../utils/gifResourceUtils";

function indexOfSmallest(arr: number[]) {
  var lowest = 0;
  for (var i = 1; i < arr.length; i++) {
   if (arr[i] < arr[lowest]) lowest = i;
  }
  return lowest;
 }

export default function SearchResults({
  term,
  results,
}: {
  term: string;
  results: Result[];
}) {
  const gifSize = useGifSizer();

  const columns: Result[][] = [];
  const columnsLengths: number[] = [];

  // Init columns
  for (let column = 0; column < gifSize.numColumns; column++) {
    columns[column] = [];
    columnsLengths[column] = 0;
  }

  // Sort GIFs into equal columns
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const column = indexOfSmallest(columnsLengths);

    const media = GifResourceUtils.getMedia(result);
    const height = GifResourceUtils.getHeight(media);

    columns[column].push(result);
    columnsLengths[column] += height;
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
