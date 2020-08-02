import useEnvironment, { Environment } from "../utils/useEnvironment";
import useDeviceDetect from "../utils/useDeviceDetect";
import Consts from "../utils/consts";
import { useState, useEffect } from "react";
import ExternalLink from "./externalLink";

const intervalMs = 8000;

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
        Check out{" "}
        <ExternalLink href={Consts.WEBSITE_URL}>
          the Popcorn GIF site
        </ExternalLink>{" "}
        on your phone, built to be a great mobile experience
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
        <ExternalLink href={Consts.EXTENSION_URL}>
          Chrome extension
        </ExternalLink>{" "}
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
        <ExternalLink href={Consts.WEBSITE_URL}>
          popcorngifsearch.com
        </ExternalLink>
      </div>
    ),
    showOnMobile: true,
    environmentFilter: "extension",
  });

  upsellInfo.push({
    element: (
      <>
        <ExternalLink href={Consts.FACEBOOK_PAGE_URL}>
          Like our Facebook page
        </ExternalLink>{" "}
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
  const upsells = getUpsells();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let i = Math.floor(Math.random() * upsells.length);
    const intervalId = setInterval(() => {
      const numChildren = upsells.length;
      i = numChildren === 0 ? 0 : (i + 1) % numChildren;
      setIndex(i);
    }, intervalMs);
    return () => clearInterval(intervalId);
  });

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

        .container {
          width: ${width}px;
          overflow: hidden;
        }

        .spanner {
          display: flex;
          flex-direction: row;
          width: ${width * upsells.length}px;
          transform: translate(${-1 * width * index}px, 0px);
          transition: ease-in-out, 0.35s ease-in-out;
        }

        .upsell_card {
          text-align: center;
          width: ${width}px;
          color: #666666;
        }
      `}</style>
      <div className="carousel">
        <div className="container">
          <div className="spanner">
            {upsells.map((upsell, i) => {
              return (
                <div key={"upsell_" + i} className="upsell_card">
                  {upsell}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
