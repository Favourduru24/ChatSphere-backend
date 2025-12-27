import {navLink1, navLink2 } from '@/constants'
import { useLocation } from 'react-router-dom'

const MiniSidebar = () => {

   const path = useLocation()

  return (
     <div className="max-w-[70px] w-full flex flex-col p-2 items-center bg-[#F8FAFC] border rounded-l-md max-sm:hidden">
      <div className="w-8 h-8 rounded-md bg-purple-400 flex items-center justify-center">
        <p className="font-semibold text-white">C</p>
      </div>

      <div className="flex flex-col justify-between mt-5 items-center m-1 flex-1 min-h-0">
        <div className="flex flex-col gap-4">
          {navLink1.map((nav, index) => (
            <div className={`${path.pathname.startsWith(nav.href) ? "bg-slate-200" : "bg-transparent"} p-2 rounded-md cursor-pointer hover:bg-slate-100`} key={index}>
              <nav.icon className="text-[#495568] size-5 font-bold" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 items-center">
          {navLink2.map((nav, index) => (
            <div className="p-2 rounded-md cursor-pointer hover:bg-slate-100" key={index}>
              <nav.icon className="text-[#495568] size-5" />
            </div>
          ))}
          <div className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center"></div>
        </div>
      </div>
    </div> 
  )
}

export default MiniSidebar