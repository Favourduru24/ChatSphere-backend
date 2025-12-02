
const SignIn = () => {

  return (
    <section className="w-full flex justify-center items-center h-screen">
         <div className="w-full max-w-xl flex flex-col gap-6 py-6 bg-white border border-[#f9fbfc] rounded-xl shadow-100 p-2 justify-center">
                           <div>

                           </div>
              <form className="flex flex-col gap-4">
                 <div className="w-full flex flex-col gap-2.5 px-6 relative">
                     <label className="text-sm font-normal text-gray-400">Name</label>
               <input className="p-3 ring-2 ring-[#f9fbfc] rounded-md placeholder:text-gray-300" type="name" id="name" placeholder="Username"/>
                 </div>

                 <div className="w-full flex flex-col gap-2.5 px-6 relative">
                     <label className="text-sm font-normal text-gray-400">Email</label>
               <input className="p-3 ring-2 ring-[#f9fbfc] rounded-md placeholder:text-gray-300" type="email" id="email" placeholder="email@gmail.com"/>
                 </div>

                 <div className="w-full flex flex-col gap-2.5 px-6 relative">
                     <label className="text-sm font-normal text-gray-400">Password</label>
               <input className="p-3 ring-2 ring-[#f9fbfc] rounded-md placeholder:text-gray-300" type="password" id="password" placeholder="pa**word"/>
                 </div>

                  <div className="w-full flex flex-col gap-2.5 px-6 relative">
                      <button className="w-full bg-purple-600 rounded-md">
                        <p className="text-white font-semibold text-xl p-2 ">Sign In</p>
                      </button>
                 </div>
              </form>
         </div>
    </section>
  )
  
}

export default SignIn