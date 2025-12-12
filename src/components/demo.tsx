import React, { useEffect, useRef, useState } from "react";
import {
  Plus,
  Search,
  Phone,
  Mic,
  Image,
  Link2,
  Send,
  PenBox,
  Users2Icon,
  ArrowLeft,
} from "lucide-react";

/** -----------------------------
 * Types
 * ----------------------------- */
type ChatItem = {
  id: string;
  name: string;
  text: string;
  time?: string;
  color?: string; // Tailwind bg class like "bg-purple-400"
  image?: string;
};

type ChatMessage = {
  id: string;
  name: string;
  text: string;
  time?: string;
  color?: string;
  image?: string;
};

/** -----------------------------
 * Mock data (replace with your real imports / API)
 * ----------------------------- */
const chatData: ChatItem[] = Array.from({ length: 18 }).map((_, i) => ({
  id: String(i + 1),
  name: `Person ${i + 1}`,
  text: `Last message preview ${i + 1}`,
  time: `${8 + (i % 12)}:${i % 2 ? "00" : "30"}`,
  color: i % 2 ? "bg-purple-400" : "bg-gray-300",
}));

const chatMessages: ChatMessage[] = [
  {
    id: "m1",
    name: "Duru Pristine",
    text: "Hey! This is a sample message. Looks clean, right?",
    time: "9:12",
    color: "bg-purple-400",
  },
  {
    id: "m2",
    name: "You",
    text: "Yep — UI feels tidier now.",
    time: "9:13",
    color: "bg-gray-300",
  },
];

/** -----------------------------
 * Hook: click outside to close
 * ----------------------------- */
function useClickOutside<T extends HTMLElement>(ref: React.RefObject<T>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const el = ref?.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

/** -----------------------------
 * Main Component
 * ----------------------------- */
const Demo: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isGroupOpen, setIsGroupOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, () => setOpen(false));

  const toggleOpen = () => setOpen((p) => !p);

  return (
    <div className="h-screen flex flex-col bg-white text-slate-800">
      {/* Header */}
      <header className="h-16 border-b px-6 flex items-center">
        <div className="flex items-center gap-4 w-full">
          <div className="w-9 h-9 rounded-md bg-purple-600 text-white flex items-center justify-center font-semibold">C</div>
          <h1 className="text-lg font-semibold tracking-tight">chatSphere</h1>

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={toggleOpen}
              aria-expanded={open}
              aria-controls="new-chat-modal"
              className="p-2 rounded-md hover:bg-slate-100 transition"
              title="New chat"
            >
              <PenBox className="size-5 text-slate-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="flex flex-1 min-h-0">
        {/* Left small nav */}
        <aside className="hidden md:flex md:flex-col md:w-[70px] bg-[#F8FAFC] border-r p-3">
          <div className="w-8 h-8 rounded-md bg-purple-600 text-white flex items-center justify-center font-semibold">C</div>

          <div className="mt-6 flex-1 flex flex-col justify-between min-h-0">
            <div className="flex flex-col gap-3">
              <button className="p-2 rounded-full hover:bg-white transition">
                <Search className="size-6 text-slate-600" />
              </button>
            </div>

            <div className="flex flex-col gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-purple-600" />
            </div>
          </div>
        </aside>

        {/* Middle chat list */}
        <main className="max-w-[350px] w-full hidden lg:flex flex-col bg-[#F7FBFD] border-r">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">Chats</p>
              <p className="text-sm text-slate-400">Recent conversations</p>
            </div>
            <Plus className="size-7 text-slate-600 cursor-pointer" />
          </div>

          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div className="text-sm text-slate-500">
              <span className="font-medium text-slate-700">23</span> people
            </div>
            <div className="text-sm text-slate-400">Sort: Recent</div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2">
            {chatData.map((c) => (
              <article
                key={c.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-shadow cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Open chat with ${c.name}`}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${c.color} flex items-center justify-center`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{c.name}</p>
                  <p className="text-xs text-slate-400 truncate">{c.text}</p>
                </div>
                <time className="text-xs text-slate-300 ml-2">{c.time}</time>
              </article>
            ))}
          </div>

          {/* small-screen modal trigger */}
          <div className="lg:hidden absolute top-4 right-4">
            <button onClick={toggleOpen} className="bg-purple-600 text-white w-10 h-10 rounded-full shadow-md">+</button>
          </div>

          {/* Modal (New Chat / New Group) */}
          {open && (
            <div
              id="new-chat-modal"
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              className="absolute left-1/2 top-20 -translate-x-1/2 max-w-[350px] w-full bg-white border rounded-lg shadow-lg flex flex-col h-[85%] min-h-0"
            >
              {/* Group overlay when open */}
              <div className="relative flex-1 min-h-0">
                {isGroupOpen ? (
                  <div className="absolute inset-0 bg-white flex flex-col min-h-0">
                    <div className="px-3 py-3 border-b flex items-center gap-3">
                      <button onClick={() => setIsGroupOpen(false)} className="p-2 rounded-md hover:bg-slate-100">
                        <ArrowLeft className="size-5" />
                      </button>
                      <h3 className="text-lg font-semibold">New group</h3>
                    </div>

                    <div className="px-4 pt-3">
                      <form className="border-b border-[#E6E6FA] mb-3">
                        <input className="w-full h-9 outline-none px-2" placeholder="Search name or email" />
                      </form>
                      <p className="text-sm text-slate-500 mb-2">All contacts</p>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto px-3 pb-4">
                      {chatData.map((c) => (
                        <label key={c.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 cursor-pointer">
                          <div className={`w-10 h-10 rounded-full ${c.color}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{c.name}</p>
                            <p className="text-xs text-slate-400 truncate">{c.text}</p>
                          </div>
                          <input type="checkbox" className="accent-purple-500" />
                        </label>
                      ))}
                    </div>

                    <div className="p-3 border-t">
                      <button className="w-full py-2 bg-purple-600 text-white rounded-md">Create Group</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col min-h-0 h-full">
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

                    <div className="px-4 pt-3 pb-2">
                      <form className="border-b border-[#E6E6FA]">
                        <input className="w-full h-9 px-2 outline-none" placeholder="Search name or email" />
                      </form>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto px-3 pb-4">
                      {chatData.map((c) => (
                        <article key={c.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 cursor-pointer">
                          <div className={`w-10 h-10 rounded-full ${c.color}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{c.name}</p>
                            <p className="text-xs text-slate-400 truncate">{c.text}</p>
                          </div>
                          <input type="checkbox" className="accent-purple-500" />
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        {/* Right: Chat view */}
        <section className="flex-1 min-h-0 flex flex-col">
          <div className="flex items-center justify-between px-6 h-20 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-600" />
              <div className="hidden sm:flex flex-col">
                <p className="text-sm font-semibold">Duru Pristine</p>
                <p className="text-xs text-slate-400">187 People - 187 Chats Total</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Search className="text-slate-600 size-6 cursor-pointer" />
              <Phone className="text-slate-600 size-6 cursor-pointer" />
              <div className="bg-purple-600 p-2 rounded-full text-white">
                <Plus className="size-6" />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5">
            <div className="flex flex-col gap-5 max-w-3xl">
              {chatMessages.map((m) => (
                <div key={m.id} className="flex gap-3 items-start">
                  <div className={`w-12 h-12 rounded-full ${m.color}`} />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">
                      {m.name} <span className="text-xs text-slate-400 ml-2">{m.time} AM</span>
                    </p>
                    <div className="bg-[#F7FBFD] p-3 rounded-lg text-sm">{m.text}</div>
                    {m.image && <img src={m.image} alt="" className="rounded-md border mt-2 max-w-xs" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t px-6 py-4 bg-white">
            <div className="max-w-4xl mx-auto flex items-center gap-3">
              <form className="flex-1 flex items-center gap-3 border rounded-full px-3 py-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 outline-none text-sm"
                  aria-label="Message"
                />
                <div className="flex items-center gap-2">
                  <Mic className="size-5 cursor-pointer" />
                  <Image className="size-5 cursor-pointer" />
                  <Link2 className="size-5 rotate-90 cursor-pointer" />
                </div>
              </form>

              <button className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white shadow">
                <Send className="size-5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Demo;
