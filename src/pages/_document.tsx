// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Language detector token */}
          <meta
            httpEquiv="origin-trial"
            content={process.env.NEXT_PUBLIC_LANGUAGE_DETECTOR_TOKEN}
          />
          {/* translator token */}
          <meta
            httpEquiv="origin-trial"
            content={process.env.NEXT_PUBLIC_TRANSLATOR_TOKEN}
          />
          {/* summarizer token */}
          <meta
            httpEquiv="origin-trial"
            content={process.env.NEXT_PUBLIC_SUMMARIZER_TOKEN}
          />

          {/* You can add additional meta tags or link tags here */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
