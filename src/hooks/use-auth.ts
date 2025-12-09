import type { LoginType, RegisterType, UserType } from '@/types/auth.type'
import {create} from 'zustand'
import {persist} from "zustand/middleware"
import {toast} from "sonner"
import { API } from '@/lib/utils'
import { useSocket } from './use-socket'

interface AuthState {
    user: UserType | null
    isLoggingIn: boolean
    isSigningUp: boolean
    isAuthStateLoading: boolean

    register: (data: RegisterType) => void
    login: (data: LoginType) => void
    logout: () => void,
    isAuthStatus: () => void
} 


 export const useAuth = create<AuthState>()(
    persist(
       (set) => ({
         user: null,
         isSigningUp: false,
         isLoggingIn: false,
         isAuthStateLoading: false,
         
         register: async (data: RegisterType) => {
            set({isSigningUp: true})

            try {

                const response = await API.post('/auth/register', data)
                set({user: response.data.user})
                useSocket.getState().connectSocket()
            } catch (err: any) {
                toast.error(err.response?.data?.message || 'Registration failed!')
            } finally {
                set({isSigningUp: false})
            }
         },
         login: async (data: LoginType) => {
             set({isLoggingIn: true})

            try {
                const response = await API.post('/auth/login', data)
                set({user: response.data.user})
                useSocket.getState().connectSocket()
            } catch (err: any) {
                toast.error(err.response?.data?.message || 'LoginIn failed!')
            } finally {
                set({isLoggingIn: false})
            }  
         },
         logout: async () => {
             try {
                await API.post("/auth/logout")
                set({user: null})
                useSocket.getState().disconnectSocket()
             } catch (err: any) {
                toast.error(err.response?.data?.message || 'Logout failed!')
                
             }
         },
         isAuthStatus: async () => {
                set({isAuthStateLoading: true})

                 try {
                const response = await API.get('/auth/status')
                set({user: response.data.user})
                useSocket.getState().connectSocket()
            } catch (err: any) {
                toast.error(err.response?.data?.message || 'Authentication failed!')
                console.log(err)
                // set({user: null})
            } finally {
                set({isAuthStateLoading: false})
            }  
         }
       }),
       {
         name: 'auth-storage'
       }
    ))