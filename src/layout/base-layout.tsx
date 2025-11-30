import { Outlet } from "react-router-dom"

const BaseLayout = () => {
  return (
    <div className="">
       <Outlet />
    </div>
  )
}

export default BaseLayout