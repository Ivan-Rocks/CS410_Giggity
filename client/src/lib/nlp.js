// lib/nlp.js
function tokenizeText(text) {
  return fetch('http://localhost:5000/nlp/tokenize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: text }),
  })
  .then(response => response.json())
  .then(data => data.tokens);
}
