import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import SidebarDesktop from "./sidebar-desktop"

const SideBar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <SidebarDesktop session={session}/>
  )
}

export default SideBar