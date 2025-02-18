# FE Stage 3: AI-Powered Text Processing Interface

This project implements an AI-powered text processing interface using Chrome's AI APIs.  It allows users to input text and utilize features such as summarization, translation, and language detection.

## Table of Contents

- [Overview](#overview)
- [Study Material](#study-material)
- [Requirements](#requirements)
    - [Summary](#summary)
    - [Core Features](#core-features)
    - [API Integration](#api-integration)
    - [Accessibility](#accessibility)
    - [Responsive Design](#responsive-design)
- [Acceptance Criteria](#acceptance-criteria)
    - [Functionality](#functionality)
    - [Error Handling](#error-handling)
    - [Responsive Design](#responsive-design-1)
    - [Code Quality](#code-quality)
- [Submission](#submission)

## Overview

This application provides a chat-like interface where users can input text and receive processed results.  The interface includes features for language detection, summarization (for English text over 150 characters), and translation to multiple languages.

## Study Material

*   Chrome AI APIs Overview: [https://developer.chrome.com/docs/ai/](https://developer.chrome.com/docs/ai/)
*   Summarizer API Documentation: [https://developer.chrome.com/docs/ai/summarizer-api](https://developer.chrome.com/docs/ai/summarizer-api)
*   Translator API Documentation: [https://developer.chrome.com/docs/ai/translator-api](https://developer.chrome.com/docs/ai/translator-api)
*   Language Detection API Documentation: [https://developer.chrome.com/docs/ai/language-detection](https://developer.chrome.com/docs/ai/language-detection)
*   Asynchronous JavaScript Handling: [https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
*   Responsive Web Design Basics: [https://web.dev/responsive-web-design-basics/](https://web.dev/responsive-web-design-basics/)
*   Accessible UI Design: [https://www.digitala11y.com/](https://www.digitala11y.com/)

**Note:** You may need to turn on experimental feature flags in your Chrome browser to access these native AI APIs.

## Requirements

### Summary

The UI should resemble a chat interface:

*   A textarea at the bottom for input.
*   The output area above the textarea.
*   Upon sending, the input text immediately appears in the output area.
*   The detected language is displayed below the output text.
*   For English text longer than 150 characters, a "Summarize" button appears.
*   A language selection dropdown and "Translate" button are available for translation.
*   Translated and/or summarized output appears below the original text.

### Core Features

*   **Input Display:** A large textarea and a send button (displaying only a send icon).
*   **Language Selector:** A dropdown menu with the following languages: English (en), Portuguese (pt), Spanish (es), Russian (ru), Turkish (tr), French (fr).
*   **Action Buttons:** "Summarize" and "Translate" buttons.
*   **Output Display:** A styled area to display processed results.

### API Integration

*   Use Chrome AI APIs asynchronously.
*   Handle API responses and errors gracefully, providing user feedback.

### Accessibility

*   Keyboard navigation for all interactive elements.
*   Screen reader compatibility.
*   Meaningful ARIA labels and focus indicators.

### Responsive Design

*   Optimized layout for various screen sizes (desktop, tablet, mobile).
*   Flexible grid or stacked layout for smaller screens.

## Acceptance Criteria

### Functionality

*   Users can input and send text, which is displayed in the output field.
*   Summarization works for English text over 150 characters.
*   Translation to selected languages works correctly.
*   The application communicates with Chrome AI APIs and retrieves accurate results.
*   Processed results are displayed in the output area.

### Error Handling

*   Error messages are displayed for:
    *   API call failures.
    *   Empty or invalid input.
*   Error messages are clear and informative.

### Responsive Design

The interface adapts to different screen sizes.

### Code Quality

*   Modular, readable code with comments and a clear structure.
*   Use of async/await or Promises for API calls and error handling.

## Submission

Submit your task using the submission form. Ensure you’ve:

*   Hosted the application (e.g., Vercel, Netlify, GitHub Pages).
*   Provided the hosted page URL and GitHub repository link in the submission form.
*   Verified the functionality, responsiveness, and accessibility of your app.