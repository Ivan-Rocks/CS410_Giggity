// background.js
// This script would listen for messages from the content script and popup

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "tokenizeText") {
      // Simulate a response for text tokenization
      console.log("Tokenizing text...");
      sendResponse({ tokens: request.text.split(' ') });
    } else if (request.action === "summarizeText") {
      // Simulate a response for text summarization
      console.log("Summarizing text...");
      sendResponse({ summary: "Simulated summary." });
    } else if (request.action === "analyzeSentiment") {
      // Simulate a response for sentiment analysis
      console.log("Analyzing sentiment...");
      sendResponse({ sentiment: "Positive", score: 0.9 });
    } else if (request.action === "searchDocument") {
      // Simulate a response for document search
      console.log("Searching document...");
      sendResponse({ results: "Simulated search results." });
    }
    return true; // Keep the message channel open for the async response
  });
  