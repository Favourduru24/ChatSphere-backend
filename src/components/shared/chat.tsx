import { chatData, chatMessage, navLink } from "@/constants"
import Header from "./header"
import {Plus, Search, Phone, Mic, Image, Link2, Send, PenBox, User2, User2Icon, Users2Icon, Users, ArrowLeft} from "lucide-react"
import { useEffect, useRef, useState} from "react"

const Chat = () => {

   const [open, setOpen] = useState(false)
   const [isGroupOpen, setIsGroupOpen] = useState(false)
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

     
   const toggleOpen = () => setOpen((p) => !p);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
  {/* HEADER */}
  <Header />
  {/* MAIN LAYOUT */}
  <div className="flex flex-1 min-h-0">
    {/* LEFT SIDEBAR */}
    <div className="max-w-[70px] w-full flex flex-col p-2 items-center bg-[#F8FAFC] border rounded-l-md max-sm:hidden ">
      <div className="w-8 h-8 rounded-md bg-purple-400 flex items-center justify-center">
        <p className="font-semibold text-white">C</p>
      </div>

      <div className="flex flex-col justify-between mt-5 items-center m-1 flex-1 min-h-0">
        <div className="flex flex-col gap-4">
          {navLink.map((nav) => (
            <div className="bg-white p-2 rounded-full shadow-sm cursor-pointer">
              <nav.icon className="text-[#495568] size-6 font-bold" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 items-center">
          {navLink.map((nav) => (
            <div className="bg-white p-2 rounded-full shadow-sm cursor-pointer">
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
      <div className="px-4 py-3 border-b flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">chatSphere</p>
                    <p className="text-sm text-slate-400">Recent conversations</p>
                  </div>
                  <PenBox className="size-5 text-slate-600 cursor-pointer" onClick={toggleOpen}/>
                </div>

      {/* Chat List Header */}
      <div className="p-4 h-14 flex items-center w-full">
         <div className="py-3 border-b flex items-center justify-between w-full">
            <div className="text-sm text-slate-500">
              <span className="font-medium text-slate-700">23</span> people
            </div>
            <div className="text-sm text-slate-400">Sort: Recent</div>
          </div>

         {open && (
  <div
    aria-modal="true"
    className="absolute  top-20 left-[50%] max-w-[350px] w-full bg-white border rounded-lg shadow-lg flex flex-col h-[85%] min-h-0 z-20"
    ref={chatModalRef}
  >
    {/* GROUP MODAL */}
    {isGroupOpen && (
      <div className="absolute inset-0 bg-white flex flex-col min-h-0">
        
        {/* Header */}
         <div className="px-3 py-3 border-b flex items-center gap-3">
          <button onClick={() => setIsGroupOpen(false)} className="p-2 rounded-md hover:bg-slate-100">
            <ArrowLeft className="size-5" />
            </button>
          <h3 className="text-lg font-semibold">New group</h3>
           </div>

        {/* Search */}
        <div className="px-4 pt-3">
                      <form className="border-b border-[#E6E6FA] mb-3">
                        <input className="w-full h-9 outline-none px-2" placeholder="Search name or email" />
                      </form>
                      <p className="text-sm text-slate-500 mb-2">All contacts</p>
                    </div>

        {/* SCROLLABLE CONTACT LIST */}
        <div className="flex-1 min-h-0 overflow-y-auto chat-scroll">
          <div className="flex flex-col">
            {chatData.map((chat, index) => (
              <div key={index} className="h-16 flex items-center cursor-pointer hover:bg-[#EDF2FE]">
                <div className="w-full p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full ${chat.color} flex items-center justify-center`}/>
                      <div>
                        <p className="text-sm font-semibold truncate">{chat.name}</p>
                        <p className="text-xs text-[#8B92A1]">{chat.text}</p>
                      </div>
                    </div>
                    <input type="checkbox" className="size-3 accent-[#8E8AD8] cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3 border-t">
                      <button className="w-full py-2 bg-purple-600 text-white rounded-md font-semibold cursor-pointer">Create Group</button>
                    </div>
                  </div>
      // </div>
    )}

    {/* MAIN CHAT SCREEN */}
    <div className="flex flex-col min-h-0 h-full">

      {/* Header */}
     <div className="px-4 py-3 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">New Chat</h2>
        <div className="flex items-center gap-2">
         <button className="p-2 rounded-md hover:bg-slate-100" onClick={() => setIsGroupOpen(true)} title="Create group">
           <Users2Icon className="size-5" />
                             </button>
         <button className="p-2 rounded-md hover:bg-slate-100" title="Add">
                               <Plus className="size-5" />
                             </button>
       </div>
      </div>

      {/* Search */}
      <div className="px-4 pt-3 pb-2">
                      <form className="border-b border-[#E6E6FA]">
                        <input className="w-full h-9 px-2 outline-none" placeholder="Search name or email" />
                      </form>
                    </div>

      {/* Options */}
       

      {/* MAIN SCROLL AREA */}
      <div className="flex-1 min-h-0 overflow-y-auto chat-scroll">
        <div className="flex flex-col">
          {chatData.map((chat, index) => (
            <div key={index} className="h-16 flex items-center cursor-pointer hover:bg-[#EDF2FE]">
              <div className="w-full p-4">
                <div className="flex justify-between">
                  <div className="flex gap-4 items-center">
                    <div className={`w-10 h-10 rounded-full ${chat.color}`}></div>
                    <div>
                      <p className="text-sm font-semibold">{chat.name}</p>
                      <p className="text-xs text-[#8B92A1]">{chat.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
)}

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
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full ${chat.color} flex items-center justify-center`}></div>

                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold truncate">{chat.name}</p>
                      <p className="text-xs text-[#8B92A1]">{chat.text}</p>
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
              <p className="text-sm font-semibold mb-px">Duru Pristine</p>
              <p className="text-xs text-[#8B92A1]">
                187 People - 187 Chats Total
              </p>
              <p className="text-xs text-green-400 animate-pulse">Typing...</p>
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
                <p className="text-sm font-semibold">
                  {chat.name}{" "}
                  <span className="text-xs ml-2 text-[#8B92A1]">{chat.time}Am</span>
                </p>

                <div className="bg-[#F9FBFC] p-2 rounded-lg max-w-md">
                  <p className="text-[#8B92A1] text-sm leading-6">{chat.text}</p>
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
          <form className="flex-1 flex items-center gap-3 border rounded-full">
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

          <button className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white shadow">
            <Send className="size-5" />
               </button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Chat