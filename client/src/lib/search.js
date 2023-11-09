// lib/search.js
function searchDocument(query) {
  return fetch('http://localhost:5000/search/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: query }),
  })
  .then(response => response.json())
  .then(data => data.results);
}
