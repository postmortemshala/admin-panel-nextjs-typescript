import dynamic from "next/dynamic";
const AdsListing = dynamic(() => import("seeksolution/components/ads/AdsListing"), { ssr: false })
const AdsPage = () => {
  return (
    <AdsListing />
  );
}
export default AdsPage