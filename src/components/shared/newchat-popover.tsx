import { ArrowLeft, Loader2, Users2Icon } from 'lucide-react';
import Search from './search';
import { useEffect, useState } from 'react';
import { useChat } from '@/hooks/use-chat';
import type { UserType } from '@/types/auth.type';
import { userData } from '@/constants';

interface PropsType {
  currentUserId: string;
  open: boolean;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  isUsersLoading: boolean;
  chatModalRef: React.RefObject<HTMLDivElement>;
  isGroupOpen: boolean;
  createGroupModal: boolean;
  toggleCreateGroup: () => void;
  setIsGroupOpen: (v: boolean) => void;
  setOpen: (v: boolean) => void;
  onRoute: (id: string) => void;
}

const NewChat = ({
  currentUserId,
  open,
  searchQuery,
  setSearchQuery,
  isUsersLoading,
  chatModalRef,
  isGroupOpen,
  createGroupModal,
  toggleCreateGroup,
  setIsGroupOpen,
   setOpen
}: PropsType) => {

  // const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null)

  const { fetchAllUser, createChat, isCreatingChat, users} = useChat();

  useEffect(() => {
     fetchAllUser()
  }, [fetchAllUser]);

  console.log('allUser wow', users)

  const toggleUserSelection = (id: string) => {
    setSelectedUser(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateGroup = async () => {
           if (!groupName.trim() || selectedUser.length === 0) return;
         await createChat({
         isGroup: true,
         participants: selectedUser,
         groupName
         });
        }

    const handleCreateChat = async (userId: string) => {
               setLoadingUserId(userId)
              try {
               await createChat({
               isGroup: false,
               participantId: userId
            })
              } finally {
                 setOpen(false)
                 setLoadingUserId(null)
              }
       
    }

  // console.log({selectedUser})
  return (
    <>
      {open && (
        <div className="absolute top-20 left-1/2 max-w-[350px] w-full bg-white border rounded-lg shadow-lg flex flex-col h-[85%] min-h-0 z-20" ref={chatModalRef}>

          {/* GROUP CONTACTS */}
          {isGroupOpen && (
            <div className="absolute inset-0 bg-white flex flex-col min-h-0 rounded-lg">
              <div className="px-3 py-3 border-b flex items-center gap-3">
                <button onClick={() => setIsGroupOpen(false)} className="p-2">
                  <ArrowLeft className="size-5" />
                </button>
                <h3 className="text-lg font-semibold">Select members ({selectedUser?.length})</h3>
              </div>

              <div className="px-4 pt-3">
                <Search placeholder="Search username" value={searchQuery} setChange={setSearchQuery} />
              </div>

              <div className="flex-1 overflow-y-auto chat-scroll">
                {isUsersLoading ? (
                            <div className="flex items-center justify-center w-full h-full">
                              <Loader2 className="size-10 animate-spin text-gray-400" />
                            </div>
                          ) : filteredUsers?.length === 0 ? (
                            <div className="flex items-center justify-center w-full h-full">
                              <p className="text-sm font-semibold">No user found!</p>
                            </div>
                          ) : filteredUsers.map(user => (
                  <label key={user.id} className="flex justify-between px-4 py-3 items-center hover:bg-gray-50 cursor-pointer">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-full bg-purple-200" />
                       <div className='flex flex-col gap-1'>
                      <p className='font-semibold text-sm'>{user.name}</p>
                      <p className='text-xs text-gray-500'>hey there! I'm using chatSphere.</p>
                       </div>
                    </div>
                    <input
                      type="checkbox"
                      className="size-3 accent-purple-300"
                      checked={selectedUser.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                    />
                  </label>
                ))}
              </div>

              <div className="p-3 border-t flex gap-2">
                <button className={`w-full py-2 text-white rounded-md ${!selectedUser?.length ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600'}`} onClick={selectedUser.length && toggleCreateGroup}>
                  Next
                </button>
                
                <button className="w-full py-2 bg-gray-200 rounded-md" onClick={() => 
                  {
                    setIsGroupOpen(false),
                    setGroupName('')
                    setSelectedUser([])
                    }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* GROUP NAME MODAL */}
          {createGroupModal && (
            <div className="absolute inset-0 bg-white flex flex-col rounded-lg">
              <div className="px-4 py-3 border-b flex gap-3 items-center">
                <button onClick={toggleCreateGroup}>
                  <ArrowLeft className="size-5" />
                </button>
                <h3 className="text-lg font-semibold">Group name</h3>
              </div>

              <div className="flex-1 p-4">
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Enter group name"
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                />
              </div>

              <div className="p-3 border-t">
                <button className={`w-full py-2  text-white rounded-sm flex justify-center items-center  ${isCreatingChat ? 'bg-purple-500 cursor-not-allowed' : 'bg-purple-600 cursor-pointer'}`} onClick={handleCreateGroup} disabled={isCreatingChat}>
                  {isCreatingChat 
                  ? <div className='flex gap-2 items-center'>
                      <Loader2 className='animate-spin size-5'/>
                      <p className='text-[1rem] text-white'>Loading...</p>
                  </div> : <p className='text-[1rem] text-white font-semibold'>Create Group</p>}
                </button>
              </div>
            </div>
          )}

          {/* DEFAULT NEW CHAT */}
          {!isGroupOpen && !createGroupModal && (
            <>
              <div className="px-4 py-3 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">New Chat</h2>
                <button onClick={() => setIsGroupOpen(true)}>
                  <Users2Icon className="size-5" />
                </button>
              </div>

              <div className="px-4 py-2 border-b">
                <input
                  className="w-full outline-none"
                  placeholder="Search username"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex-1 overflow-y-auto chat-scroll">
                {isUsersLoading ? (
                            <div className="flex items-center justify-center w-full h-full">
                              <Loader2 className="size-10 animate-spin text-gray-400" />
                            </div>
                          ) : filteredUsers?.length === 0 ? (
                            <div className="flex items-center justify-center w-full h-full">
                              <p className="text-sm font-semibold">No user found!</p>
                            </div>
                          ) : filteredUsers.map(user => (
                  <div
                    key={user.id}
                    onClick={() => handleCreateChat(user.id)}
                    className="flex px-4 py-3 items-center gap-3 cursor-pointer hover:bg-gray-50 justify-between"
                  >
                     <div className="flex gap-2 justify-between items-center">
                        <div className="w-12 h-12 bg-purple-200 rounded-full" />
                     <div className='flex flex-col gap-1'>
                    <p className='text-sm font-semibold'>{user.name}</p>
                    <p className='text-xs text-gray-500'>hey there! I'm using chatSphere.</p>
                     </div>
                     </div>
                    
                     {loadingUserId?.includes(user.id) && <Loader2 className="size-4 text-gray-500 animate-spin"/>}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default NewChat;
