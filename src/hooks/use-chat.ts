import { API } from "@/lib/utils";
import type { UserType } from "@/types/auth.type";
import type { ChatType, CreateChatType, MessageType } from "@/types/chat.type";
import { toast } from "sonner";
import { create } from "zustand";

interface ChatState {
     chats: ChatType[]
     users: UserType[]
     singleChat: {
        chat: ChatType
        messages: MessageType[]
     } | null

      isChatLoading: boolean
      isUsersLoading: boolean
      isCreatingChat: boolean
      isSingleChatLoading: boolean

      fetchAllUser: () => void
      fetchChats: () => void
      createChat: (payload: CreateChatType) => Promise<ChatType | null>
      fetchSingleChat: (chatId: string) => void
      addNewChat: (newChat: ChatType) => void
      updateChatLastMessage: (chatId: string, lastMessage: MessageType) => void ,
      addNewMessage: (chatId: string, message: MessageType) => void
}

 
 export const useChat = create<ChatState>()((set, get) => ({
     chats: [],
     users: [],
     singleChat: null,

     isChatLoading: false,
     isUsersLoading: false,
     isCreatingChat: false,
     isSingleChatLoading: false,

     fetchAllUser: async () => {
          set({isUsersLoading: true})

          try {
            const {data} = await API.get("/user/all")
            set({users: data.users})

          } catch (error: any) {
             toast.error(error?.response?.data?.message || 'Failed to fetch users')
          } finally {
            set({isUsersLoading: false})
          }
     },
     fetchChats: async() => {
          set({isChatLoading: true})

           try {
               const {data} = await API.get("/chat/all")
               set({chats: data.chats})
           }catch(error: any){
             toast.error(error?.response?.data?.message || 'Failed to fetch chats')
           } finally {
             set({isChatLoading: false})
           }
     },
     createChat: async (payload: CreateChatType) => {
          set({isCreatingChat: true})

           try {
             const response = await API.post("/chat/create", {
                ...payload
             })

             get().addNewChat( response.data.chat)
             toast.success("Chat created successfully!")
              return response.data.chat
           } catch(error: any) {
              toast.error(error?.response?.data?.message || 'Failed to create chats')
           } finally{
             set({isCreatingChat: false})
           }
     },
     fetchSingleChat: async (chatId: string) => {
          set({isSingleChatLoading: true})

          try{
           const {data} = await API.get(`/chat/${chatId}`)
           set({singleChat: data})
          }catch(error: any) {
              toast.error(error?.response?.data?.message || 'Failed to fetch single chats')
              return null
           } finally{
             set({isSingleChatLoading: false})
           }
     },

    addNewChat: (newChat: ChatType) =>  {
       set((state) => {
         const existingChatIndex = state.chats.findIndex((c) => c._id === newChat._id)

          if(existingChatIndex !== -1){
             return {
               chats: [newChat, ...state.chats.filter((c) => c._id !== newChat._id)]
             }
          } else {
             return {
              chats: [newChat, ...state.chats]
             }
          }
       } 
      )
    },
    updateChatLastMessage: (chatId, lastMessage) => {
         set((state) => {
           const chat = state.chats.find((c) => c._id === chatId)

           if(!chat) return state

            return {
               chats: [
                {...chat, lastMessage},
                ...state.chats.filter((c) => c._id !== chatId)
               ]
            }
         })
    },
    addNewMessage: (chatId, message) => {
       const chat = get().singleChat

       if(chat?.chat._id === chatId) {
         set({
             singleChat: {
               chat: chat.chat,
               messages: [...chat.messages, message]
             }
         })
       }
    }
 }))