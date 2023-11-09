// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "summarizeText") {
        // Simulate sending text to the background script for summarization
        chrome.runtime.sendMessage({ action: "summarizeText", text: document.body.innerText }, sendResponse);
        return true; // Indicates you wish to send a response asynchronously
    } else if (request.action === "analyzeSentiment") {
        // Simulate sending text to the background script for sentiment analysis
        chrome.runtime.sendMessage({ action: "analyzeSentiment", text: document.body.innerText }, sendResponse);
        return true; // Indicates you wish to send a response asynchronously
    }
});
