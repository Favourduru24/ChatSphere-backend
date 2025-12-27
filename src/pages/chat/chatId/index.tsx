import ChatBody from "@/components/shared/chat-body"
import ChatFooter from "@/components/shared/chat-footer"
import EmptyState from "@/components/shared/empty-state"
import {chatMessage} from "@/constants"
import { useAuth } from "@/hooks/use-auth"
import { useChat } from "@/hooks/use-chat"
import useChatId from "@/hooks/use-chat-id"
import { useSocket } from "@/hooks/use-socket"
import { getOtherUserAndGroup } from "@/lib/utils"
import type { MessageType } from "@/types/chat.type"
import {Plus, Search, Phone, Mic, Image, Link2, Send, Loader2} from "lucide-react"
import { useEffect, useState } from "react"

const SingleChat = () => {
   
  const chatId = useChatId()
  const {fetchSingleChat, isSingleChatLoading, singleChat} = useChat()
  const {socket} = useSocket()
  const {user} = useAuth()

  const [replyTo, setReplyTo] = useState<MessageType | null>(null)

  const currentUser = user?._id || null
  const chat = singleChat?.chat
  const messages = singleChat?.messages || []

  const {name, subheading, avatar, isOnline, isGroup} = getOtherUserAndGroup(chat, currentUser)


  useEffect(() => {
     if(!chatId) return

      fetchSingleChat(chatId)
  }, [fetchSingleChat, chatId])
   
  useEffect(() => {
       if(!chatId && !socket) return

       socket?.emit('chat:join', chatId)

       return () => {
         socket?.emit('chat:leave', chatId)
       }
  }, [chatId, socket])

   if(isSingleChatLoading) {
    return (
      <div className="inset- h-full flex items-center justify-center">
       <Loader2 className="size-14 text-gray-400 animate-spin"/>
      </div>
    )
   }

  //  if(!chat) {
  //   return (
  //     <div className="inset- h-full flex items-center justify-center">
  //       <p className="text-lg text-gray-500">Chat not found!</p>
  //     </div>
  //   )
  //  }

  //  console.log('Chat-id', chatId)
  //  console.log('Chat-message', messages)
  //  console.log('Chat', chat)
   console.log('isOnline', isOnline)
   console.log('singleChat', chat)
    
  return (
    <div className="flex flex-col h-full min-h-0">
  <div className="flex flex-1 min-h-0">
    {/* RIGHT CHAT VIEW */}
    <div className="w-full border-t border-b border-r flex flex-col rounded-r-md flex-1 min-h-0">
      {/* Chat Header */}
      <div className="p-10 h-20 border flex items-center rounded-tr-md">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-400"></div>

            <div className="hidden sm:flex flex-col">
              <p className="text-sm font-semibold mb-px">{name}</p>
              <p className="text-xs text-[#8B92A1]">
               {subheading || '187 People - 187 Chats Total'} 
              </p>
              <p className="text-xs text-green-400 animate-pulse">Typing...</p>
            </div>

            <p className="text-xs text-[#8B92A1] sm:hidden">
              187 People
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className={` py-0.5 px-2.5 rounded-[20px] border ${isOnline ? 'border-green-300 bg-[#EDFFF2]' : 'border-muted-foreground bg-gray-50'} hidden sm:block`}>
              <p className={`${isOnline ? 'text-green-400' : 'text-muted-foreground'} `}>{subheading}</p>
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
       <ChatBody chatMessage={messages} chatId={chatId} onReply={setReplyTo}/>

      {/* INPUT BAR */}
      <ChatFooter 
       replyTo={replyTo}
       chatId={chatId}
       currentUserId={currentUser}
       onCancelReply={() => setReplyTo(null)}
      />
    </div>
  </div>
</div>
  )
}

export default SingleChat