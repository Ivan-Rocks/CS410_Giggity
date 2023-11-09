// lib/sentiment.js
function analyzeSentiment(text) {
  return fetch('http://localhost:5000/sentiment/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: text }),
  })
  .then(response => response.json())
  .then(data => data.sentiment);
}
