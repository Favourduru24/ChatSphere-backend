import { ArrowLeft, Camera, Loader2, Plus, Users2Icon } from 'lucide-react'
import ChatList from './chat-list'
import { chatData} from '@/constants'
import Search from './search'
import type { ChatType } from '@/types/chat.type';
import { useEffect, useState } from 'react';
import { useChat } from '@/hooks/use-chat';

interface PropsType {
   currentUserId: string;
   searchQuery: string;
   open: boolean;
   createGroupModal: boolean;
   isGroupOpen: boolean;
   isUsersLoading: boolean
   filteredUsers: ChatType
   toggleCreateGroup?: () => void,
   setIsGroupOpen?: () => void,
   setSearchQuery?: () => void,
   onRoute?: () => void,
 }
 

const NewChat = ({currentUserId, open, toggleCreateGroup, isUsersLoading, chatModalRef, searchQuery, setSearchQuery, filteredUsers, isGroupOpen, createGroupModal, setIsGroupOpen, onRoute}: PropsType) => {     

    const [selectedUser, setSelectedUser] = useState<string[]>([])
    const [groupName, setGroupName] = useState('')
    const [loadingUserId, setLoadingUserId] = useState<string | null>(null)

    const {fetchAllUser, createChat} = useChat()

      useEffect(() => {
        fetchAllUser()
      }, [fetchAllUser])

    const toggleUserSelection = (id: string) => {
         setSelectedUser((prev) => prev?.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
        )
    }

    console.log(selectedUser)

    const handleCreateGroup = async () => {
        if(!groupName?.trim() || selectedUser?.length === 0) return 

         await createChat({
            isGroup: true,
            participants: selectedUser,
            groupName: groupName
         })
        }

    const handleCreateChat = async (userId: string) => {
        setLoadingUserId(userId)

         try {
            await createChat({
              isGroup: false,
              participantId: userId
            }) 
         } finally {
           setLoadingUserId(null) 
         }
    }

    //  const isCheck = selectedUser.includes(user.id)
           
    
  return (
    <>
     {open && (
  <div
    aria-modal="true"
    className="absolute  top-20 left-[50%] max-w-[350px] w-full bg-white border rounded-lg shadow-lg flex flex-col h-[85%] min-h-0 z-20"
    ref={chatModalRef}
  >
    {/* GROUP MODAL */}
    {isGroupOpen && (
      <div className="absolute inset-0 bg-white flex flex-col min-h-0 rounded-lg">
        
        {/* Header */}
         <div className="px-3 py-3 border-b flex items-center gap-3">
          <button onClick={() => setIsGroupOpen(false)} className="p-2 rounded-md hover:bg-slate-100">
            <ArrowLeft className="size-5" />
            </button>
          <h3 className="text-lg font-semibold">New group</h3>
           </div>

        {/* Search */}
        <div className="px-4 pt-3">
                       <Search placeholder="Search name or email" value={searchQuery} setChange={setSearchQuery}/>
                      <p className="text-sm text-slate-500 mb-2">All contacts</p>
                    </div>

        {/* SCROLLABLE CONTACT LIST */}
        <div className="flex-1 min-h-0 overflow-y-auto chat-scroll">
          <div className="flex flex-col">
            {filteredUsers.map((user) => (
              <div key={user.id} className="h-16 flex items-center cursor-pointer hover:bg-[#EDF2FE]">
                <div className="w-full p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className={`shrink-0 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center`}/>
                      <div>
                        <p className="text-sm font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-[#8B92A1]">Here There! i'm using Chatsphere</p>
                      </div>
                    </div>
                    <input type="checkbox" className="size-3 accent-[#8E8AD8] cursor-pointer" value={} onChange={toggleUserSelection(user.id)}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3 border-t flex gap-2 items-center justify-between">
                      <button className="w-full py-2 bg-purple-600 text-white rounded-md font-semibold cursor-pointer" onClick={toggleCreateGroup}>Next</button>

                      <button className="w-full py-2 bg-[#e6eaec] text-black rounded-md font-semibold cursor-pointer" onClick={() => setIsGroupOpen(false)}>Cancel</button>
                    </div>
                  </div>
       
    )}
           {createGroupModal && ( <div className="absolute inset-0 bg-white flex flex-col min-h-0 rounded-lg">
            <div className="px-3 py-3 border-b flex items-center gap-3">
          <button onClick={toggleCreateGroup} className="p-2 rounded-md hover:bg-slate-100">
            <ArrowLeft className="size-5" />
            </button>
          <h3 className="text-lg font-semibold">New group</h3>
           </div>
                <div className="h-full flex flex-col justify-between">
                  <div className="flex flex-col">

             <div className="flex items-center w-full px-4 py-5 gap-2 ">
                   <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100">
                     <Camera className="size-4"/>
                   </div>
                     <p className="text-sm">Add a group icon <span className="text-gray-400">(optional)</span></p>
             </div>
                  
              <div className="flex flex-col w-full px-4 gap-2 ">
                     <p className="text-sm">Provide a group name</p>
                        {/* <Search placeholder="Group name (optional)" value={searchQuery} setChange={setSearchQuery}/> */}

                         <form className="border-b-2 border-[#8E8AD8] mb-3 rounded-sm">
                        <input className="w-full h-9 outline-none px-2 bg-[#EDF2FE] rounded-sm" placeholder="Group name (optional)" onChange={(e) => setGroupName(e.target.value)} value={groupName}/>
                      </form>
                  </div>

                   
              </div>
               <div className="p-3 border-t flex gap-2 items-center justify-between">
                      <button className="w-full py-2 bg-purple-600 text-white rounded-md font-semibold cursor-pointer">Create</button>

                      <button className="w-full py-2 bg-[#e6eaec] text-black rounded-md font-semibold cursor-pointer" onClick={toggleCreateGroup}>Cancel</button>
                    </div>
                </div>
           </div>)}
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
                        <input className="w-full h-9 px-2 outline-none" placeholder="Search name or email" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                      </form>
                    </div>

      {/* Options */}
       

      {/* MAIN SCROLL AREA */}
      <div className="flex-1 min-h-0 overflow-y-auto chat-scroll">
        <div className="flex flex-col">
          {isUsersLoading ? (
             <div className='inset-0 flex items-center justify-center w-full h-full'>
             <Loader2 className='size-10 animate-spin text-gray-400'/>
             </div>
             ) : filteredUsers?.length === 0 ? ( <div className='inset-0 flex items-center justify-center w-full h-full'>
              <p className='text-sm font-semibold'>No Chats found!</p>
             </div>

             ) : filteredUsers?.map((user) => (
           <div
              className="h-20 flex items-center cursor-pointer hover:bg-[#EDF2FE]"
            // onClick={onClick}
            >
              <div className="w-full p-4">
                <div className="flex justify-between">
                  <div className="flex gap-4 items-center">
                    <div className={`shrink-0 w-12 h-12 rounded-full ${`bg-amber-100`} flex items-center justify-center`}>

                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold truncate">{user.name}</p>
                      {/* <p className="text-xs text-[#8B92A1]">{getLastMessage()}</p> */}
                      <p className="text-xs text-[#8B92A1]">{"Here There! i'm using Chatsphere"}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#CCCFD9]">{user.createdAt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
)}
    </>
  )
}

export default NewChat