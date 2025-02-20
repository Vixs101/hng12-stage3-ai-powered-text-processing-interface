"use client"

import { useState, useEffect } from "react"
import ChatInterface from "@/components/ChatInterface"
import { useErrorToast } from "@/hooks/useErrorToast"
import { AISummarizerOptions } from "../../global"

export default function Home() {
  const [messages, setMessages] = useState<
    Array<{ text: string; language: string | null; summary: string | null; translation: string | null }>
  >([])
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const toast = useErrorToast()
  const [isLoading, setIsLoading] = useState(false)

  const isMobileDevice = (): boolean =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // load messagesfrom local storage on mount.
  useEffect(() => {
      if (typeof window !== "undefined") {
        const storedMessages = localStorage.getItem('messages');
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }
      }
    }, []);

  // save messages to local storage when ever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [messages])
  

  const handleSendMessage = async (text: string) => {
    const newMessage = { text, language: null, summary: null, translation: null };
    setMessages(prev => [...prev, newMessage]);

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
        toast.showError(`Language detection error ${error}`);
      }
    }
  };

  // summarization
  const handleSummarize = async (index: number) => {
    // Check for mobile devices
    if (isMobileDevice()) {
      toast.showError("Summarization is only available on desktop Chrome browsers");
      return;
    }
  
    setIsLoading(true);
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
      setIsLoading(false);
      return;
    }
  
    if (
      typeof window !== "undefined" &&
      window.ai &&
      window.ai.summarizer &&
      "create" in window.ai.summarizer
    ) {
      try {
        const capabilities = await window.ai.summarizer.capabilities();
        if (capabilities.available === "no") {
          toast.showError("Summarizer API is not available at the moment.");
          setIsLoading(false);
          return;
        }
  
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
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.showError("Chrome Summarizer API not available");
      setIsLoading(false);
    }
  };
  


  const handleTranslate = async (index: number) => {
    // Check for mobile devices
    if (isMobileDevice()) {
      toast.showError("Translation is only available on desktop Chrome browsers");
      setIsLoading(false);
      return;
    }
  
    setIsLoading(true);
    const message = messages[index];
    if (!message) return;
  
    const sourceLanguage = message.language;
    if (!sourceLanguage) {
      toast.showError("Unable to detect the source language, please refresh and try again");
      setIsLoading(false);
      return;
    }
  
    if (sourceLanguage === selectedLanguage) {
      toast.showError("The message is already in the selected language");
      setIsLoading(false);
      return;
    }
  
    if (
      typeof window !== "undefined" &&
      window.ai &&
      window.ai.translator &&
      "create" in window.ai.translator
    ) {
      try {
        const translator = await window.ai.translator.create({
          sourceLanguage: sourceLanguage, // using the detected source language
          targetLanguage: selectedLanguage,
        });
  
        const translation = await translator.translate(message.text);
        console.log(translation);
        const updatedMessages = [...messages];
        updatedMessages[index] = { ...message, translation };
        setMessages(updatedMessages);
      } catch (error) {
        console.error("Translation error", error);
        toast.showError("An error occurred during translation");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("Chrome Translator API not available");
      toast.showError("Chrome Translator API not available");
      setIsLoading(false);
    }
  };
  


  return (
    <main className="flex flex-col h-screen p-4 md:px-10 lg:px-28 md:py-4  justify-center text-black w-full space-y-3">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center text-white">AI Text Processor</h1>
        <p className="text-white text-center">Language detection, translation, and summarization – all in one intelligent tool.</p>
      </div>
      <div className="flex-grow overflow-hidden flex flex-col justify-center  w-full">
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          onSummarize={handleSummarize}
          onTranslate={handleTranslate}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          isLoading={isLoading}
        />
      </div>
    </main>
  )
}
