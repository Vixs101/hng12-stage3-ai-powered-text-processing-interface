"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import MessageBubble from "./MessageBubble"
import ActionControls from "./ActionControls"

interface ChatInterfaceProps {
  messages: Array<{ text: string; language: string | null; summary: string | null; translation: string | null }>;
  onSendMessage: (text: string) => void;
  onSummarize: (index: number) => void;
  onTranslate: (index: number) => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  isLoading: boolean;
}

export default function ChatInterface({
  messages,
  onSendMessage,
  onSummarize,
  onTranslate,
  selectedLanguage,
  onLanguageChange,
  isLoading,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input)
      setInput("")
    }
  }


  return (
    <div className="flex-grow flex flex-col overflow-y-auto gradient backdrop-blur-sm rounded-xl shadow-md md:min-w-3xl md:max-w-6xl xl:ml-16 border-[#7B47FE] border-2 ">
      <div className="flex-grow overflow-y-auto p-4 space-y-4
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-gray-300
        [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-[#7B47FE]
      dark:[&::-webkit-scrollbar-track]:bg-white
      dark:[&::-webkit-scrollbar-thumb]:bg-[#7B47FE]">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 h-full">
            <p className="text-xl text-white text-center">No input yet. Enter text below to see AI-powered summarization and translation!</p>
          </div>
        ) : (
          <>
          {messages.map((message, index) => (
            <div key={index} className="flex flex-col gap-4">
              <MessageBubble
                key={index}
                message={message}
              />
              <ActionControls
                message={message}
                onSummarize={() => onSummarize(index)}
                selectedLanguage={selectedLanguage}
                isLoading={isLoading}
                onLanguageChange={onLanguageChange}
                onTranslate={() => {
                  onTranslate(index)
                  console.log('translating', selectedLanguage, message)
                }}
              />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </>
        )}

      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex items-center">
          <label htmlFor="messageInput" className="sr-only">
            Message
          </label>
          <textarea
            id="messageInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            aria-label="Type your message"
            className="flex-grow p-2 bg-[#051731] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B47FE] h-10 resize-none overflow-hidden mr-2"
            rows={1}
          />
          <button
            type="submit"
            className="text-white hover:bg-[#7B47FE]/30 focus:outline-none focus:ring-2 focus:ring-[#7B47FE] rounded-md p-2 transition-colors bg-[#7B47FE]"
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

