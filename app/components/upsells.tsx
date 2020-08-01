import useEnvironment, { Environment } from "../utils/useEnvironment";
import useDeviceDetect from "../utils/useDeviceDetect";
import Consts from "../utils/consts";
import Carousel from "./carousel";

type UpsellInfo = {
  element: React.ReactNode;
  environmentFilter?: Environment;
  showOnMobile: boolean;
};

function getUpsells() {
  const environment = useEnvironment();
  const { isMobile } = useDeviceDetect();
  const shouldShowUpsell = (upsell: UpsellInfo) => {
    const meetsMobileCriteria = !isMobile || upsell.showOnMobile;
    const meetsEnvironmentCriteria =
      !upsell.environmentFilter || upsell.environmentFilter === environment;
    return meetsMobileCriteria && meetsEnvironmentCriteria;
  };

  const upsellInfo: UpsellInfo[] = [];

  upsellInfo.push({
    element: (
      <div>Click &amp; Drag GIFs directly into Gmail or any other client</div>
    ),
    showOnMobile: false,
  });

  upsellInfo.push({
    element: (
      <div>
        Check out <a href={Consts.WEBSITE_URL}>the Popcorn GIF site</a> on your
        phone, built to be a great mobile experience
      </div>
    ),
    showOnMobile: false,
  });

  upsellInfo.push({
    element: (
      <div>
        Copy markdown to add directly to Github, Bitbucket, or your blog
      </div>
    ),
    showOnMobile: true,
  });

  upsellInfo.push({
    element: (
      <div>
        Try our{" "}
        <a href={Consts.EXTENSION_URL} target="_blank">
          Chrome extension
        </a>{" "}
        and keep GIFs one click away!
      </div>
    ),
    showOnMobile: true,
    environmentFilter: "normal",
  });

  upsellInfo.push({
    element: (
      <div>
        Check out our new site - search for GIFs at{" "}
        <a href={Consts.WEBSITE_URL}>popcorngifsearch.com</a>
      </div>
    ),
    showOnMobile: true,
    environmentFilter: "extension",
  });

  upsellInfo.push({
    element: (
      <>
        <a href={Consts.FACEBOOK_PAGE_URL} target="_blank">
          Like our Facebook page
        </a>{" "}
        and share with your friends!
      </>
    ),
    showOnMobile: true,
  });

  return upsellInfo.filter(shouldShowUpsell).map((upsell) => upsell.element);
}

export default function Upsells({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <>
      <style jsx={true}>{`
        .carousel {
          width: ${width}px;
          height: ${height}px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
      <div className="carousel">
        <Carousel width={400} children={getUpsells()} />
      </div>
    </>
  );
}
