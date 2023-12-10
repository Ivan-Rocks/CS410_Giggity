// popup.js
function callOpenAI(text, task) {
    const prompt = task === 'summarize' ? `Summarize this text: ${text}` : `What is the sentiment of this text: ${text}`;
    return fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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' // Insert your API key here
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 200
        })
    })
    .then(response => response.json())
    .then(data => data.choices[0].text.trim());
}

function displayText(action) {
    document.getElementById('result').textContent = 'before'; // Initial text

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {method: "getText"}, function(response) {
            if (response && response.data) {
                // Simply display the extracted text
                document.getElementById('result').textContent = response.data;
            } else {
                document.getElementById('result').textContent = 'No text found or content script not responding';
            }
        });
    });
}

document.getElementById('summarizeBtn').addEventListener('click', () => displayText('summarize'));
document.getElementById('sentimentBtn').addEventListener('click', () => displayText('sentiment'));
