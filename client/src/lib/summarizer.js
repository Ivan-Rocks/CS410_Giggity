// lib/summarizer.js
function summarizeText(text) {
  return fetch('http://localhost:5000/summarizer/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: text }),
  })
  .then(response => response.json())
  .then(data => data.summary);
}
