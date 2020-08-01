import { useEffect } from "react";
import { useState } from "react";

const intervalMs = 8000;

export default function Carousel({
  children,
  width,
}: {
  children: React.ReactNode[];
  width: number;
}) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      const numChildren = children.length;
      i = numChildren === 0 ? 0 : (i + 1) % numChildren;
      setIndex(i);
    }, intervalMs);
    return () => clearInterval(intervalId);
  }, [children]);

  return (
    <>
      <style jsx={true}>{`
        .container {
          width: ${width}px;
          overflow: hidden;
        }

        .spanner {
          display: flex;
          flex-direction: row;
          width: ${width * children.length}px;
          transform: translate(${-1 * width * index}px, 0px);
          transition: ease-in-out, 0.35s ease-in-out;
        }

        .card {
          text-align: center;
          width: ${width}px;
          color: #666666;
        }

        .card a:link {
        }
      `}</style>
      <div className="container">
        <div className="spanner">
          {children.map((child, i) => {
            return (
              <div key={i} className="card">
                {child}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
