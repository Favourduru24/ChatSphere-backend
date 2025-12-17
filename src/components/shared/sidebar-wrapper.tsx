import {chaty, userData } from '@/constants'
import { useChat } from '@/hooks/use-chat'
import { PenBox, Loader2} from 'lucide-react'
import  { useEffect, useRef, useState } from 'react'
import ChatList from './chat-list'
import {  useNavigate} from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import NewChat from './newchat-popover'

const SideBarWrapper = () => {
     
   //chat logic state
   const {fetchAllUser, fetchChats, chats, isChatLoading, isUsersLoading} = useChat()

   const {user} = useAuth()
    const currentUserId = user?.id || null

   const navigate = useNavigate()

   const onRoute = (id: string) => {
     navigate(`/chat/${id}`)
   }
        
  //Component state
       const [open, setOpen] = useState(false)
       const [searchQuery, setSearchQuery] = useState('')
       const [isGroupOpen, setIsGroupOpen] = useState(false)
       const [createGroupModal, setCreateGroupModal] = useState(false)
       const chatModalRef = useRef<HTMLDivElement | null>(null)
    
        const toggleOpen = () => setOpen((p) => !p);
       const toggleCreateGroup = () => setCreateGroupModal((p) => !p);
       
      //  const filteredChats = chaty?.filter((chat) => chat.groupName?.toLowerCase().includes(searchQuery.toLowerCase()) || chat.participants?.some((p) => p.id !== currentUserId && p.name?.toLowerCase().includes(searchQuery.toLowerCase()))) || []

        const filteredUsers = userData?.filter((user) => user.name?.toLowerCase().includes(searchQuery.toLowerCase())) || []

       useEffect(() => {
        fetchChats()
   }, [fetchChats])

    useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
              if (chatModalRef.current && !chatModalRef.current.contains(e.target)) {
                setOpen(false)
              }
            }
        
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
          }, [])

   console.log(chats)

  return (
    <div className="max-w-[350px] w-full flex-col bg-[#F9FBFC] border hidden lg:flex relative">
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

          <NewChat currentUserId={currentUserId} open={open} toggleCreateGroup={toggleCreateGroup} isUsersLoading={isUsersLoading} chatModalRef={chatModalRef} searchQuery={searchQuery} setSearchQuery={setSearchQuery} filteredUsers={filteredUsers} isGroupOpen={isGroupOpen} createGroupModal={createGroupModal} setIsGroupOpen={setIsGroupOpen} onRoute={onRoute} />

      </div>

      {/* Scrollable Chat List */}
      <div className="flex-1 min-h-0 overflow-y-auto chat-scroll h-full">
        <div className="flex flex-col h-full">
          {isChatLoading ? (
             <div className='inset-0 flex items-center justify-center w-full h-full'>
             <Loader2 className='size-10 animate-spin text-gray-400'/>
             </div>
             ) : chaty?.length === 0 ? ( <div className='inset-0 flex items-center justify-center w-full h-full'>
              <p className='text-sm font-semibold'>No Chats found!</p>
             </div>

             ) : chaty?.map((chat) => (
            <ChatList key={chat._id} chat={chat} onClick={() => onRoute(chat._id)} currentUserId={currentUserId}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBarWrapper