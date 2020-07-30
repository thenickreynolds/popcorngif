type Style = "primary" | "secondary";

export default function LoadingSpinner({
  style,
  size,
}: {
  style?: Style;
  size?: number;
}) {
  size = size || 60;
  style = style || "primary";
  const color = style === "primary" ? "#ee6e73" : "#aaaaaa";

  return (
    <>
      <style jsx={true}>{`
        .loader {
          border: 4px solid #dddddd;
          border-top: 4px solid ${color};
          border-radius: 50%;
          width: ${size}px;
          height: ${size}px;
          animation: spin 0.4s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="loader"></div>
    </>
  );
}
