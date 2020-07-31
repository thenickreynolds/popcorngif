import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";

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

        .carousel {
          width: 300px;
          height: 100px;
          margin-top: 40px;
        }

        .slide {
          width: 300px;
          height: 100px;
          text-align: center;
          color: #999999;
        }
      `}</style>
      <a href="#" onClick={(e) => onClick()}>
        <img src="/popcorn-large.png" className="logo" />
      </a>
      <h1>Welcome to Popcorn GIF</h1>
      <div className="carousel">
        <CarouselProvider
          className="carousel"
          naturalSlideWidth={300}
          naturalSlideHeight={100}
          interval={4000}
          isPlaying={true}
          totalSlides={3}
          infinite={true}
        >
          <Slider>
            <Slide index={0}>
              <div className="slide">
                Click &amp; Drag GIFs directly into Gmail or any other client
              </div>
            </Slide>
            <Slide index={1}>
              <div className="slide">
                Copy markdown to add directly to Github, Bitbucket, or your blog
              </div>
            </Slide>
            <Slide index={2}>
              <div className="slide">
                Check out our site on your phone, built to be a great mobile
                experience
              </div>
            </Slide>
          </Slider>
        </CarouselProvider>
      </div>
    </div>
  );
}
