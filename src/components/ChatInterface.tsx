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
}

export default function ChatInterface({
  messages,
  onSendMessage,
  onSummarize,
  onTranslate,
  selectedLanguage,
  onLanguageChange,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]) // Updated dependency array

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input)
      setInput("")
    }
  }


  return (
    <div className="flex-grow flex flex-col overflow-hidden bg-white rounded-lg shadow-md md:min-w-3xl md:max-w-6xl xl:ml-16">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="flex flex-col gap-2">
            <MessageBubble
              key={index}
              message={message}
            />
            <ActionControls
              message={message}
              onSummarize={() => onSummarize(index)}
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange}
              onTranslate={() => {
                onTranslate(index)
                console.log('translating', selectedLanguage, message)
              }}
            />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-10 resize-none"
            rows={1}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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

