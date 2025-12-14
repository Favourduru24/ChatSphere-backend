import { Link } from "react-router-dom"
import { z } from "zod"
import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import type { RegisterType } from "@/types/auth.type"
import { Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const { register, isSigningUp } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const formSchema = z.object({
    name: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters").max(17, "Password must be less than 17 characters"),
    avatar: z.string()
  })

  const handleSignUp = async () => {
  const result = formSchema.safeParse({ email, password, name, avatar });

  if (!result.success) {
    const errorMessages = result.error.issues
      .map(issue => issue.message)
      .join(", ");
     toast.error(errorMessages);
    return;
  }

  const data: RegisterType = result.data;

  const success = await register(data);

  if (success) {
    navigate("/");
    toast.success("Account created!");
  }
    };
  return (
    <section className="w-full flex lg:flex-row items-center justify-center h-screen gap-5 px-5 ">
      {/* Form Container */}
      <div className="w-full max-w-lg flex flex-col gap-6 py-6 bg-white border border-[#ebeeed] rounded-xl shadow-sm p-2 justify-center">
        {/* Logo & Title */}
        <div className="w-full flex flex-col gap-3">
          <div className="flex gap-2 justify-center items-center">
            <div className="w-8 h-8 rounded-md bg-purple-400 flex items-center justify-center">
              <p className="font-semibold text-white">C</p>
            </div>
            <p className="text-xl font-semibold">chatSphere</p>
          </div>
          <p className="text-2xl font-semibold text-center font-sans text-gray-400 underline">
            Create your account
          </p>
        </div>

        {/* Form */}
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            handleSignUp()
          }}
        >
          {/* Username */}
          <div className="w-full flex flex-col gap-2.5 px-6 relative">
            <label className="text-sm font-normal text-gray-400">Username</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="name"
              id="name"
              placeholder="Username"
              className="p-3 ring-2 ring-[#f9fbfc] rounded-md placeholder:text-gray-400 font-sans font-normal outline-purple-600"
            />
          </div>

          {/* Email */}
          <div className="w-full flex flex-col gap-2.5 px-6 relative">
            <label className="text-sm font-normal text-gray-400">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="email@gmail.com"
              className="p-3 ring-2 ring-[#f9fbfc] rounded-md placeholder:text-gray-400 font-sans font-normal outline-purple-600"
            />
          </div>

          {/* Password */}
          <div className="w-full flex flex-col gap-2.5 px-6 relative">
            <label className="text-sm font-normal text-gray-400">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="pa**word"
              className="p-3 ring-2 ring-[#f9fbfc] rounded-md placeholder:text-gray-400 font-sans font-normal outline-purple-600"
            />
          </div>

          {/* Submit Button */}
          <div className="w-full flex flex-col gap-2.5 px-6 relative mt-4">
            <button
              type="submit"
              disabled={isSigningUp}
              className={`w-full rounded-md h-12 flex justify-center items-center  ${
                isSigningUp
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-800 hover:bg-purple-700 focus:bg-purple-500 cursor-pointer"
              } text-white font-semibold text-xl`}
            >
              {isSigningUp ? (
                <div className="flex gap-2 items-center">
                  <Loader2 className="animate-spin size-5" />
                  <span className="text-[1rem]">Loading...</span>
                </div>
              ) : (
                 <span className="text-[1.2rem]">Sign Up</span>
              )}
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <p className="text-sm font-medium text-end mx-6">
          Already have an account?{" "}
          <Link to="/">
            <span className="text-purple-600 cursor-pointer">Sign In</span>
          </Link>
        </p>
      </div>

      {/* Image Section */}
      <div className="w-full h-full bg-purple-50 hidde lg:block px-10 pt-28 flex items-center justify-center">
        <img
          src="/image/sign-in.svg"
          alt="Authentication Illustration"
          className=" object-contain w-full h-[70vh]"
        />
      </div>
    </section>
  )
}

export default SignUp
