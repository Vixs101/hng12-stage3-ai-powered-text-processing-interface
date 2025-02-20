"use client"

import { useState } from "react"
import ChatInterface from "@/components/ChatInterface"
import { useErrorToast } from "@/hooks/useErrorToast"

export default function Home() {
  const [messages, setMessages] = useState<
    Array<{ text: string; language: string | null; summary: string | null; translation: string | null }>
  >([])
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const showError = useErrorToast()

  const handleSendMessage = async (text: string) => {
    // Create a new message object.
    const newMessage = { text, language: null, summary: null, translation: null };
    // Append the new message to the messages array.
    setMessages(prev => [...prev, newMessage]);
  
    // Now detect the language.
    if (
      typeof window !== "undefined" &&
      window.ai &&
      window.ai.languageDetector &&
      "create" in window.ai.languageDetector
    ) {
      try {
        const detector = await window.ai.languageDetector.create();
        const results = await detector.detect(text);
  
        const bestResponse = results[0];
  
        // Since the new message was appended last, its index is the current length of messages.
        // However, since state updates are asynchronous, capture the index using a function updater:
        setMessages(prevMessages => {
          // Create a copy of the messages.
          const updatedMessages = [...prevMessages];
          // The new message is the last item in the array.
          const newIndex = updatedMessages.length - 1;
          // Update only the new message's language property.
          updatedMessages[newIndex] = {
            ...updatedMessages[newIndex],
            language: bestResponse.detectedLanguage,
          };
          return updatedMessages;
        });
  
        detector.destroy();
      } catch (error) {
        console.error("Language detection error", error);
        showError.showError("Language detection error");
      }
    }
  };
  
  const handleSummarize = (index: number) => {
    // Here you would typically call your summarization API
    // and update the message with the summary
  }
  

  const handleTranslate = async (index: number) => {
    const message = messages[index];
    if (!message) return;
    
    console.log(window.ai)
    if (typeof window !== "undefined" && window.ai && window.ai.translator && "create" in window.ai.translator) {
      // creating the translator
      console.log("it works!!")
      try {
        const translator = await window.ai.translator.create({
          sourceLanguage: "en",
          targetLanguage: selectedLanguage,
        });
        const translation = await translator.translate(message.text);
        console.log(translation)
        const updatedMessages = [...messages];
        updatedMessages[index] = { ...message, translation };
        setMessages(updatedMessages);
      } catch (error) {
        console.error("Translation error", error);
      }
    } else {
      console.error("Chrome Translator API not available");
      showError.showError("Chrome Translator API not available");
    }
    
  };


  return (
    <main className="flex flex-col h-screen px-28 py-4 bg-gray-100 justify-center text-black">
      <h1 className="text-2xl font-bold mb-4 text-center">AI Text Processor</h1>
      <div className="flex-grow overflow-hidden flex flex-col ">
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          onSummarize={handleSummarize}
          onTranslate={handleTranslate}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      </div>
    </main>
  )
}
