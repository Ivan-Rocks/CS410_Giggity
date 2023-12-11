// not clean
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
// clean
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
}
// clean
function calculateTF(words) {
    const wordCount = words.length;
    const wordFreq = {};
    words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    for (let word in wordFreq) {
        wordFreq[word] = wordFreq[word] / wordCount;
        //console.log(word + wordFreq[word]);
    }
    return wordFreq;
}

async function calculateIDF() {
    try {
        const response = await fetch('IDF.json'); // URL where the JSON file is hosted
        const idfData = await response.json();
        window.idf = idfData; // Now it's safe to assign to a global variable
        // You can also return 'idfData' here
        return idfData;
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}
// clean
function calculateTFIDF(TF, IDF) {
    let tfIdfScores = [];
    const defaultIdf = 4; // Or calculate a dynamic default IDF value

    // Calculate TF-IDF score for each term and push to array
    for (const term in TF) {
        const idf = term in IDF ? IDF[term] : defaultIdf;
        tfIdfScores.push({ term: term, score: TF[term] * idf });
    }
    // Sort the array by TF-IDF score in descending order
    tfIdfScores.sort((a, b) => b.score - a.score);
    return tfIdfScores;
}
// clean
async function summarizeText(action) {
    const tf = calculateTF(window.documentText);
    //IDF part
    const idf = await calculateIDF();
    window.TFIDF = calculateTFIDF(tf, idf);
    const topTfIdfScores = TFIDF.slice(0, 20);
    let textContent = '';
    for (const item of topTfIdfScores) {
        // Assuming each item has 'term' and 'score' properties
        textContent += `${item.term}\n`
        //textContent += `Term: ${item.term}, Score: ${item.score}\n`;
    }
    document.getElementById('result').textContent = textContent;
    //document.getElementById('result').textContent = window.tf;
}

// right click on extension icon and click on inspect popup, logs show up there
// idf corpus online: http://archives.textfiles.com/stories.zip

document.getElementById('runpageBtn').addEventListener('click', () => displayText('runpage'));
document.getElementById('summarizeBtn').addEventListener('click', () => summarizeText('summarize'));
document.getElementById('sentimentBtn').addEventListener('click', () => displayText('sentiment'));
