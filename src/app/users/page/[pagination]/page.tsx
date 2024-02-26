import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "seeksolution/utils/constant";
const UsersListing = dynamic(() => import("seeksolution/components/users/UsersListing"), { ssr: false })
const USersPage = () => {

  const cookieStore = cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value || ""

  return (
    <UsersListing accessToken={accessToken} />
  );
}
export default USersPage