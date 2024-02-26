import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "seeksolution/utils/constant";
const AdsListing = dynamic(() => import("seeksolution/components/ads/AdsListing"), { ssr: false })
const AdsPage = () => {

  const cookieStore = cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value || ""

  return (
    <AdsListing accessToken={accessToken} />
  );
}
export default AdsPage