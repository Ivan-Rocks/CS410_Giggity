from flask import Blueprint, request, jsonify
from app.models.nlp_model import tokenize_text

nlp_blueprint = Blueprint('nlp', __name__, url_prefix='/nlp')

@nlp_blueprint.route('/tokenize', methods=['POST'])
def tokenize():
    content = request.json
    text = content.get('text')
    tokens = tokenize_text(text)
    return jsonify(tokens=tokens)
