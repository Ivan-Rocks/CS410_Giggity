from flask import Blueprint, request, jsonify
from app.models.search_model import search_in_text

search_blueprint = Blueprint('search', __name__, url_prefix='/search')

@search_blueprint.route('/query', methods=['POST'])
def query():
    content = request.json
    query_text = content.get('query')
    search_results = search_in_text(query_text)
    return jsonify(results=search_results)
