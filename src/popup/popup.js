// popup.js
document.getElementById('summarize').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: "summarizeText" }, function (response) {
            document.getElementById('results').innerText = response.summary;
        });
    });
});

document.getElementById('analyzeSentiment').addEventListener('click', function () {
    // Implementation for sentiment analysis would go here
    console.log("Sentiment analysis feature would be implemented here.");
});
