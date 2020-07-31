export default function Placeholder({ onClick }: { onClick: () => void }) {
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
          height: 140px;
        }

        h1 {
          font-size: 1.536rem;
          font-weight: normal;
        }
      `}</style>
      <a href="#" onClick={(e) => onClick()}>
        <img src="/popcorn-large.png" className="logo" />
      </a>
      <h1>Welcome to Popcorn GIF</h1>
    </div>
  );
}
