// content.js
console.log("Content script for Document Assistant loaded.");

// Example of how you might send the content of the page to the background script
function sendPageContent() {
    chrome.runtime.sendMessage({ action: "getPageContent", content: document.body.innerText }, function (response) {
        console.log("Page content sent to the background script.");
    });
}

// Listen for an event from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "summarizeText") {
        // Placeholder for summarization functionality
        console.log("Summarizing text...");
        sendResponse({ summary: "This is a placeholder summary of the page content." });
    }
});

// Call sendPageContent when the content script loads
sendPageContent();
