from flask import Flask
from app.api.nlp import nlp_blueprint
from app.api.summarizer import summarizer_blueprint
from app.api.sentiment import sentiment_blueprint
from app.api.search import search_blueprint

app = Flask(__name__)

# Register blueprints
app.register_blueprint(nlp_blueprint)
app.register_blueprint(summarizer_blueprint)
app.register_blueprint(sentiment_blueprint)
app.register_blueprint(search_blueprint)

if __name__ == '__main__':
    app.run(debug=True)
