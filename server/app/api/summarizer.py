from flask import Blueprint, request, jsonify
from app.models.summarization_model import summarize_text

summarizer_blueprint = Blueprint('summarizer', __name__, url_prefix='/summarizer')

@summarizer_blueprint.route('/summarize', methods=['POST'])
def summarize():
    content = request.json
    text = content.get('text')
    summary = summarize_text(text)
    return jsonify(summary=summary)
