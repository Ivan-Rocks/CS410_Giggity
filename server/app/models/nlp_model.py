import spacy

nlp = spacy.load("en_core_web_sm")

def tokenize_text(text):
    doc = nlp(text)
    return [token.text for token in doc]
