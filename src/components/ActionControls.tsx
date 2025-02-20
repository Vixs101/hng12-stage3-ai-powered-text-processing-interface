interface ActionControlsProps {
    selectedLanguage: string
    onLanguageChange: (language: string) => void
    onTranslate: () => void
  }
  
  export default function ActionControls({ selectedLanguage, onLanguageChange, onTranslate }: ActionControlsProps) {
    const languages = [
      { code: "en", name: "English" },
      { code: "pt", name: "Portuguese" },
      { code: "es", name: "Spanish" },
      { code: "ru", name: "Russian" },
      { code: "tr", name: "Turkish" },
      { code: "fr", name: "French" },
    ]
  
    return (
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mt-4 md:min-w-3xl md:max-w-6xl">
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
        <button
          onClick={onTranslate}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Translate
        </button>
      </div>
    )
  }
  
  