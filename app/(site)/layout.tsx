import { SanityLive } from "@/sanity/lib/live";
export default function PublicSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <SanityLive />
    </>
  );
}
