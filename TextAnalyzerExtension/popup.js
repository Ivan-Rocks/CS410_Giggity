// Function to call OpenAI API for summarizing or sentiment analysis
function callOpenAI(text, task) {
    const prompt = task === 'summarize' ? `Summarize this text: ${text}` : `What is the sentiment of this text: ${text}`;
    return fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY' // Update with the correct API key
        },
        body: JSON.stringify({ prompt: prompt, max_tokens: 200 })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`API call failed: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data.choices || data.choices.length === 0 || !data.choices[0].text) {
            throw new Error('Invalid response structure from API');
        }
        return data.choices[0].text.trim();
    })
    .catch(error => {
        console.error('Error in callOpenAI:', error);
        throw error; // Rethrow to handle in calling function
    });
}

// Function to display text and handle action type
function displayText(action) {
    document.getElementById('result').textContent = 'Loading...'; // Initial text

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {method: "getText"}, function(response) {
            if (response && response.data) {
                window.documentText = response.data.toLowerCase().match(/\b(\w+)\b/g);
                if (action === 'sentiment') {
                    analyzeSentiment(response.data);
                } else {
                    document.getElementById('result').textContent = "Text Successfully Retrieved";
                }
            } else {
                document.getElementById('result').textContent = 'No text found or content script not responding';
            }
        });
    });
}

// Function to calculate Term Frequency (TF)
function calculateTF(words) {
    const wordCount = words.length;
    const wordFreq = {};
    words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    for (let word in wordFreq) {
        wordFreq[word] = wordFreq[word] / wordCount;
    }
    return wordFreq;
}

// Function to fetch and calculate Inverse Document Frequency (IDF)
async function calculateIDF() {
    try {
        const response = await fetch('IDF.json'); // URL where the JSON file is hosted
        const idfData = await response.json();
        window.idf = idfData;
        return idfData;
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}

// Function to calculate TF-IDF
function calculateTFIDF(TF, IDF) {
    let tfIdfScores = [];
    const defaultIdf = 4; // Default IDF value

    for (const term in TF) {
        const idf = term in IDF ? IDF[term] : defaultIdf;
        tfIdfScores.push({ term: term, score: TF[term] * idf });
    }

    tfIdfScores.sort((a, b) => b.score - a.score);
    return tfIdfScores;
}

// Function to summarize text
async function summarizeText(action) {
    const tf = calculateTF(window.documentText);
    const idf = await calculateIDF();
    window.TFIDF = calculateTFIDF(tf, idf);
    const topTfIdfScores = TFIDF.slice(0, 20);
    let textContent = '';
    for (const item of topTfIdfScores) {
        textContent += `${item.term}\n`;
    }
    document.getElementById('result').textContent = textContent;
}

// New function to analyze sentiment
const positiveKeywords = ['happy', 'great', 'joy', 'positive', 'successful', 'good', 'love', 'excellent', 'fortunate', 'correct', 'superior'];
const negativeKeywords = ['sad', 'bad', 'trouble', 'negative', 'fail', 'wrong', 'poor', 'hate', 'terrible', 'awful', 'inferior'];

async function analyzeSentiment(text) {
    let positiveCount = 0;
    let negativeCount = 0;
    
    const words = text.toLowerCase().match(/\b(\w+)\b/g); // Extract words from text

    words.forEach(word => {
        if (positiveKeywords.includes(word)) positiveCount++;
        if (negativeKeywords.includes(word)) negativeCount++;
    });

    let sentimentResult = 'Neutral';
    if (positiveCount > negativeCount) {
        sentimentResult = 'Positive';
    } else if (negativeCount > positiveCount) {
        sentimentResult = 'Negative';
    }

    document.getElementById('result').textContent = `Sentiment: ${sentimentResult}`;
}

// Event listeners for buttons
document.getElementById('runpageBtn').addEventListener('click', () => displayText('runpage'));
document.getElementById('summarizeBtn').addEventListener('click', () => summarizeText('summarize'));
document.getElementById('sentimentBtn').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {method: "getText"}, function(response) {
            if (response && response.data) {
                analyzeSentiment(response.data);
            } else {
                document.getElementById('result').textContent = 'No text found or content script not responding';
            }
        });
    });
});

