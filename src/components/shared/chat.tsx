import { chatData, chatMessage, navLink } from "@/constants"
import Header from "./header"
import {Plus, Search, Phone, Mic, Image, Link2, Send, PenBox} from "lucide-react"
import { useEffect, useRef, useState} from "react"

const Chat = () => {

   const [open, setOpen] = useState(false)
   const chatModalRef = useRef(null)

    useEffect(() => {
    const handleClickOutside = (e) => {
      if (chatModalRef.current && !chatModalRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])


   const handleToggle = () => {
     if(chatModalRef.current){
       setOpen(false)
     } else{
       setOpen(true)
     }
   } 

  return (
    <div className="h-screen flex flex-col overflow-hidden">
  {/* HEADER */}
  <Header />
  {/* MAIN LAYOUT */}
  <div className="flex flex-1 min-h-0">
    {/* LEFT SIDEBAR */}
    <div className="max-w-[70px] w-full flex flex-col p-2 items-center bg-[#F9FBFC] border rounded-l-md max-sm:hidden ">
      <div className="w-8 h-8 rounded-md bg-purple-400 flex items-center justify-center">
        <p className="font-semibold text-white">C</p>
      </div>

      <div className="flex flex-col justify-between mt-5 items-center m-1 flex-1 min-h-0">
        <div className="flex flex-col gap-4">
          {navLink.map((nav) => (
            <div className="hover:bg-white p-2 rounded-full shadow-sm cursor-pointer">
              <nav.icon className="text-[#495568] size-6 font-bold" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 items-center">
          {navLink.map((nav) => (
            <div className="hover:bg-white p-2 rounded-full shadow-sm cursor-pointer">
              <nav.icon className="text-[#495568] size-6" />
            </div>
          ))}
          <div className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center"></div>
        </div>
      </div>
    </div>

    {/* MIDDLE CHAT LIST */}
    <div className="max-w-[350px] w-full flex flex-col bg-[#F9FBFC] border hidden lg:flex relative">
      {/* Title */}
      <div className="p-2 h-16 border flex items-center">
        <div className="flex justify-between items-center w-full">
          <p className="text-xl font-semibold">chatSphere</p>
          <PenBox className="text-[#495568] size-5 cursor-pointer" onClick={() => setOpen(!open)}/>
        </div>
      </div>

      {/* Chat List Header */}
      <div className="p-4 h-14 flex items-center">
        <div className="flex justify-between items-center w-full">
          <p className="text-lg font-semibold text-[#8B92A1]">
            Chats{" "}
            <span className="bg-pink-100 py-0.5 px-1.5 rounded-[20px] text-pink-400 text-sm font-semibold">
              23
            </span>
          </p>
          <Plus className="text-[#495568] size-7 cursor-pointer" />
        </div>

         {open ? (
            <div className="absolute left-[50%] top-20 max-w-[350px] w-full bg-[#F9FBFC] border flex flex-col z-10 rounded-t-lg min-h-0 h-[80vh]" ref={chatModalRef}>
                <div className="px-11">
                <input type="text" className="w-full h-8 m"/>
                  
                </div>
             <div className="flex-1 min-h-0 overflow-y-auto chat-scroll">
        <div className="flex flex-col ">
          {chatData.map((chat, index) => (
            <div
              key={index}
              className="h-20 flex items-center cursor-pointer hover:bg-[#EDF2FE]"
            >
              <div className="w-full p-4">
                <div className="flex justify-between">
                  <div className="flex gap-4 items-center">
                    <div className={`w-10 h-10 rounded-full ${chat.color}`}></div>

                    <div>
                      <p className="text-lg font-semibold">{chat.name}</p>
                      <p className="text-sm text-[#8B92A1]">{chat.text}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
            </div>
         ): ''}
      </div>

      {/* Scrollable Chat List */}
      <div className="flex-1 min-h-0 overflow-y-auto chat-scroll">
        <div className="flex flex-col ">
          {chatData.map((chat, index) => (
            <div
              key={index}
              className="h-20 flex items-center cursor-pointer hover:bg-[#EDF2FE]"
            >
              <div className="w-full p-4">
                <div className="flex justify-between">
                  <div className="flex gap-4 items-center">
                    <div className={`w-10 h-10 rounded-full ${chat.color}`}></div>

                    <div>
                      <p className="text-lg font-semibold">{chat.name}</p>
                      <p className="text-sm text-[#8B92A1]">{chat.text}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#CCCFD9]">{chat.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* RIGHT CHAT VIEW */}
    <div className="w-full border flex flex-col rounded-r-md flex-1 min-h-0">
      {/* Chat Header */}
      <div className="p-10 h-20 border flex items-center rounded-tr-md">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-400"></div>

            <div className="hidden sm:flex flex-col">
              <p className="text-lg font-semibold">Duru Pristine</p>
              <p className="text-sm text-[#8B92A1]">
                187 People - 187 Chats Total
              </p>
            </div>

            <p className="text-xs text-[#8B92A1] sm:hidden">
              187 People
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#EDFFF2] py-0.5 px-2.5 rounded-[20px] border border-green-300 hidden sm:block">
              <p className="text-green-400">Active</p>
            </div>
            <Search className="text-[#495568] size-6 cursor-pointer" />
            <Phone className="text-[#495568] size-6 cursor-pointer" />
            <div className="bg-purple-600 p-2 rounded-full">
              <Plus className="size-6 text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* SCROLLABLE MESSAGES */}
      <div className="px-10 max-sm:px-5 pt-5 flex-1 min-h-0 overflow-y-auto chat-scroll">
        <div className="flex flex-col gap-5">
          {chatMessage.map((chat, index) => (
            <div key={index} className="flex gap-3">
              <div className={`w-12 h-12 rounded-full ${chat.color}`}></div>

              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">
                  {chat.name}{" "}
                  <span className="text-sm text-[#8B92A1]">{chat.time}Am</span>
                </p>

                <div className="bg-[#F9FBFC] p-2 rounded-lg max-w-md">
                  <p className="text-[#8B92A1]">{chat.text}</p>
                </div>

                {chat.image && (
                  <img
                    src={chat.image}
                    className="rounded-md border-[3px] border-gray-200"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INPUT BAR */}
      <div className="sm:h-20 h-16 flex items-center sticky bottom-0 bg-white sm:p-8 p-5">
        <div className="flex items-center w-full gap-2">
          <form className="max-w-[740px] w-full border-2 border-gray-300 rounded-full flex items-center">
            <input
              type="text"
              placeholder="Type Message here..."
              className="w-full rounded-full p-2 outline-none text-gray-500"
            />

            <div className="flex gap-2 p-2">
              <Mic className="text-[#495568] size-6 cursor-pointer" />
              <Image className="text-[#495568] size-6 cursor-pointer" />
              <Link2 className="text-[#495568] size-6 rotate-90 cursor-pointer" />
            </div>
          </form>

          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
            <Send className="size-6 text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Chat