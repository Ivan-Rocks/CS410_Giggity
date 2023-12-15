'use strict';

import './popup.css';
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

function getText() {
  var inputText = document.getElementById('inputText').value;
  window.documentText = inputText.toLowerCase().match(/\b(\w+)\b/g);
  document.getElementById('result').textContent = "Text Successfully Retrieved";
}
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
      const response = await fetch(chrome.runtime.getURL('IDF.json'));
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
  let keyword_size = 7;
  if (documentText.length<50) keyword_size = 3;
  if (documentText.length>1000) keyword_size=15;
  const topTfIdfScores = TFIDF.slice(0, keyword_size);
  let textContent = '';
  for (const item of topTfIdfScores) {
      // Assuming each item has 'term' and 'score' properties
      textContent += `${item.term}\n`
      //textContent += `Term: ${item.term}, Score: ${item.score}\n`;
  }
  document.getElementById('result').textContent = textContent;
  //document.getElementById('result').textContent = window.tf;
}


document.getElementById('getTextButton').addEventListener('click', getText);
document.getElementById('summarizeBtn').addEventListener('click', () => summarizeText('summarize'));
document.getElementById('sentimentBtn').addEventListener('click', () => displayText('sentiment'));