import {chatMessage} from "@/constants"
import Header from "./header"
import {Plus, Search, Phone, Mic, Image, Link2, Send} from "lucide-react"
import SideBarWrapper from "./sidebar-wrapper"
import MiniSidebar from "./mini-sidebar"

const Chat = () => {

    
  return (
    <div className="h-screen flex flex-col overflow-hidden">

   {/* HEADER */}
   <Header/>
  {/* MAIN LAYOUT */}
  <div className="flex flex-1 min-h-0">

  {/* LEFT SIDEBAR */}
  <MiniSidebar/>


  {/* MIDDLE CHAT LIST */}
  <SideBarWrapper/>

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