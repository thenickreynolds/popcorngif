import { Result } from "../types/tenorTypes";
import SearchResult, { GIF_MARGIN_PX, GIF_WIDTH_PX } from "./searchResult";
import { useRef, useState } from "react";
import { useLayoutEffect } from "react";

export default function SearchResults({
  term,
  results,
}: {
  term: string;
  results: Result[];
}) {
  const [columnCount, setColumnCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const columns = Math.floor(
        (width - GIF_MARGIN_PX) / (GIF_WIDTH_PX + GIF_MARGIN_PX)
      );
      setColumnCount(columns);
    }
  }, [containerRef.current?.offsetWidth || 1]);

  const columns: Result[][] = [];
  console.log(columnCount);
  for (let i = 0; i < results.length; i++) {
    const column = i % columnCount;
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
          padding-right: ${GIF_MARGIN_PX}px;
          padding-top: ${GIF_MARGIN_PX}px;
          width: 100%;
        }

        .gif_column {
          display: flex;
          flex-direction: column;
          margin-left: ${GIF_MARGIN_PX}px;
        }
      `}</style>
      <div className="results_container" ref={containerRef}>
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
