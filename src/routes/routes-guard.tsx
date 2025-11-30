import { Outlet } from "react-router-dom"

interface Props {
 requireAuth: boolean
}

const RouteGuard = (requireAuth: Props) => {
    console.log(requireAuth)
  return <Outlet/>
}

export default RouteGuard