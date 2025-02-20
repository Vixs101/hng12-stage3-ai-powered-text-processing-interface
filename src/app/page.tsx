"use client"

import { useState } from "react"
import ChatInterface from "@/components/ChatInterface"
import { useErrorToast } from "@/hooks/useErrorToast"
import { AISummarizerOptions } from "../../global"

export default function Home() {
  const [messages, setMessages] = useState<
    Array<{ text: string; language: string | null; summary: string | null; translation: string | null }>
  >([])
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const toast = useErrorToast()

  const handleSendMessage = async (text: string) => {
    // Creating a new message object.
    const newMessage = { text, language: null, summary: null, translation: null };
    // Append the new message to the messages array.
    setMessages(prev => [...prev, newMessage]);
  
    // Now detecting the language.
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
        setMessages(prevMessages => {
          // Create a copy of the messages.
          const updatedMessages = [...prevMessages];
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
        toast.showError(`Language detection error ${error}` );
      }
    }
  };
  
  // summarization
  const handleSummarize = async (index: number) => {
    const message = messages[index];
    if (!message) return;
  
    const sourceLanguage = message.language;
    const options: AISummarizerOptions = {
      type: "key-points",
      length: "medium",
      format: "markdown",
    };
  
    if (sourceLanguage !== "en") {
      toast.showError("The message is not in English, summarization is not supported for this language");
      return;
    }
  
    if (
      typeof window !== "undefined" &&
      window.ai &&
      window.ai.summarizer &&
      "create" in window.ai.summarizer
    ) {
      try {
        // Check summarizer capabilities first.
        const capabilities = await window.ai.summarizer.capabilities();
        if (capabilities.available === "no") {
          toast.showError("Summarizer API is not available at the moment.");
          return;
        }
  
        // Create the summarizer.
        const summarizer = await window.ai.summarizer.create(options);
  
        if (capabilities.available === "after-download") {
          summarizer.addEventListener("downloadprogress", (e: Event) => {
            const progressEvent = e as ProgressEvent;
            console.log(`Downloaded ${progressEvent.loaded} of ${progressEvent.total} bytes.`);
          });
          await summarizer.ready;
        }
  
        const summaryText = await summarizer.summarize(message.text);
  
        setMessages(prevMessages => {
          const updated = [...prevMessages];
          updated[index] = { ...updated[index], summary: summaryText };
          return updated;
        });
  
        summarizer.destroy?.();
      } catch (error) {
        console.error("Summarization error", error);
        toast.showError("An error occurred while summarizing the text");
      }
    } else {
      console.error("Chrome Summarizer API not available");
      toast.showError("Chrome Summarizer API not available");
    }
  };
  
  

  const handleTranslate = async (index: number) => {
    const message = messages[index];
    if (!message) return;

    const sourceLanguage = message.language

    console.log(window.ai)

    if (!sourceLanguage){
      toast.showError("Unable to detect the source language,please refresh and try again")
    }

    if (sourceLanguage === selectedLanguage) {
      toast.showError("The message is already thesame with the selected language");
      return;
    }
    
    
    if (typeof window !== "undefined" && window.ai && window.ai.translator && "create" in window.ai.translator) {

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
      toast.showError("Chrome Translator API not available");
    }
    
  };


  return (
    <main className="flex flex-col h-screen p-4 md:px-10 lg:px-28 md:py-4 bg-gray-100 justify-center text-black w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">AI Text Processor</h1>
      <div className="flex-grow overflow-hidden flex flex-col justify-center  w-full">
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
