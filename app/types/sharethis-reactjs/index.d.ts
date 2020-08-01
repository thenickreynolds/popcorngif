declare module "sharethis-reactjs" {
  type SharingNetwork =
    | "blogger"
    | "delicious"
    | "digg"
    | "email"
    | "facebook"
    | "flipboard"
    | "google"
    | "linkedin"
    | "livejournal"
    | "mailru"
    | "meneame"
    | "messenger"
    | "oknoklassniki"
    | "pinterest"
    | "print"
    | "reddit"
    | "sharethis"
    | "sms"
    | "stumbleupon"
    | "tumblr"
    | "twitter"
    | "vk"
    | "wechat"
    | "weibo"
    | "whatsapp"
    | "xing";

  type InlineShareButtonsConfig = {
    /** alignment of buttons */
    alignment: "center" | "left" | "right";
    /** set the color of buttons */
    color: "social" | "white";
    /** show/hide buttons */
    enabled: boolean;
    /** font size for the buttons */
    font_size: number;
    /** button labels */
    labels: "cta" | "counts" | null;
    /** which language to use */
    language: string;
    /** which networks to include */
    networks: SharingNetwork[];
    /** padding within buttons */
    padding: number;
    /** the corner radius on each button */
    radius: number;
    show_total: boolean;
    /** the size of each button */
    size: number;

    /** the url to share, defaults to current url */
    url?: string;
    /** the image to share, defaults to og:image or twitter:image */
    image?: string;
    /** the description to share, defaults to og:description or twitter:description */
    description?: string;
    /** the title to share, defaults to og:title or twitter:title */
    title?: string;
    /** the message to include (only for email sharing) */
    message?: string;
    /** the subject to include (only for email sharing) */
    subject?: string;
    /** the username to include (only for email sharing) */
    username?: string;
  };

  function InlineShareButtons({ config }: { config: InlineShareButtonsConfig });
}
