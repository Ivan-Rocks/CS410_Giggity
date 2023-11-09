from flask import Blueprint, request, jsonify
from app.models.sentiment_model import analyze_sentiment

sentiment_blueprint = Blueprint('sentiment', __name__, url_prefix='/sentiment')

@sentiment_blueprint.route('/analyze', methods=['POST'])
def analyze():
    content = request.json
    text = content.get('text')
    sentiment_result = analyze_sentiment(text)
    return jsonify(sentiment=sentiment_result)
