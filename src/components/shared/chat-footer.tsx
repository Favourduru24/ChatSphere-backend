import { useChat } from '@/hooks/use-chat'
import type { MessageType } from '@/types/chat.type'
import { Image, Link2, Mic, Send, X} from 'lucide-react'
import React, { useRef, useState } from 'react'
import { toast } from 'sonner'
import z from "zod"

interface Props {
    chatId: string
    currentUserId: string | null
    replyTo: MessageType | null
    onCancelReply: () => void
}
const ChatFooter = ({chatId, currentUserId, replyTo, onCancelReply}: Props) => {

    const [image, setImage] = useState<string | null>(null)
    const [content, setContent] = useState('')
    const {sendMessage} = useChat()
     

     const imageInputRef = useRef<HTMLInputElement | null>(null)

     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const file = e.target.files?.[0]

         if(!file) return
         if(!file.type.startsWith('image/')) {
             toast.error("Please select an image file")
             return
         }

         const reader = new FileReader()
         reader.onloadend = () => setImage(reader.result as string)
         reader.readAsDataURL(file)
     }

     const handleRemoveImage = () => {
         setImage(null)

         if(imageInputRef.current) imageInputRef.current.value = ''
     }

     const handleSubmitMessage = () => {

        if(!content?.trim() && !image) {
             toast.error('Enter a message or select an image')
             return
        }

        sendMessage({
          chatId,
          content,
          image: image || undefined,
          replyTo: replyTo
        })

        onCancelReply()
        setContent(' ')
        handleRemoveImage()
     }

  return (
  <div className="sm:h-20 h-16 flex items-center sticky bottom-0 bg-white sm:p-8 p-5 relative">
       {image && (
            <div className="absolute bottom-[80%] group">
           <img src={image} className="w-20 h-20 z-20 rounded-xl ring-2 ring-[#8E8AD8]"/>

            <X className='opacity-0 group-hover:opacity-100 absolute top-1 right-1 size-6 bg-gray-300 p-1 rounded-md cursor-pointer' onClick={handleRemoveImage}/>
            </div>
        )}
        <div className="flex items-center w-full gap-2">
          <form className="flex-1 flex items-center gap-3 border rounded-full">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type Message here..."
              className="w-full rounded-full p-2 outline-none text-gray-500"
            />

            <div className="flex gap-2 p-2">
              <Mic className="text-[#495568] size-6 cursor-pointer" />
                <div>

              <Image className="text-[#495568] size-6 cursor-pointer" onClick={() => imageInputRef.current?.click()}/>
                <input type="file" className="hidden" ref={imageInputRef} accept="/image/*" onChange={handleImageChange}/>
                </div>
              <Link2 className="text-[#495568] size-6 rotate-90 cursor-pointer" />
            </div>
          </form>

          <button className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white shadow" onClick={handleSubmitMessage}>
            <Send className="size-5 cursor-pointer"/>
               </button>
        </div>
      </div>
  )
}

export default ChatFooter