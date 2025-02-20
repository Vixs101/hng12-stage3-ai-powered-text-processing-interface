interface MessageBubbleProps {
  message: {
    text: string
    language: string | null
    summary: string | null
    translation: string | null
  }
}


export default function MessageBubble({ message}: MessageBubbleProps) {
  const LANGUAGE_NAMES: { [code: string]: string } = {
    en: "English",
    pt: "Portuguese",
    es: "Spanish",
    ru: "Russian",
    tr: "Turkish",
    fr: "French",
  };


  return (
    <div className="bg-[#7B47FE] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-[#7B47FE]
  p-4 rounded-lg text-white z-50">
      <p className="mb-2 text-justify">{message.text}</p>
      {message.language && <p className="text-sm text-[#7B47FE] mb-2">Detected language: {LANGUAGE_NAMES[message.language] || message.language}</p>}
      {message.summary && (
        <div className="mt-2 p-2 bg-white rounded">
          <h4 className="font-bold text-sm mb-1">Summary:</h4>
          <p className="text-sm">{message.summary}</p>
        </div>
      )}
      {message.translation && (
        <div className="mt-2 p-2 bg-white/5 backdrop-blur-sm rounded-md shadow-md text-justify border-[#7B47FE] border-2">
          <h4 className="font-bold text-sm mb-1 ">Translation:</h4>
          <p className="text-sm">{message.translation}</p>
        </div>
      )}
    </div>
  )
}

