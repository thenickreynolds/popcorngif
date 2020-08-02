// fixes a few things, makes sure links open in new tab and prevents perf/security issues
// https://web.dev/external-anchors-use-rel-noopener/?utm_source=lighthouse&utm_medium=devtools

export default function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener">
      {children}
    </a>
  );
}
