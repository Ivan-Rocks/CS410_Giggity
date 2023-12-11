const fs = require('fs');
const path = require('path');

function calculateIDF(documents) {
    const wordDocumentCounts = {};
    const totalDocuments = documents.length;

    // Tokenize and count documents containing each word
    documents.forEach(words => { // 'words' is a Set
        words.forEach(word => {
            if (!wordDocumentCounts[word]) {
                wordDocumentCounts[word] = 0;
            }
            wordDocumentCounts[word] += 1;
        });
    });

    // Calculate IDF for each word
    const idfs = {};
    for (const word in wordDocumentCounts) {
        idfs[word] = Math.log(totalDocuments / wordDocumentCounts[word]) + 1;
    }

    return idfs;
}


function tokenizeFileContent(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    return new Set(content.toLowerCase().match(/\w+/g));
}

function readDocumentsFromFolder(folderPath) {
    const fileNames = fs.readdirSync(folderPath);
    const documents = fileNames.map(fileName => {
        const filePath = path.join(folderPath, fileName);
        return tokenizeFileContent(filePath);
    });
    console.log(typeof documents)
    return documents;
}

// Example usage
const folderPath = './stories'; // Path to your 'stories' folder
const documents = readDocumentsFromFolder(folderPath);
const idfs = calculateIDF(documents);
const sortedIdfs = Object.entries(idfs).sort((a, b) => b[1] - a[1]);
const sortedIdfsObject = Object.fromEntries(sortedIdfs);

console.log("IDF done");
const idfJson = JSON.stringify(sortedIdfsObject, null, 2);
fs.writeFile('IDF.json', idfJson, 'utf8', function(err) {
    if (err) {
        console.log("An error occurred while writing JSON Object to File.");
        return console.log(err);
    }
    console.log("IDF.json file has been saved.");
});