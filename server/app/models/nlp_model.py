import spacy

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")

def tokenize_text(text):
    # Tokenize text using spaCy
    doc = nlp(text)
    return [token.text for token in doc]
