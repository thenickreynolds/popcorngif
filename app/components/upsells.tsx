import { CarouselProvider, Slider, Slide } from "pure-react-carousel";

function getUpsells() {
  const upsells: React.ReactNode[] = [];

  upsells.push(
    <>Click &amp; Drag GIFs directly into Gmail or any other client</>
  );
  upsells.push(
    <>Copy markdown to add directly to Github, Bitbucket, or your blog</>
  );
  upsells.push(
    <>Check out our site on your phone, built to be a great mobile experience</>
  );
  {
    /* TODO: install the extension (if not in extension), like us on Facebook, tell your friends */
  }
  return upsells;
}

export default function Upsells({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const upsells = getUpsells();

  return (
    <>
      <style jsx={true}>{`
        .carousel {
          width: ${width}px;
          height: ${height}px;
        }

        .slide {
          width: ${width}px;
          height: 100px;
          text-align: center;
          color: #999999;
        }
      `}</style>
      <div className="carousel">
        <CarouselProvider
          className="carousel"
          naturalSlideWidth={width}
          naturalSlideHeight={height}
          interval={8000}
          isPlaying={true}
          totalSlides={upsells.length}
          infinite={true}
        >
          <Slider>
            {upsells.map((upsell, i) => {
              return (
                <Slide key={i} index={i}>
                  <div className="slide">{upsell}</div>
                </Slide>
              );
            })}
          </Slider>
        </CarouselProvider>
      </div>
    </>
  );
}
