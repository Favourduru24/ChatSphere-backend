import Header from "./header"
import {Sparkle, Calendar, Menu, Plus, Search, Phone, Mic, Image, Link2, Send} from "lucide-react"

const Chat = () => {

   const navLink = [
    {
      icon: Calendar
    },
    {
      icon: Sparkle
    },
   ]

   const chatData = [
          {name: 'Favour Duru', text: 'I have sent you the link', time: '9:53', color: 'bg-red-500', },
          {name: 'Duru Pristine', text: 'How should i start', time: '7:53', color: 'bg-purple-500'},
          {name: 'Kelvin Kart', text: 'I have been working', time: '9:53', color: 'bg-green-500'},
          {name: 'Kelvin Port', text: 'How did you start', time: '10:53', color: 'bg-pink-500'},
          {name: 'Favour Duru', text: 'I have sent you the link', time: '1:53', color: 'bg-black'},
          // {name: 'Duru Pristine', text: 'How should i start', time: '12:53', color: 'bg-orange-500'},
          // {name: 'Kelvin Kart', text: 'I have been working', time: '12:53', color: 'bg-yellow-500'},
          // {name: 'Kelvin Port', text: 'How did you start', time: '12:53', color: 'bg-red-500'},
          // {name: 'Duru Pristine', text: 'How should i start', time: '12:53', color: 'bg-orange-500'},
   ]

   const chatMessage = [
    // {name: 'Favour Duru', text: 'Lorem ipsum dolor, sit amet consectetur.', time: '9:53', color: 'bg-red-500'},
          // {name: 'Kelvin Kart', text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis tempore eius, ab nulla officia minima!', time: '9:53', color: 'bg-green-500'},
          {name: 'Kelvin Kart', text: 'Lorem ipsum dolor, sit amet consectetur ', time: '9:53', color: 'bg-green-500', image: '/image/card2.webp'},
   ]

  return (
    <div className="flex flex-col h-full">
     <Header />
      <div className="flex h-full">
         {/* First cols */}
         <div className="max-w-[70px] w-full flex flex-col p-2 items-center bg-[#F9FBFC] border rounded-l-md">
            <div className="w-8 h-8 rounded-md bg-purple-400 flex items-center justify-center whitespace-nowrap shrink-0">
               <p className="font-semibold text-white">C</p>
            </div>
            <div className="gap-6 flex flex-col justify-between h-full mt-10 items-center">
               <div className="flex flex-col gap-4 ">
                       {navLink.map((nav) => (
                       <div className="bg-white p-2 rounded-full shadow-sm cursor-pointer">
                         <nav.icon className="text-[#495568] size-6 font-bold"/>
                       </div>
                ))}
               </div>

               <div className="flex flex-col gap-4 justify-center items-center">
                       {navLink.map((nav) => (
                       <div >
                         <nav.icon className="text-[#495568] size-6"/>
                       </div>
                ))}
                  <div className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center">
            </div>
               </div>
                
            </div>
         </div>
         {/*Second cols */}
         <div className="max-w-[340px] border w-full flex-col">
           <div className="p-2 h-16 border flex items-center bg-[#F9FBFC]">
               <div className="flex justify-between gap- items-center w-full">
                  <p className="text-xl font-semibold">chatSphere</p>
                  <Menu className="text-[#495568] size-5 mt-1 font-semibold"/>
               </div>
           </div>

             <div className="flex flex-col bg-[#F9FBFC] h-ful">
                <div className="p-4 h-14 flex items-center">
                   <div className="flex justify-between gap- items-center w-full">
                  <p className="text-lg font-semibold text-[#8B92A1]">Chats <span className="bg-pink-100 py-0.5 px-1.5 w-fit rounded-[20px] text-dark-100 text-sm font-semibold text-pink-400">23</span></p>
                  <Plus className="text-[#495568] size-7 mt-1 font-semibold cursor-pointer"/>
               </div>
                </div>
                
               {chatData.map((chat, index) => (
                 <div className="p- h-20 flex items-center bg-[#F9FBFC]  cursor-pointer hover:bg-[#8E8AD8]" key={index}>
                <div className=" bg-[#F9FBFC] w-[99%] h-full p-4 hover:bg-[#EDF2FE]">
                   <div className="flex items-start justify-between w-full">

                 <div className="flex gap-4 items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center whitespace-nowrap shrink-0 ${chat.color}`}>
                  </div>

                  <div className="flex flex-col">
                        <p className="text-lg font-semibold text-black font-sans">{chat.name}</p>
                        <p className="text-sm font-medium text-[#8B92A1]">{chat.text}</p>
                  </div>

                 </div>
                 

                <p className="text-xs font-semibold text-[#CCCFD9]">{chat.time}</p>
               </div>
                </div>
              </div>
               ))}
             </div>

             
         </div>

         {/*Third cols */}
         <div className="w-full border flex flex-col rounded-r-md">
          
            <div className="p-10 h-20 border flex items-center rounded-r-md">
               <div className="flex justify-between gap- items-center w-full">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center whitespace-nowrap shrink-0">
                  </div>

                  <div className="flex flex-col">
                        <p className="text-lg font-semibold text-black font-sans">Duru Pristine</p>
                        <p className="text-sm font-semibold text-[#8B92A1]">187 People - 187 Chats Total</p>
                  </div>

                 </div>
                   <div className="flex items-center gap-3">
                       <div className="bg-[#EDFFF2] py-0.5 px-2.5 w-fit rounded-[20px] text-dark-100 text-sm font-semibold border border-green-300">
                            <p className="text-green-400">
                                Active</p>
                      </div>
                      <span>
                       <Search className="text-[#495568] size-6 cursor-pointer"/>
                      </span>
                      <span>
                      <Phone className="text-[#495568] size-6 cursor-pointer"/>
                      </span>
                         <div className="bg-purple-600 p-2 w-fit rounded-full text-dark-100 ">
                            <Plus className="text-[#495568] size-6 font-semibold cursor-pointer text-white"/>
                         </div>
                   </div>
               </div>
           </div>
             
             <div className="p-10 h-full">
               <div className="h-full flex flex-col gap-5">
               {chatMessage.map((chat, index) => (
                <div className="flex gap-3" key={index}>
                    <div className={`w-12 h-12 rounded-full ${chat.color} flex items-center justify-center whitespace-nowrap shrink-0`}>
                  </div>

                  <div className="flex flex-col gap-1">
                        <p className="text-lg font-semibold text-black font-sans">{chat.name} <span className="text-sm font-medium text-[#8B92A1]">{chat.time}Am</span></p>
                        
                        <div className="p-2 break-all bg-[#F9FBFC] my-2 max-w-md w-full rounded-lg">
                         <p className="font-medium text-[#8B92A1]">{chat.text}</p>
                        </div>

                        <div>
                          {chat.image && (
                            <img src={chat.image} className="rounded-md border-[3px] border-gray-200"/>
                          )}
                        </div>
                  </div>

                 </div>
               ))}
               </div>
             </div>
             {/* The End */}

             <div className="p-10 h-20 border flex items-center rounded-r-md">
               <div className="flex justify-between items-center w-full">
                  <form className="max-w-[700px] w-full border-2 border-gray-300 rounded-full flex items-center p-1">
                 <input type="text" className="w-full  p-2" placeholder="Type Message here..."/>
                   <div className="flex p-2 gap-2">
                    <Mic className="text-[#495568] size-6 font-bold cursor-pointer"/>
                    <Image className="text-[#495568] size-6 font-bold cursor-pointer"/>
                    <Link2 className="text-[#495568] size-6 font-bold rotate-90 cursor-pointer"/>
                   </div>
                  </form>
                  <div className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center">
                    <Send className="text-[#495568] size-6 cursor-pointer text-white"/>
                    </div>
                   <div>
                   </div>
               </div>
           </div>
         </div>

      </div>
    </div>
  )
}

export default Chat