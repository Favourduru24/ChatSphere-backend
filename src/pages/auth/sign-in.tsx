import { Link } from "react-router-dom"
import {z} from 'zod'
import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"
import {toast} from "sonner"
import type { LoginType } from "@/types/auth.type"
import { Loader2 } from "lucide-react"

const SignIn = () => {

  const {login, isLoggingIn} = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const formSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })

   
  const handleSubmit = () => {
    
  if (isLoggingIn) return  

  const result = formSchema.safeParse({ email, password})

  if (!result.success) {
    toast.error(result.error.message)
    return
  }

    const data: LoginType = result.data
    login(data)
}

  return (
    <section className="w-full flex lg:flex-row items-center justify-center h-screen gap-5 px-5" 
    onSubmit={(e) => {e.preventDefault(), handleSubmit()}}
    >

         <div className="w-full max-w-lg flex flex-col gap-6 py-6 bg-white border border-[#ebeeed] rounded-xl shadow-sm p-2 justify-center">
                              <div className="w-full flex flex-col gap-3">
                                <div className="flex gap-2 justify-center items-center">
                                  <div className="w-8 h-8 rounded-md bg-purple-400 flex items-center justify-center">
                          <p className="font-semibold text-white">C</p>
                         </div>
                            <p className="text-xl font-semibold">chatSphere</p>
                         </div>

                       <p className="text-2xl font-semibold text-center font-sans text-gray-400 underline">Login to your account</p>
                              </div>

              <form className="flex flex-col gap-4">
                 <div className="w-full flex flex-col gap-2.5 px-6 relative">
                     <label className="text-sm font-normal text-gray-400">Email</label>
               <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="email@gmail.com" className="p-3 ring-2 ring-[#f9fbfc] rounded-md placeholder:text-gray-400 font-sans font-normal outline-purple-600"/>
                 </div>

                 <div className="w-full flex flex-col gap-2.5 px-6 relative">
                     <label className="text-sm font-normal text-gray-400 ">Password</label>
               <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="pa**word" className="p-3 ring-2 ring-[#f9fbfc] rounded-md placeholder:text-gray-400 font-sans font-normal outline-purple-600"/>
                 </div>

                  <div className="w-full flex flex-col gap-2.5 px-6 relative mt-4">
                      <button className="w-full bg-purple-800 hover:bg-purple-700 focus:bg-purple-500 rounded-md cursor-pointer h-12">
                        <p className="text-white font-semibold text-xl p-2 ">{isLoggingIn ? <Loader2/> : 'Sign In'}</p>
                      </button>
                 </div>
              </form>
                   <p className="text-sm font-medium text-end mx-6">Dont have an account <Link to="/sign-up"><span className="text-purple-600 cursor-pointer">Sign Up</span></Link></p>
         </div>

         <div className="w-full h-full bg-purple-50 hidden lg:block">
               <img src="/image/auth.png" alt="img" className="w-full h-full object-cover"/>
             </div>
         
    </section>
  )
  
}

export default SignIn