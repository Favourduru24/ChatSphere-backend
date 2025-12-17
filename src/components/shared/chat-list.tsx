import { useAuth } from "@/hooks/use-auth";
import { getOtherUserAndGroup } from "@/lib/utils";
import type { ChatType } from "@/types/chat.type"
import { useLocation } from "react-router-dom"

 interface PropsType {
   chat: ChatType;
   onClick?: () => void,
   currentUserId: string | null
 }

const ChatList = ({chat, onClick, currentUserId}: PropsType) => {

    const {pathname} = useLocation()


    const {lastMessage, createdAt, createdBy} = chat || {}

    const {name, avatar, isOnline, isGroup} = getOtherUserAndGroup(chat, currentUserId)

const getLastMessage = () =>  {
     if(!lastMessage) {
         return isGroup 
         ? createdBy === currentUserId 
         ? "Group created" : 'You were added' : "Send a message"
     }

     if(lastMessage.image) return "Photo"
     if(isGroup && lastMessage.sender) {
       return `${lastMessage.sender.id === currentUserId ? 'You' : lastMessage.sender.name} : ${lastMessage.content} `
     }

     return lastMessage.content
}


  return (
    <div
              className="h-20 flex items-center cursor-pointer hover:bg-[#EDF2FE]"
            onClick={onClick}>
              <div className="w-full p-4">
                <div className="flex justify-between">
                  <div className="flex gap-4 items-center">
                    <div className={`shrink-0 w-12 h-12 rounded-full ${`bg-amber-100`} flex items-center justify-center`}>

                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold truncate">{name}</p>
                      <p className="text-xs text-[#8B92A1]">{getLastMessage()}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#CCCFD9]">{createdAt}</p>
                </div>
              </div>
            </div>
  )
}

export default ChatList