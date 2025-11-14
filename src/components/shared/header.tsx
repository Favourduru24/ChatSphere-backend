import React from 'react'
import {LockIcon} from "lucide-react"

const Header = () => {
  return (
    <div className='w-full h-10 p-2 bg-[#FFFFFF] flex justify-center items-center'>
          <div className='mx-2'>
            <LockIcon className='text-[#404B5A] size-4.5 font-semibold'/>
          </div>
        <div className='w-full max-w-[400px] flex'>
            <div className='w-full flex h-6 p-1 bg-[#F9FBFC] border-2 border-gray-300 rounded-md justify-center items-center gap-2'>
               <LockIcon className='text-[#404B5A] size-4 font-semibold'/>
                <p className='text-xs font-semibold text-[#8B92A1]'>Chat Sphere.com</p>
            </div>
        </div>
    </div>
  )
}

export default Header