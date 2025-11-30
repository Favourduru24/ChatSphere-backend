import BaseLayout from "@/layout/base-layout"
import {Route, Routes} from "react-router-dom"
import { authRoutesPaths, protectedRoutesPaths } from "./routes"
import AppLayout from "@/layout/app-layout"
import RouteGuard from "./routes-guard"

const AppRoutes = () => {
  return (
     <Routes>
        <Route path="/" element={<RouteGuard requireAuth={false} />}>
        <Route element={<BaseLayout/>}>
              {authRoutesPaths?.map((route) => (
                 <Route key={route.path} path={route.path}  element={route.element}/>
              ))}
        </Route>
        </Route>

         <Route path="/" element={<RouteGuard requireAuth/>}>
        <Route element={<AppLayout/>}>
              {protectedRoutesPaths?.map((route) => (
                 <Route key={route.path} path={route.path}  element={route.element}/>
              ))}
        </Route>
        </Route>
    </Routes>
  )
}

 export default AppRoutes