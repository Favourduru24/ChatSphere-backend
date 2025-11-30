import {io, Socket} from "socket.io-client"
import {create} from 'zustand'

const BASE_URL = import.meta.env.MODE === 'development' ? 
 import.meta.env.VITE_API_URL : '/'

 interface SocketState {
     socket: Socket | null
     onlineUser: string[]
     connectSocket: () => void
     disconnectSocket: () => void
 }

  export const useSocket = create<SocketState>((set, get) => ({
      
     socket: null,
     onlineUser: [],

     connectSocket: () => {
       
         const {socket} = get()
        if(socket?.connected) return

        //   const newSocket = 
     },
     disconnectSocket: () => {},
  }))