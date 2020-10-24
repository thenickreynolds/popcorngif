import Upsells from "./upsells";
import useWindowDimensions from "../utils/useWindowDimensions";
import { useLayoutEffect, useRef } from "react";

export default function Placeholder(
  {
    setSearchTerm,
    onTitlePositionUpdated
  }: {
    setSearchTerm: (term: string) => void;
    onTitlePositionUpdated: (yOffset: number) => void;
  }) {
  const { width } = useWindowDimensions();
  const titleRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    onTitlePositionUpdated(titleRef.current?.offsetTop || 0);
  }, [titleRef]);

  return (
    <div className="container">
      <style jsx={true}>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .logo {
          width: 140px;
          height: 142px;
        }

        h1 {
          font-size: 1.9rem;
          font-weight: normal;
          margin-bottom: 40px;
        }

        #searchPlaceholder {
          margin-top: 30px;
          height: 100px;
        }
      `}</style>
      <a href="#" onClick={(e) => setSearchTerm("popcorn")}>
        <img
          src="/popcorn-large.png"
          className="logo"
          alt="Popcorn GIF Search"
        />
      </a>
      <div ref={titleRef} id="searchPlaceholder" />
      <Upsells height={100} width={width} />
    </div>
  );
}
