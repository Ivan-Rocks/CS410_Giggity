// summarizer.js - Example implementation with fetch API

function getSummary(text) {
    fetch('https://yourserver.com/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Summary:', data.summary);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  