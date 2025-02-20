// global.d.ts
export {};

interface AITranslator {
  translate(text: string): Promise<string>;
  destroy(): void;
}

interface AITranslatorCreateOptions {
  sourceLanguage: string;
  targetLanguage: string;
}

interface AITranslatorCapabilities {
  languagePairAvailable: (
    sourceLanguage: string,
    targetLanguage: string
  ) => "no" | "readily" | "after-download";
}

interface AITranslatorFactory {
  capabilities(): Promise<AITranslatorCapabilities>;
  create(options: AITranslatorCreateOptions): Promise<AITranslator>;
}

interface AILanguageDetectorResult {
  detectedLanguage: string | null;
  confidence: number;
}

interface AILanguageDetector {
  detect(input: string, options?: { signal?: AbortSignal }): Promise<AILanguageDetectorResult[]>;
  destroy(): void;
}

interface AILanguageDetectorFactory {
  capabilities(options?: object): Promise<{ available: boolean | "readily" | "after-download" | "no" }>;
  create(options?: object): Promise<AILanguageDetector>;
}

// For properties you aren't using right now, you can provide minimal types:
type AILanguageModelFactory = object;

type AISummarizerFactory = object;

declare global {
  interface Window {
    ai: {
      languageModel: AILanguageModelFactory;
      summarizer: AISummarizerFactory;
      languageDetector: AILanguageDetectorFactory;
      translator: AITranslatorFactory;
    };
  }
}
