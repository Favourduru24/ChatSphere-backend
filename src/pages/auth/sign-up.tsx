import { Link } from "react-router-dom"

const SignUp = () => {

  

  return (
    <section className="w-full flex lg:flex-row items-center justify-center h-screen gap-5 px-5">
            
         <div className="w-full max-w-lg flex flex-col gap-6 py-6  bg-white border border-[#ebeeed] rounded-xl shadow-sm p-2 justify-center ">
                              <div className="w-full flex flex-col gap-3">
                                <div className="flex gap-2 justify-center items-center">
                                  <div className="w-8 h-8 rounded-md bg-purple-400 flex items-center justify-center">
                          <p className="font-semibold text-white">C</p>
                         </div>
                            <p className="text-xl font-semibold">chatSphere</p>
                         </div>

                       <p className="text-2xl font-semibold text-center font-sans text-gray-400 underline">Create your account</p>
                              </div>

              <form className="flex flex-col gap-4">
                 <div className="w-full flex flex-col gap-2.5 px-6 relative">
                     <label className="text-sm font-normal text-gray-400">Name</label>
               <input className="p-3 ring-2 ring-[#f9fbfc] rounded-md placeholder:text-gray-400 font-sans font-normal outline-purple-600" type="name" id="name" placeholder="Username"/>
                 </div>

                 <div className="w-full flex flex-col gap-2.5 px-6 relative">
                     <label className="text-sm font-normal text-gray-400">Email</label>
               <input className="p-3 ring-2 ring-[#f9fbfc] rounded-md placeholder:text-gray-400 font-sans font-normal outline-purple-600" type="email" id="email" placeholder="email@gmail.com"/>
                 </div>

                 <div className="w-full flex flex-col gap-2.5 px-6 relative">
                     <label className="text-sm font-normal text-gray-400">Password</label>
               <input className="p-3 ring-2 ring-[#f9fbfc] rounded-md placeholder:text-gray-400 font-sans font-normal outline-purple-600" type="password" id="password" placeholder="pa**word"/>
                 </div>

                  <div className="w-full flex flex-col gap-2.5 px-6 relative mt-4">
                      <button className="w-full bg-purple-800 hover:bg-purple-700 focus:bg-purple-500 rounded-md cursor-pointer h-12 shadow-sm">
                        <p className="text-white font-semibold text-xl p-2 ">Sign Up</p>
                      </button>
                 </div>
              </form>
                   <p className="text-sm font-medium text-end mx-6">Already have an account <Link to="/"><span className="text-purple-600 cursor-pointer">Sign In</span></Link></p>
         </div>
             <div className="w-full h-full bg-purple-50 hidden lg:block">
               <img src="/image/auth.png" alt="img" className="w-full h-full object-cover"/>
             </div>
    </section>
  )
  
}

export default SignUp