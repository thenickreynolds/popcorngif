import { InlineShareButtons } from "sharethis-reactjs";

export default function ShareButtons() {
  return (
    <InlineShareButtons
      config={{
        alignment: "left",
        color: "social",
        enabled: true,
        font_size: 16,
        labels: null,
        language: "en",
        networks: ["facebook", "twitter", "reddit", "sharethis"],
        padding: 12,
        radius: 4,
        show_total: false,
        size: 25,
        url: "https://popcorngifsearch.com",
      }}
    />
  );
}
