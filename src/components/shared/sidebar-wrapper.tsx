import { useChat } from '@/hooks/use-chat';
import { PenBox, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ChatList from './chat-list';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import NewChat from './newchat-popover';
import { chaty } from '@/constants';
import { useSocket } from '@/hooks/use-socket';
import type { ChatType, MessageType } from '@/types/chat.type';

const SideBarWrapper = () => {
  const { fetchChats, chats, isChatLoading, isUsersLoading, addNewChat, updateChatLastMessage} = useChat();
  const { user } = useAuth();
  const {socket} = useSocket()

  const currentUserId = user?._id ?? "";
  const navigate = useNavigate();

  const onRoute = (id: string) => navigate(`/chat/${id}`);

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [createGroupModal, setCreateGroupModal] = useState(false);

  const chatModalRef = useRef<HTMLDivElement | null>(null);

  const toggleOpen = () => setOpen(p => !p);
  const toggleCreateGroup = () => setCreateGroupModal(p => !p);


  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (chatModalRef.current && !chatModalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

      useEffect(() => {
        if(!socket) return
        const handleNewChat = (newChat: ChatType) => {
           console.log('Recieved new chat', newChat)
            addNewChat(newChat)
        }

        socket.on('chat:new', handleNewChat)

        return () => {
           socket.off('chat:new', handleNewChat)
        }

      }, [addNewChat, socket])

      useEffect(() => {
      if(!socket) return

       const handleChatUpdate = (data: {chatId: string, lastMessage: MessageType}) => {
  
          console.log('Recieved update on chat', data.lastMessage)   

           updateChatLastMessage(data.chatId, data.lastMessage)
        }
         
        socket.on('chat:update', handleChatUpdate)

        return () => {
           socket.off('chat:update', updateChatLastMessage)
        }
      }, [socket, updateChatLastMessage])

      console.log(chats, 'Chat-Data')

  return (
    <div className="max-w-[350px] w-full flex-col bg-[#F9FBFC] border-r border-t hidden lg:flex relative flex-1 min-h-0">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">chatSphere</p>
          <p className="text-sm text-slate-400">Recent conversations</p>
        </div>
        <PenBox className="size-5 text-slate-600 cursor-pointer" onClick={toggleOpen} />
      </div>

      <div className="p-4 h-14 flex items-center w-full">
        <div className="py-3 border-b flex items-center justify-between w-full">
          <div className="text-sm text-slate-500">
            <span className="font-medium text-slate-700">{chaty?.length ?? 0}</span> people
          </div>
          <div className="text-sm text-slate-400">Sort: Recent</div>
        </div>

        <NewChat
          currentUserId={currentUserId}
          open={open}
          setOpen={setOpen}
          toggleCreateGroup={toggleCreateGroup}
          isUsersLoading={isUsersLoading}
          chatModalRef={chatModalRef}
          isGroupOpen={isGroupOpen}
          createGroupModal={createGroupModal}
          setIsGroupOpen={setIsGroupOpen}
          onRoute={onRoute}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto chat-scroll h-full">
        <div className="flex flex-col h-full">
          {isChatLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <Loader2 className="size-10 animate-spin text-gray-400" />
            </div>
          ) : chats?.length === 0 ? (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-sm font-semibold">No chats found!</p>
            </div>
          ) : (
            chats?.map(chat => (
              <ChatList key={chat._id} chat={chat} onClick={() => onRoute(chat._id)} currentUserId={currentUserId} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarWrapper;
