import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"
import {v4 as uuidv4} from "uuid"
import type { ChatType } from "@/types/chat.type"
import { useSocket } from "@/hooks/use-socket"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API = axios.create({
   baseURL: import.meta.env.MODE === 'development' 
   ? `${import.meta.env.VITE_API_URL}/api`
   : '/api',
   withCredentials: true
})

 export const isUserOnline = (userId?: string) => {
  if (!userId) return false;
  const { onlineUsers } = useSocket.getState();
  return onlineUsers.includes(userId);
};

export const getOtherUserAndGroup = (
  chat: ChatType | undefined,
  currentUserId: string | null
) => {
  const isGroup = chat?.isGroup;

  if (isGroup) {
    return {
      name: chat.groupName || "Unnamed Group",
      subheading: `${chat.participants.length} members`,
      avatar: "",
      isGroup,
    };
  }

  const other = chat?.participants.find((p) => p._id !== currentUserId);
  const otherName = chat?.participants.map((p) => p.name);
  const isOnline = isUserOnline(other?._id ?? "");

  console.log('Where online', otherName)

  return {
    name: other?.name || "Unknown",
    subheading: isOnline ? "Online" : "Offline",
    avatar: other?.avatar || "",
    isGroup: false,
    isOnline,
    // isAI: other?.isAI || false,
  };
};

export const formatCustomDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  const year = date.getUTCFullYear();
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
  // ${day} ${month} ${year},
}

export function generateUUID(): string {
  return uuidv4()
}