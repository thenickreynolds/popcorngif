import Upsells from "./upsells";
import useWindowDimensions from "../utils/useWindowDimensions";
import PopcornLarge from "../public/popcorn-large.png";
import Image from "next/image";

export default function Placeholder({ onClick }: { onClick: () => void }) {
  const { width } = useWindowDimensions();

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
      `}</style>
      <a href="#" onClick={(e) => onClick()}>
        <Image
          src={PopcornLarge}
          className="logo"
          width="140"
          height="142"
          alt="Popcorn GIF Search"
        />
      </a>
      <h1>Welcome to Popcorn GIF</h1>
      <Upsells height={100} width={width} />
    </div>
  );
}
