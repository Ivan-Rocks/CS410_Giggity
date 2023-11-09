// src/popup/popup.js
document.getElementById('summarize').addEventListener('click', function () {
    chrome.tabs.executeScript({
      code: 'window.getSelection().toString();'
    }, function (selection) {
      summarizeText(selection[0])
        .then(summary => {
          document.getElementById('results').innerText = summary;
        })
        .catch(error => {
          document.getElementById('results').innerText = 'Error summarizing document.';
        });
    });
  });
  
  document.getElementById('analyzeSentiment').addEventListener('click', function () {
    chrome.tabs.executeScript({
      code: 'window.getSelection().toString();'
    }, function (selection) {
      analyzeSentiment(selection[0])
        .then(sentiment => {
          document.getElementById('results').innerText = sentiment;
        })
        .catch(error => {
          document.getElementById('results').innerText = 'Error analyzing sentiment.';
        });
    });
  });
  