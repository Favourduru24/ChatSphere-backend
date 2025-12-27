import type { ChatType } from "@/types/chat.type";
import { Calendar, Menu, MessageSquareQuote, Search, SettingsIcon, Sparkle } from "lucide-react";

 type ChatItem = {
  // id: string;
  name: string;
  text: string;
  time: string;
  color: string; // Tailwind bg class like "bg-purple-400"
  // image?: string;
};

 export const navLink1 = [
    {
      icon: Menu,
      href: '/menu'
    },
    {
      icon: MessageSquareQuote,
      href: '/chat/'

    },
   ]

 export const navLink2 = [
    {
      icon: Sparkle,
      href: '/ai'

    },
    {
      icon: SettingsIcon,
      href: '/setting'
    },
   ]

   export const chatData: ChatItem[] = [
          {name: 'Favour Duru', text: 'I have sent you the link', time: '9:53', color: 'bg-red-500', },
          {name: 'Duru Pristine', text: 'How should i start', time: '7:53', color: 'bg-purple-500'},
          {name: 'Kelvin Kart', text: 'I have been working', time: '9:53', color: 'bg-green-500'},
          {name: 'Kelvin Port', text: 'How did you start', time: '10:53', color: 'bg-pink-500'},
          {name: 'Favour Duru', text: 'I have sent you the link', time: '1:53', color: 'bg-black'},
          {name: 'Duru Pristine', text: 'How should i start', time: '12:53', color: 'bg-orange-500'},
          {name: 'Kelvin Kart', text: 'I have been working', time: '12:53', color: 'bg-yellow-500'},
          {name: 'Kelvin Port', text: 'How did you start', time: '12:53', color: 'bg-red-500'},
          {name: 'Kelvin Port', text: 'How did you start', time: '12:53', color: 'bg-red-500'},
          {name: 'Kelvin Port', text: 'How did you start', time: '12:53', color: 'bg-red-500'},
          {name: 'Kelvin Port', text: 'How did you start', time: '12:53', color: 'bg-red-500'},
          {name: 'Duru Pristine', text: 'How should i start', time: '12:53', color: 'bg-orange-500'},
   ]

  //  id: string,
  //   name: string,
  //   email: string,
  //   avatar: string | null,
  //   createdAt: string | Date,
  //   updatedAt: string | Date

    export const userData = [
          {id: '1', name: 'Favour Duru', email: 'durupristine@gmail.com', avatar: '', createdAt: '12:04', updatedAt: '1:02'},
          {id: '2', name: 'Favour Duru', email: 'durupristine@gmail.com', avatar: '', createdAt: '12:04', updatedAt: '1:02'},
          {id: '3', name: 'Favour Duru', email: 'durupristine@gmail.com', avatar: '', createdAt: '12:04', updatedAt: '1:02'},
          {id: '4', name: 'Favour Duru', email: 'durupristine@gmail.com', avatar: '', createdAt: '12:04', updatedAt: '1:02'},
          {id: '5', name: 'Favour Duru', email: 'durupristine@gmail.com', avatar: '', createdAt: '12:04', updatedAt: '1:02'},
          {id: '6', name: 'Kelvin Hart', email: 'durupristine@gmail.com', avatar: '', createdAt: '12:04', updatedAt: '1:02'},
          {id: '7', name: 'Duru Pristine', email: 'durupristine@gmail.com', avatar: '', createdAt: '12:04', updatedAt: '1:02'},
          {id: '8', name: 'James Sam', email: 'durupristine@gmail.com', avatar: '', createdAt: '12:04', updatedAt: '1:02'},
          {id: '9', name: 'Favour Duru', email: 'durupristine@gmail.com', avatar: '', createdAt: '12:04', updatedAt: '1:02'},
          {id: '10', name: 'Devin Dax', email: 'durupristine@gmail.com', avatar: '', createdAt: '12:04', updatedAt: '1:02'},
          {id: '11', name: 'Favour Duru', email: 'durupristine@gmail.com', avatar: '', createdAt: '12:04', updatedAt: '1:02'}
   ]

  //  export type ChatType = {
  //      _id: string
  //      lastMessage: MessageType
  //      participants: UserType[]
  //      isGroup: boolean
  //      createdBy: string
  //      groupName?: string
  //      status?: string
  //      createdAt: string
  //      updatedAt: string
  //  }

//   export interface UserType {
//     id: string,
//     name: string,
//     email: string,
//     avatar: string | null,
//     createdAt: Date,
//     updatedAt: Date
// }

// export type MessageType = {
//     _id: string
//     content: String | null
//     image: string | null
//     sender: UserType | null
//     replyTo: MessageType | null
//     chatId: string
//     createdAt: string
//     updatedAt: string
// }

// lastMessage: [{_id: '1', content: 'Hey how are you', image: null, sender: null, replyTo: null, chatId: '1', createdAt: '', updatedAt:'1',     }],

   export const chaty: ChatType[] = [
          {_id: '1', isGroup: false, createdAt: '9:53', updatedAt: '9:53', participants: [{id: '1', name: 'Duru Pristine', email: 'd@gmail.com', avatar: '', createdAt: '', updatedAt: ''}], createdBy: 'Duru Pristine',  },
          {_id: 'Duru Pristine', isGroup: true, createdAt: '7:53', groupName: 'Dev Group', updatedAt: '9:53', participants: [{id: '1',name: 'Henry', email: 'd@gmail.com', avatar: '', createdAt: '9:53', updatedAt: ''}], createdBy: 'Duru Pristine'},
          {_id: 'Kelvin Kart', isGroup: false, createdAt: '9:53', updatedAt: '9:53', participants: [{id: '1', name: 'Kelvin hart', email: 'd@gmail.com', avatar: '', createdAt: '', updatedAt: '9:53'}], createdBy: 'Duru Pristine'},
          {_id: 'Kelvin Port', isGroup: false, createdAt: '10:53',  updatedAt: '9:53', participants: [{id: '1', name: 'James Carry', email: 'd@gmail.com', avatar: '', createdAt: '', updatedAt: '9:53'}], createdBy: 'Duru Pristine'},
          {_id: '2', isGroup: true, createdAt: '1:53', groupName: 'Tech Group', updatedAt: '9:53', participants: [{id: '1', name: 'John homes', email: 'd@gmail.com', avatar: '', createdAt: '', updatedAt: ''}], createdBy: 'Duru Pristine'},
          {_id: '3', isGroup: true, createdAt: '12:53', groupName: 'Web Dev Group', updatedAt: '9:53', participants: [{id: '1', name: 'D', email: 'd@gmail.com', avatar: '', createdAt: '', updatedAt: ''}], createdBy: 'Duru Pristine'},
          {_id: '4', isGroup: false, createdAt: '12:53',  updatedAt: '9:53', participants: [{id: '1', name: 'D', email: 'd@gmail.com', avatar: '', createdAt: '9:53', updatedAt: '9:53'}], createdBy: 'Duru Pristine'},
          {_id: '5', isGroup: false, createdAt: '12:53',  updatedAt: '9:53', participants: [{id: '1', name: 'D', email: 'd@gmail.com', avatar: '', createdAt: '9:53', updatedAt: '9:53'}], createdBy: 'Duru Pristine'},
          {_id: '6', isGroup: false, createdAt: '12:53',  updatedAt: '9:53', participants: [{id: '1', name: 'D', email: 'd@gmail.com', avatar: '', createdAt: '9:53', updatedAt: ''}], createdBy: 'Duru Pristine'},
          {_id: '7', isGroup: false, createdAt: '12:53',  updatedAt: '9:53', participants: [{id: '1', name: 'D', email: 'd@gmail.com', avatar: '', createdAt: '', updatedAt: ''}], createdBy: 'Duru Pristine'},
          {_id: '8', isGroup: false, createdAt: '12:53', updatedAt: '9:53', participants: [{id: '1', name: 'D', email: 'd@gmail.com', avatar: '', createdAt: '', updatedAt: ''}], createdBy: 'Duru Pristine'},
          {_id: '9', isGroup: true, createdAt: '12:53', groupName: 'Mern Stack Group', updatedAt: '9:53', participants: [{id: '1', name: 'D', email: 'd@gmail.com', avatar: '', createdAt: '', updatedAt: ''}], createdBy: 'Duru Pristine'},
   ]

     export const chatMessage = [
    {name: 'Favour Duru', text: 'Lorem ipsum dolor, sit amet consectetur.', time: '9:53', color: 'bg-red-500', message:{
         sender: {
            _id: '6938f28cc486d7352f0fd7d9',
            name: 'Duru Pristine'
         },
         replyTo: {
             sender: {
            _id: '6938f28cc486d7352f0fd7d9',
            name: 'Duru Pristine'
         },
         }
     }},
          {name: 'Kelvin Kart', text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis tempore eius, ab nulla officia minima! ❤️', time: '9:53', color: 'bg-green-500'},
          {name: 'Kelvin Kart', text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis tempore eius, ab nulla officia minima!', time: '9:53', color: 'bg-green-500', message:{
         sender: {
            _id: '6938f28cc486d7352f0fd7d9',
            name: 'Duru Pristine'
         },
         replyTo: {
             sender: {
            _id: '1',
            name: 'Duru Pristine'
         },
         }
     }},
          {name: 'Kelvin Kart', text: 'Lorem ipsum dolor, sit amet consectetur ', time: '9:53', color: 'bg-green-500', image: '/image/card2.webp'},
          {name: 'Kelvin Kart', text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis tempore eius, ab nulla officia minima!', time: '9:53', color: 'bg-green-500'},
          {name: 'Duru Pristine', text: 'How should i start', time: '12:53', color: 'bg-orange-500'},
          {name: 'Kelvin Kart', text: 'Lorem ipsum dolor, sit amet consectetur ❤️', time: '9:53', color: 'bg-green-500', image: '/image/card2.webp'},
   ]
