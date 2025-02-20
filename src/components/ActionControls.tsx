interface ActionControlsProps {
  message: {
    text: string
    language: string | null
    summary: string | null
    translation: string | null
  }
  selectedLanguage: string
  onLanguageChange: (language: string) => void
  onTranslate: () => void
  onSummarize: () => void
}

export default function ActionControls({
  message,
  onSummarize,
  selectedLanguage,
  onLanguageChange,
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
    <div className="space-y-2 px-4 py-2 shadow-md rounded-lg">
      <p className="text-sm text-gray-600">Don&apos;t understand the above text? select a language to translate to. You can also use the summarize button to summarize the text.</p>
      <div className="flex items-center justify-between bg-white  md:min-w-3xl md:max-w-6xl">
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Select translation language"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}

        </select>

        <div className="space-x-2">
          {showSummarizeButton && (
            <button
              onClick={onSummarize}
              className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Summarize
            </button>
          )}
          <button
            onClick={onTranslate}
            className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  )
}

