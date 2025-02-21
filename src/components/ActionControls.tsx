interface ActionControlsProps {
  message: {
    text: string
    language: string | null
    summary: string | null
    translation: string | null
  }
  selectedLanguage: string
  isLoading: boolean
  onLanguageChange: (language: string) => void
  onTranslate: () => void
  onSummarize: () => void
}

export default function ActionControls({
  message,
  onSummarize,
  selectedLanguage,
  onLanguageChange,
  isLoading,
  onTranslate }: ActionControlsProps) {

  const showSummarizeButton = message.language === "en" && message.text.length > 150 && !message.summary

  const languages = [
    { code: "en", name: "English" },
    { code: "pt", name: "Portuguese" },
    { code: "es", name: "Spanish" },
    { code: "ru", name: "Russian" },
    { code: "tr", name: "Turkish" },
    { code: "fr", name: "French" },
  ]

  return (
    <div className="space-y-2 px-4 py-2 shadow-md rounded-lg bg-[#7B47FE]/10 backdrop-blur-sm">
      <p className="text-sm text-white">Don&apos;t understand the above text? select a language to translate to. {`${message.text.length > 150 ? "You can also use the summarize button to summarize the text" : ""}`}</p>
      <div className="flex items-center justify-between  md:min-w-3xl md:max-w-6xl">
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="p-2 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B47FE]"
          aria-label="Select translation language"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} className="text-[#7B47FE] bg-white/10 backdrop-blur-sm hover:text-white">
              {lang.name}
            </option>
          ))}

        </select>

        <div className="space-x-2">
          {showSummarizeButton && (
            <button
              onClick={onSummarize}
              className="bg-[#7B47FE] text-white px-4 py-2 rounded-lg hover:bg-[#6A3CD8] focus:outline-none focus:ring-2 focus:ring-[#7B47FE]"
            >
              {isLoading ? "Summarizing" : "Summarize"}
            </button>
          )}
          <button
            onClick={onTranslate}
            className="bg-[#7B47FE] text-white px-4 py-2 rounded-lg hover:bg-[#6A3CD8] focus:outline-none focus:ring-2 focus:ring-[#7B47FE]"
          >
            {isLoading ? "Translating" : "Translate"}
          </button>
        </div>
      </div>
    </div>
  )
}

