interface MessageBubbleProps {
    message: {
      text: string
      language: string | null
      summary: string | null
      translation: string | null
    }
    onSummarize: () => void
  }

  
  export default function MessageBubble({ message, onSummarize }: MessageBubbleProps) {
    const LANGUAGE_NAMES: { [code: string]: string } = {
      en: "English",
      pt: "Portuguese",
      es: "Spanish",
      ru: "Russian",
      tr: "Turkish",
      fr: "French",
    };
    
    const showSummarizeButton = message.language === "en" && message.text.length > 150 && !message.summary
  
    return (
      <div className="bg-blue-100 p-4 rounded-lg">
        <p className="mb-2">{message.text}</p>
        {message.language && <p className="text-sm text-gray-600 mb-2">Detected language: {LANGUAGE_NAMES[message.language] || message.language}</p>}
        {showSummarizeButton && (
          <button
            onClick={onSummarize}
            className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Summarize
          </button>
        )}
        {message.summary && (
          <div className="mt-2 p-2 bg-white rounded">
            <h4 className="font-bold text-sm mb-1">Summary:</h4>
            <p className="text-sm">{message.summary}</p>
          </div>
        )}
        {message.translation && (
          <div className="mt-2 p-2 bg-white rounded">
            <h4 className="font-bold text-sm mb-1">Translation:</h4>
            <p className="text-sm">{message.translation}</p>
          </div>
        )}
      </div>
    )
  }
  
  