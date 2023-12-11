

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
                //Sdocument.getElementById('result').textContent = "Giggity";
                window.documentText = response.data.toLowerCase().match(/\b(\w+)\b/g);
                document.getElementById('result').textContent = "Text Successfully Retrieved";
            } else {
                document.getElementById('result').textContent = 'No text found or content script not responding';
            }
        });
    });
    console.log("hihi");
}

function calculateTF(words) {
    const wordCount = words.length;
    const wordFreq = {};
    words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    for (let word in wordFreq) {
        wordFreq[word] = wordFreq[word] / wordCount;
        console.log(word + wordFreq[word]);
    }
    return wordFreq;
}

function summarizeText(action) {
    window.tf = calculateTF(window.documentText);
    //IDF part
    document.getElementById('result').textContent = "TODO: IDF";
    //document.getElementById('result').textContent = window.tf;
}

// right click on extension icon and click on inspect popup, logs show up there
// idf corpus online: http://archives.textfiles.com/stories.zip

document.getElementById('runpageBtn').addEventListener('click', () => displayText('runpage'));
document.getElementById('summarizeBtn').addEventListener('click', () => summarizeText('summarize'));
document.getElementById('sentimentBtn').addEventListener('click', () => displayText('sentiment'));
