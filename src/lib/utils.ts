import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API = axios.create({
   baseURL: import.meta.env.MODE === 'development' 
   ? `${import.meta.env.VITE_API_URL}/api`
   : '/api',
   withCredentials: true
})