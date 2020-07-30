export default function Tooltip({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <style jsx={true}>{`
        .tooltip {
          position: relative;
          display: inline-block;
        }

        /* Tooltip text */
        .tooltip .tooltiptext {
          visibility: hidden;
          background-color: black;
          color: #fff;
          text-align: center;
          padding: 5px;
          border-radius: 6px;
          opacity: 0;

          /* Position the tooltip text - see examples below! */
          position: absolute;
          z-index: 1;

          top: 100%;
          left: 50%;

          font-size: 9pt;
          transition: ease-in-out, 0.35s ease-in-out;
        }

        /* Show the tooltip text when you mouse over the tooltip container */
        .tooltip:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
        }
      `}</style>
      <div className="tooltip">
        {children}
        <span className="tooltiptext">{text}</span>
      </div>
    </>
  );
}
